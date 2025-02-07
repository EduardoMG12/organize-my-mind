import { plainToInstance } from "class-transformer";

type Cls<T> = {
    new(...args: any[]): T
}

export function toPlainToInstance<T>(cls: Cls<T>, service: any) {

    return plainToInstance(cls, service, { excludeExtraneousValues: true })
}
