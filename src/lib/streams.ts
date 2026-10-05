import { spawn } from 'node:child_process'

export function spawnStream (command: string, args: string[], signal?: AbortSignal) {
  const child = spawn(command, args, { signal })

  const stream = new ReadableStream({
    start (controller) {
      child.stdout.on('data', (chunk: Buffer) => {
        controller.enqueue(chunk)
      })

      child.stderr.on('data', (chunk: Buffer) => {
        controller.enqueue(chunk)
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
