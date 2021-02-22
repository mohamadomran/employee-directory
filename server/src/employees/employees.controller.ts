import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { AddEmployeeDto } from './dto/add-employee.dto';
import { PaginationDto } from './dto/pagination.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './employee.entity';

import { EmployeesService } from './employees.service';
import { PaginatedEmployees } from './interfaces/GetEmployees';

@Controller('employees')
export class EmployeesController {
  constructor(private employeeService: EmployeesService) {}

  @Get()
  getEmployees(
    @Query() paginatedDto: PaginationDto,
  ): Promise<PaginatedEmployees> {
    return this.employeeService.getEmployees(paginatedDto);
  }

  @Get('/:id')
  getEmployeeById(@Param('id', ParseIntPipe) id: number): Promise<Employee> {
    return this.employeeService.getEmployeeById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  addEmployee(@Body() addEmployeeDto: AddEmployeeDto): Promise<Employee> {
    return this.employeeService.addEmployee(addEmployeeDto);
  }

  @Patch('/:id')
  updateEmployee(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    return this.employeeService.updateEmployee(id, updateEmployeeDto);
  }

  @Delete('/:id')
  deleteEmployee(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.employeeService.deleteEmployee(id);
  }
}
