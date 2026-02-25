export class HttpErrorResponse {
  public readonly statusCode: number

  public readonly timestamp: string = new Date().toISOString()

  public readonly message?: string

  public readonly payload?: JSON
}
