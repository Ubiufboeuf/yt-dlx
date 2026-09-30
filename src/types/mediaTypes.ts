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

export interface MediaInspector {
  getFormats(url: string): Promise<VideoFormat[]>
  getFormat(url: string, selector: string): Promise<VideoFormat[] | null>
}
