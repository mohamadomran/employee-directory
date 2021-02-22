import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddEmployeeDto } from './dto/add-employee.dto';
import { PaginationDto } from './dto/pagination.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './employee.entity';

import { EmployeeRepository } from './employee.repository';
import { PaginatedEmployees } from './interfaces/GetEmployees';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(EmployeeRepository)
    private employeeRepository: EmployeeRepository,
  ) {}

  async getEmployees(
    paginationDto: PaginationDto,
  ): Promise<PaginatedEmployees> {
    return this.employeeRepository.getEmployees(paginationDto);
  }

  async getEmployeeById(id: number): Promise<Employee> {
    const found = await this.employeeRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Employee with ID ${id} is not found.`);
    }

    return found;
  }

  async addEmployee(addEmployeeDto: AddEmployeeDto): Promise<Employee> {
    return this.employeeRepository.addEmployee(addEmployeeDto);
  }

  async updateEmployee(
    id: number,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    await this.getEmployeeById(id);

    const updatedEmployee = await this.employeeRepository.save({
      ...updateEmployeeDto,
      id,
    });

    return updatedEmployee;
  }

  async deleteEmployee(id: number): Promise<void> {
    const result = await this.employeeRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Employee with ID ${id} is not found.`);
    }
  }
}
