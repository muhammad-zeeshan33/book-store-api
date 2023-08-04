import { Module } from '@nestjs/common';
import ormConfig from './ormConfig';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({    
    imports: [TypeOrmModule.forRoot(ormConfig)],
    exports: [TypeOrmModule],
})
export class PostgresModule {}
