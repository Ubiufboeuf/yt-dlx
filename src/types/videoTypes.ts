export interface VideoMetadata {
  id: string
  title: string
  description?: string
  webpageUrl?: string

  thumbnail?: string
  thumbnails?: VideoThumbnail[]

  creatorId?: string
  creatorName?: string
  creatorUrl?: string

  duration: number
  isLive?: boolean
  wasLive?: boolean

  views?: number
  likes?: number

  categories?: string[]
  tags?: string[]

  uploadDate?: string

  provider?: string
}

export interface VideoThumbnail {
  id: string
  height: number
  width: number
  url: string
}
