import { Expose } from "class-transformer";

export class AccessToken {
    @Expose()
    access_token: string
}