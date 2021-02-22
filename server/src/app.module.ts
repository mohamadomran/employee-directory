import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { EmployeesModule } from './employees/employees.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), EmployeesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
