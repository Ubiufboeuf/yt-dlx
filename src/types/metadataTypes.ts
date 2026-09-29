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

export interface MediaInspector {
  getFormats(url: string): Promise<VideoFormat[]>
}
