import type { SubprocessOptions } from './subprocessTypes'
import type { VideoMetadata } from './videoTypes'

export interface VideoFormat {
  id: string
  ext: string
  resolution?: string
  height?: number
  width?: number
  fps?: number
  vcodec?: string
  acodec?: string
  filesize?: number
  qualityLabel?: string
}

type QualityPreset =
  | 'best'
  | 'worst'
  | 'best-video'
  | 'worst-video'
  | 'best-audio'
  | 'worst-audio'
  | 'storyboard'
  | '${number}p'

export type FormatSelector = QualityPreset | (string & {})

export interface GetInfoOptions extends SubprocessOptions {
  outputDir?: string
  outputTemplate?: string
  newLine?: boolean
  keepItPure?: boolean
}

export interface MediaInspector {
  getFormats(url: string, signal?: AbortSignal): Promise<VideoFormat[]>
  getFormat(url: string, selector: string): Promise<VideoFormat[] | null>
  getInfo(url: string, options?: GetInfoOptions): Promise<VideoMetadata>
}
