import { spawn } from 'node:child_process'
import { SubprocessError } from '../errors/SubprocessError'
import type { SubprocessOptions, SubprocessResult } from '../types/subprocessTypes'

const defaultOptions: SubprocessOptions = {
  allowedExitCodes: [0],
  ignoreExitCode: false
}

export async function asyncSubprocess (command: string, args: string[], options?: SubprocessOptions): Promise<SubprocessResult> {
  const { allowedExitCodes, ignoreExitCode, signal } = { ...defaultOptions, ...options }
  
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { signal })

    const stdoutChunks: Buffer[] = []
    const stderrChunks: Buffer[] = []

    child.stdout.on('data', (chunk: Buffer) => stdoutChunks.push(chunk))
    child.stderr.on('data', (chunk: Buffer) => stderrChunks.push(chunk))
    
    child.on('close', (code) => {
      const exitCode = code ?? 0
      const stdout = Buffer.concat(stdoutChunks).toString('utf-8')
      const stderr = Buffer.concat(stderrChunks).toString('utf-8')

      const isSuccess = ignoreExitCode || allowedExitCodes?.includes(exitCode)

      if (isSuccess) {
        resolve({ type: 'success', stdout, exitCode })
      } else {
        const error = new SubprocessError(
          `El proceso "${command}" finalizó con código ${exitCode}.\nStderr: ${stderr}`,
          { stdout, stderr, exitCode }
        )
        resolve({ type: 'error', error })
      }
    })
    
    child.on('error', (err) => {
      if (err.name === 'AbortError') {
        const error = new SubprocessError(
          'Proceso cancelado por el usuario',
          { stdout: '', stderr: 'Aborted', exitCode: -1 }
        )
        return resolve({ type: 'error', error })
      }

      reject(err)
    })
  })
}
