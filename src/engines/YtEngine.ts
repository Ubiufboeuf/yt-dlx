import type { DownloadResult, MediaDownloader } from '../types/downloaderTypes'
import type { FormatSelector, MediaInspector } from '../types/mediaTypes'

export type YtEngineConfig = 
  | { adapter: MediaInspector & MediaDownloader }
  | { inspector: MediaInspector; downloader: MediaDownloader }

export class YtEngine {
  private readonly inspector: MediaInspector
  private readonly downloader: MediaDownloader

  constructor (config: YtEngineConfig) {
    if ('adapter' in config) {
      this.inspector = config.adapter
      this.downloader = config.adapter
    } else {
      this.inspector = config.inspector
      this.downloader = config.downloader
    }
  }

  async download (url: string, selector: FormatSelector): Promise<DownloadResult | null> {
    const formats = await this.inspector.getFormat(url, selector)
    if (!formats) return null

    const format = formats[formats.length - 1]
    const result = await this.downloader.download(url, { format: format.id })

    return result
  }
}
