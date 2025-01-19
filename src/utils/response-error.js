class ResponseError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = Array.isArray(message) ? message : [message];
  }
}

export default ResponseError;