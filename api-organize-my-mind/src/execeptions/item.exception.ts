import { HttpStatus } from "@nestjs/common";
import { BaseException } from "./base.exception";

export class ItemNotFoundException extends BaseException {
    constructor() {
        super("Item not found", HttpStatus.NOT_FOUND);
    }
}

export class ItemTypeNotFoundException extends BaseException {
    constructor() {
        super("Item-type not found", HttpStatus.NOT_FOUND);
    }
}

export class TitleRequiredException extends BaseException {
    constructor() {
        super("Title is required", HttpStatus.BAD_REQUEST);
    }
}

export class CannotMoveItemException extends BaseException {
    constructor() {
        super("You don't move item here", HttpStatus.BAD_REQUEST);
    }
}