import { HttpException, HttpStatus } from "@nestjs/common";

export class BaseException extends HttpException {
    constructor(message, status: HttpStatus) {
        super({ error: message, status }, status)
    }
}