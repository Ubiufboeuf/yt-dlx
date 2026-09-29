import type { SubprocessOptions } from './subprocessTypes'

export interface DownloadOptions extends SubprocessOptions {
  outputDir?: string
  outputTemplate?: string
  restrictFilenames?: boolean | 'URL'
  format?: string
}

export interface DownloadResult {
  filePath?: string
  rawOutput: string
}

export interface VideoDownloader {
  download: (url: string, options?: DownloadOptions) => Promise<DownloadResult>
}
