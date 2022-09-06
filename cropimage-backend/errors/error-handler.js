class ValidationError extends Error {
    constructor(code = 403, message = "The server understood the request, but is refusing to fulfill it", data = "") {
      super(message);
      this.name = 'ValidationError';
      this.code = code;
      this.message = message;
      this.data = data;
    }
    
    toJSON() {
      return {
        error: {
          name: this.name,
          message: this.message,
          data: this.data,
          stacktrace: this.stack
        },
        stat: "fail",
      }
    }
}

class PermissionError extends Error {
    constructor(code = 101, message = "You don't have permission for this", data = "") {
        super(message);
        this.name = 'PermissionError';
        this.code = code;
        this.message = message;
        this.data = data;
    }

    toJSON() {
        return {
            error: {
            name: this.name,
            message: this.message,
            data: this.data,
            stacktrace: this.stack
            },
            stat: "fail",
        }
    }
}
class DatabaseError extends Error {
    constructor(code, message = "", data = "") {
        super(message);
        this.name = 'DatabaseError';
        this.code = code;
        this.message = message;
        this.data = data;

    }

    toJSON() {
        return {
            error: {
            name: this.name,
            message: this.message,
            data: this.data,
            stacktrace: this.stack
            },
            stat: "fail",
        }
    }
}

class ProcessError extends Error {
    constructor(code = 402, message = "An error occurred during processing", data = "") {
        super(message);
        this.name = 'ProcessError';
        this.code = code;
        this.message = message;
        this.data = data;

    }

    toJSON() {
        return {
            error: {
            name: this.name,
            message: this.message,
            data: this.data,
            stacktrace: this.stack
            },
            stat: "fail",
        }
    }
}

export {
    ValidationError,
    PermissionError,
    DatabaseError,
    ProcessError
}