import type { SubprocessError } from '../errors/SubprocessError'

export interface SubprocessOptions {
  allowedExitCodes?: number[] | null
  ignoreExitCode?: boolean
}

export type SubprocessResult = {
  type: 'success'
  stdout: string
  exitCode: number
} | {
  type: 'error'
  error: SubprocessError
}
