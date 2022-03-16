export class HttpError extends Error {
  constructor(
    params: string,
    public custom: { status: number; redirect?: string }
  ) {
    super(params);
  }
}
