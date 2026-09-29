import { spawn } from 'node:child_process'
import { SubprocessError } from '../errors/SubprocessError'

type SubprocessResult = {
  type: 'success'
  stdout: string
  exitCode: number
} | {
  type: 'error'
  error: SubprocessError
}

export async function asyncSubprocess (command: string, args: string[]): Promise<SubprocessResult> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args)

    const stdoutChunks: Buffer[] = []
    const stderrChunks: Buffer[] = []

    child.stdout.on('data', (chunk: Buffer) => stdoutChunks.push(chunk))
    child.stderr.on('data', (chunk: Buffer) => stderrChunks.push(chunk))
    
    child.on('close', (code) => {
      const exitCode = code ?? 0
      const stdout = Buffer.concat(stdoutChunks).toString('utf-8')
      const stderr = Buffer.concat(stderrChunks).toString('utf-8')

      const isSuccess = Boolean(stdout)

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
    
    child.on('error', (error) => {
      reject(error)
    })
  })
}
