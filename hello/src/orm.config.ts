import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const config: TypeOrmModuleOptions = {
    type: 'postgres',
    username: 'zdnaya',
    password: 'Saad2021@live.f',
    host: '127.0.0.1',
    port: 5432,
    database: 'ping_pong_db',
    synchronize: true,
    entities: ['dist/**/*.entity.{js,ts}'],
}