export interface SubprocessErrorData {
  stdout: string
  stderr: string
  exitCode: number
}

export class SubprocessError extends Error {
  public readonly stdout: string
  public readonly stderr: string
  public readonly exitCode: number
  
  constructor (message: string, extraData: SubprocessErrorData, errorOptions?: ErrorOptions) {
    super(message, errorOptions)

    this.name = 'SubprocessError'
    this.stdout = extraData.stdout
    this.stderr = extraData.stderr
    this.exitCode = extraData.exitCode
    
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, SubprocessError)
    }
  }
}
