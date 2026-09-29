import { asyncSubprocess } from '../lib/subprocess'
import type { DownloadOptions, DownloadResult, VideoDownloader } from '../types/downloaderTypes'

export class YtDlpDownloader implements VideoDownloader {
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
}
