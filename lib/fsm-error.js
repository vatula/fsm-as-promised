class FsmError extends Error {
  constructor(message, options) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.name = 'FsmError';
    this.trigger = options.name;
    this.current = options.from;

    if (options.pending) {
      this.pending = options.pending;
    }
  }
}

module.exports = FsmError;
