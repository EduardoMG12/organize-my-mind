import { HttpStatus } from "@nestjs/common";
import { BaseException } from "./base.exception";

export class AnnotationNotFoundException extends BaseException {
    constructor() {
        super("Annotation not found", HttpStatus.NOT_FOUND);
    }
}

export class RestoreAnnotationNotFoundException extends BaseException {
    constructor() {
        super("This annotation don't deleted or not found", HttpStatus.NOT_FOUND);
    }
}


export class TitleRequiredException extends BaseException {
    constructor() {
        super("Title is required", HttpStatus.BAD_REQUEST);
    }
}

export class CannotMoveAnnotationException extends BaseException {
    constructor() {
        super("You don't move Annotation here", HttpStatus.BAD_REQUEST);
    }
}