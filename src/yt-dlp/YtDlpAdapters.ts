import { asyncSubprocess } from '../lib/subprocess'
import type { DownloadOptions, DownloadResult, VideoDownloader } from '../types/downloaderTypes'
import type { MediaInspector, VideoFormat } from '../types/metadataTypes'
import type { YtDLPDumpedJSON } from './ytDlpTypes'

export class YtDlpDownloader implements VideoDownloader, MediaInspector {
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

    return {
      filePath: undefined,
      rawOutput: result.stdout
    }
  }

  async getFormats (url: string, signal?: AbortSignal): Promise<VideoFormat[]> {
    const result = await asyncSubprocess(this.binaryPath, ['-J', url], { signal })
    if (result.type === 'error') {
      throw result.error
    }

    const json: YtDLPDumpedJSON = JSON.parse(result.stdout)
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
}
