export class HttpError extends Error {
  public statusCode!: number;
  public detail?: string;

  constructor(httpStatusCode: number, message: string, detail?: string) {
    super(message);

    this.statusCode = httpStatusCode;
    this.message = message;
    this.detail = detail;
  }
}
