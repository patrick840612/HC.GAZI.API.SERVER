import { TypeOrmModuleOptions } from "@nestjs/typeorm";

// export const typeORMConfig : TypeOrmModuleOptions = {
//     type: 'postgres',
//     host: 'localhost',
//     port: 5432,
//     username: 'postgres',
//     password: 'patrick',
//     database: 'db_gazi',
//     entities: [__dirname + '/../**/*.entity.{js,ts}'],
//     synchronize: true
// }

export const typeORMConfig : TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'patrick',
    database: 'db_gazi',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true
}