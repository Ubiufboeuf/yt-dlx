// 1. Bajo nivel
// 1.a. Subprocess
export { asyncSubprocess, cleanSubprocessOutput } from './lib/subprocess'
export type * from './types/subprocessTypes'

// 1.b. Streams
export { spawnStream } from './lib/streams'

// 2. Adaptadores
// 2.a. YT-DLP: Adaptador, tipos y constantes
export { YtDlpDownloader } from './yt-dlp/YtDlpAdapters'
// export {  } from './yt-dlp/ytDlpConstants'
export type * from './yt-dlp/ytDlpTypes'

// 3. Engines - Tareas
export { YtEngine, type YtEngineConfig } from './engines/YtEngine'

// 4. Otros
export { SubprocessError, type SubprocessErrorData } from './errors/SubprocessError'
export type * from './types/downloaderTypes'
export type * from './types/mediaTypes'
