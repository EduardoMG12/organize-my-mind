import { HttpStatus } from "@nestjs/common";
import { BaseException } from "./base.exception";

export class UserNotFoundException extends BaseException {
    constructor() {
        super("User not found", HttpStatus.NOT_FOUND);
    }
}