import { spawn } from 'node:child_process'

interface StreamOptions {
  signal?: AbortSignal
  std?: 'out' | 'err' | 'mix'
}

export function spawnStream (command: string, args: string[], options?: StreamOptions) {
  const child = spawn(command, args, { signal: options?.signal })

  const stream = new ReadableStream({
    start (controller) {
      child.stdout.on('data', (chunk: Buffer) => {
        const std = options?.std
        if (std === 'out' || std === 'mix' || !std) controller.enqueue(chunk)
        else  console.log(chunk.toString('utf8'))
      })

      child.stderr.on('data', (chunk: Buffer) => {
        const std = options?.std
        if (std === 'err' || std === 'mix') controller.enqueue(chunk)
        else console.error(chunk.toString('utf8'))
      })

      child.stdout.on('end', () => {
        controller.close()
      })

      child.on('error', (err) => {
        controller.error(err)
      })
    },
    cancel () {
      child.kill()
    }
  })

  return {
    stream,
    process: child
  }
}
