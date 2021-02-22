import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeRepository } from './employee.repository';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeRepository])],
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class EmployeesModule {}
