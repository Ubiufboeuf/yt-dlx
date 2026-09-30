import type { SubprocessOptions } from './subprocessTypes'

export interface DownloadOptions extends SubprocessOptions {
  outputDir?: string
  outputTemplate?: string
  restrictFilenames?: boolean | 'URL'
  format?: string
  newLine?: boolean
}

export interface DownloadResult {
  filePath?: string
  rawOutput: string
}

export interface MediaDownloader {
  download: (url: string, options?: DownloadOptions) => Promise<DownloadResult>
}
