import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DATABASE_HOST || "localhost",
    port: Number(process.env.DATABASE_PORT) || 3306,
    username: process.env.DATABASE_USER || "user",
    password: process.env.DATABASE_PASSWORD || "password",
    database: process.env.DATABASE_NAME || "organize_my_mind",
    entities: [__dirname + "/**/*.entity{.ts,.js}"],
    migrations: [__dirname + "/migrations/*{.ts,.js}"], // i don't no if need src
    synchronize: false,
    logging: true,
});
// see if __dirname is root or is api_organize_my_mind /**/*/migrations/*{.ts,.js}
// past json "migration:run": "bun run typeorm migration:run -d ./dataSource.ts"
