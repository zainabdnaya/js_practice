import { Controller, Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from '../orm.config';
import { Company } from './company.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Company])],
  controllers: [CompaniesController],
  providers: [CompaniesService]
})
export class CompaniesModule {}
