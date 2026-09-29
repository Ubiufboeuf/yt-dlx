import type { SubprocessOptions } from './subprocessTypes'

export interface DownloadOptions extends SubprocessOptions {
  outputDir?: string
  format?: string
  quality?: string
}

export interface DownloadResult {
  filePath?: string
  rawOutput: string
}

export interface VideoDownloader {
  download: (url: string, options?: DownloadOptions) => Promise<DownloadResult>
}
