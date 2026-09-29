export interface YtDLPDumpedJSON {
    id:                     string;
    title:                  string;
    formats:                Format[];
    thumbnails:             Thumbnail[];
    thumbnail:              string;
    description:            string;
    channel_id:             string;
    channel_url:            string;
    duration:               number;
    view_count:             number;
    average_rating:         null;
    age_limit:              number;
    webpage_url:            string;
    categories:             string[];
    tags:                   string[];
    playable_in_embed:      boolean;
    live_status:            string;
    media_type:             string;
    release_timestamp:      null;
    _format_sort_fields:    string[];
    automatic_captions:     { [key: string]: AutomaticCaption[] };
    subtitles:              Subtitles;
    comment_count:          number;
    chapters:               null;
    heatmap:                Heatmap[];
    like_count:             number;
    channel:                string;
    channel_follower_count: number;
    creators:               null;
    channel_is_verified:    boolean;
    uploader:               string;
    uploader_id:            string;
    uploader_url:           string;
    upload_date:            string;
    timestamp:              number;
    availability:           string;
    original_url:           string;
    webpage_url_basename:   string;
    webpage_url_domain:     string;
    extractor:              string;
    extractor_key:          string;
    playlist:               null;
    playlist_index:         null;
    display_id:             string;
    fulltitle:              string;
    duration_string:        string;
    release_year:           null;
    is_live:                boolean;
    was_live:               boolean;
    requested_subtitles:    null;
    _has_drm:               null;
    epoch:                  number;
    requested_downloads:    RequestedDownload[];
    requested_formats:      Format[];
    format:                 string;
    format_id:              string;
    ext:                    AudioEXTEnum;
    protocol:               string;
    language:               string;
    format_note:            string;
    filesize_approx:        number;
    tbr:                    number;
    width:                  number;
    height:                 number;
    resolution:             string;
    fps:                    number;
    dynamic_range:          'SDR';
    vcodec:                 string;
    vbr:                    number;
    stretched_ratio:        null;
    aspect_ratio:           number;
    acodec:                 Acodec;
    abr:                    number;
    asr:                    number;
    audio_channels:         number;
    _type:                  string;
    _version:               Version;
}

export interface Version {
    version:          string;
    current_git_head: null;
    release_git_head: string;
    repository:       string;
}

export type Acodec = 'none' | 'mp4a.40.5' | 'opus' | 'mp4a.40.2';

export interface AutomaticCaption {
    ext:             AutomaticCaptionEXT;
    url:             string;
    name:            string;
    impersonate:     boolean;
    __yt_dlp_client: 'visionos';
}

export type AutomaticCaptionEXT = 'json3' | 'srv1' | 'srv2' | 'srv3' | 'ttml' | 'srt' | 'vtt';

export type AudioEXTEnum = 'none' | 'mp4' | 'm4a' | 'webm' | 'mhtml';

export interface Format {
    format_id:            string;
    format_note?:         string;
    ext:                  AudioEXTEnum;
    protocol:             Protocol;
    acodec?:              Acodec;
    vcodec:               string;
    url:                  string;
    width?:               number | null;
    height?:              number | null;
    fps?:                 number | null;
    rows?:                number;
    columns?:             number;
    fragments?:           Fragment[];
    audio_ext:            AudioEXTEnum;
    video_ext:            AudioEXTEnum;
    vbr:                  number;
    abr:                  number | null;
    tbr:                  number | null;
    resolution:           string;
    aspect_ratio:         number | null;
    filesize_approx?:     number | null;
    http_headers:         HTTPHeaders;
    format:               string;
    format_index?:        null;
    manifest_url?:        string;
    language?:            null | string;
    preference?:          null;
    quality?:             number;
    has_drm?:             boolean;
    source_preference?:   number;
    available_at?:        number;
    asr?:                 number | null;
    filesize?:            number;
    audio_channels?:      number | null;
    language_preference?: number;
    dynamic_range?:       'SDR' | null;
    container?:           Container;
    downloader_options?:  DownloaderOptions;
}

export type Container = 'm4a_dash' | 'webm_dash' | 'mp4_dash';

export interface DownloaderOptions {
    http_chunk_size: number;
}

export interface Fragment {
    url:      string;
    duration: number;
}

export interface HTTPHeaders {
    'User-Agent':      string;
    Accept:            'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8';
    'Accept-Language': 'en-us,en;q=0.5';
    'Sec-Fetch-Mode':  'navigate';
}

export type Protocol = 'mhtml' | 'm3u8_native' | 'https';

export interface Heatmap {
    start_time: number;
    end_time:   number;
    value:      number;
}

export interface RequestedDownload {
    requested_formats:        Format[];
    format:                   string;
    format_id:                string;
    ext:                      AudioEXTEnum;
    protocol:                 string;
    language:                 string;
    format_note:              string;
    filesize_approx:          number;
    tbr:                      number;
    width:                    number;
    height:                   number;
    resolution:               string;
    fps:                      number;
    dynamic_range:            'SDR';
    vcodec:                   string;
    vbr:                      number;
    aspect_ratio:             number;
    acodec:                   Acodec;
    abr:                      number;
    asr:                      number;
    audio_channels:           number;
    _filename:                string;
    filename:                 string;
    __write_download_archive: boolean;
}

export type Subtitles = unknown

export interface Thumbnail {
    url:         string;
    preference:  number;
    id:          string;
    height?:     number;
    width?:      number;
    resolution?: string;
}
