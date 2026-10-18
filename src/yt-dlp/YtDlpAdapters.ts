import { resolve } from 'node:path'
import { asyncSubprocess } from '../lib/subprocess'
import type { DownloadOptions, DownloadResult, MediaDownloader } from '../types/downloaderTypes'
import type { FormatSelector, GetInfoOptions, MediaInspector, VideoFormat } from '../types/mediaTypes'
import type { YtDLPDumpedJSON } from './ytDlpTypes'
import type { VideoMetadata, VideoThumbnail } from '../types/videoTypes'

export class YtDlpDownloader implements MediaDownloader, MediaInspector {
  private binaryPath: string

  constructor (binaryPath = 'yt-dlp') {
    this.binaryPath = binaryPath
  }

  async download (url: string, options?: DownloadOptions): Promise<DownloadResult> {
    const args: string[] = []

    if (options?.outputDir) {
      args.push('-P', options.outputDir)
    }

    if (options?.format) {
      args.push('-f', options.format)
    }

    if (options?.outputTemplate) {
      args.push('-o', options.outputTemplate)
    }

    if (options?.restrictFilenames) {
      args.push('--restrict-filenames')
      if (options.restrictFilenames === 'URL') args.push('--restrict-filenames', 'URL')
    }

    if (options?.newLine) {
      args.push('--newline')
    }

    args.push(url)

    const result = await asyncSubprocess(this.binaryPath, args, {
      cleanOutput: options?.cleanOutput,
      signal: options?.signal,
      onStdout: options?.onStdout,
      onStderr: options?.onStderr
    })

    if (result.type === 'error') {
      throw result.error
    }

    const lines = result.stdout.split('\n')
    
    const alreadyDownloaded = lines.some((line) => line.includes('has already been downloaded'))
    const splitter = alreadyDownloaded ? '[download] ' : '[download] Destination: '

    const destinationLine = lines.find((line) => line.startsWith(splitter))
    let destination = destinationLine?.split(splitter)[1]  

    if (alreadyDownloaded) {
      destination = destination?.split(' has already been downloaded')[0]
    }
    
    const filePath = destination ? resolve(destination) : undefined
    
    return {
      alreadyDownloaded,
      filePath,
      rawOutput: result.stdout
    }
  }

  async getFormats (url: string, signal?: AbortSignal): Promise<VideoFormat[]> {
    const json = await this.getInfo(url, { keepItPure: true, signal }) as YtDLPDumpedJSON
    const formats: VideoFormat[] = []

    for (const df of json.formats) {
      const format: VideoFormat = {
        id: df.format_id,
        ext: df.ext,
        resolution: df.resolution,
        height: df.height ?? undefined,
        width: df.width ?? undefined,
        fps: df.fps ?? undefined,
        vcodec: df.vcodec,
        acodec: df.acodec,
        filesize: df.filesize ?? df.filesize_approx ?? undefined,
        qualityLabel: df.format_note
      }

      formats.push(format)
    }

    return formats
  }

  async getFormat (url: string, selector: FormatSelector): Promise<VideoFormat[] | null> {
    let formats = await this.getFormats(url)
    if (!formats.length) return null
    
    if (selector === 'best') {
      const filtered = formats.filter((f) => f.vcodec !== 'none' && f.acodec !== 'none')
      const best = filtered[filtered.length - 1]
      if (best) return [best]
    }

    if (selector === 'worst') {
      const filtered = formats.filter((f) => f.acodec === 'none' && !f.qualityLabel?.includes('storyboard'))
      return [filtered[0]]
    }

    if (selector.includes('video')) formats = formats.filter((f) => f.vcodec && f.vcodec !== 'none' && !f.qualityLabel?.includes('storyboard'))
    if (selector.includes('audio')) formats = formats.filter((f) => f.acodec && f.acodec !== 'none' && !f.qualityLabel?.includes('storyboard'))
    
    if (selector.includes('best')) return [formats[formats.length - 1]]
    if (selector.includes('worst')) return [formats[0]]
    
    const height = Number(selector.replace('p', ''))
    const filtered = formats.filter((f) => f.qualityLabel?.includes(selector) || f.resolution === selector || f.height === height)
    return filtered.length ? filtered : null
  }

  async getInfo (url: string, options?: GetInfoOptions): Promise<VideoMetadata> {
    const args: string[] = ['-J', url]

    if (options?.outputDir) {
      args.push('-P', options.outputDir)
    }

    if (options?.outputTemplate) {
      args.push('-o', options.outputTemplate)
    }
    
    if (options?.newLine) {
      args.push('--newline')
    }
    
    const result = await asyncSubprocess(this.binaryPath, args, {
      signal: options?.signal
    })
    
    if (result.type === 'error') {
      throw result.error
    }

    const json: YtDLPDumpedJSON = JSON.parse(result.stdout)
    if (options?.keepItPure) return json as VideoMetadata

    const thumbnails: VideoThumbnail[] = []
    json.thumbnails.forEach((t) => (t.height && t.width) && thumbnails.push({ id: t.id, height: t.height, width: t.width, url: t.url }))
    
    const metadata: VideoMetadata = {
      id: json.id,
      title: json.title,
      description: json.description,
      webpageUrl: json.webpage_url,

      thumbnail: json.thumbnail,
      thumbnails,

      creatorId: json.uploader_id,
      creatorName: json.uploader,
      creatorUrl: json.uploader_url,

      duration: json.duration,
      isLive: json.is_live,
      wasLive: json.was_live,

      views: json.view_count,
      likes: json.like_count,

      categories: json.categories,
      tags: json.tags,

      uploadDate: json.upload_date,

      provider: 'yt-dlp'
    }

    return metadata
  }
}
