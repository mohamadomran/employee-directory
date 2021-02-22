import { EntityRepository, Repository } from 'typeorm';
import { AddEmployeeDto } from './dto/add-employee.dto';
import { PaginationDto } from './dto/pagination.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './employee.entity';
import { PaginatedEmployees } from './interfaces/GetEmployees';

@EntityRepository(Employee)
export class EmployeeRepository extends Repository<Employee> {
  async getEmployees(
    paginationDto: PaginationDto,
  ): Promise<PaginatedEmployees> {
    const { pageIndex, pageSize } = paginationDto;

    const [employees, totalCount] = await this.findAndCount({
      take: pageSize,
      skip: pageSize * (pageIndex - 1),
    });

    return {
      employees,
      totalPages: Math.ceil(totalCount / pageSize),
      totalCount,
    };
  }

  async addEmployee(addEmployeeDto: AddEmployeeDto): Promise<Employee> {
    const employee = new Employee();

    const {
      firstname,
      lastname,
      title,
      department,
      location,
      email,
    } = addEmployeeDto;

    employee.firstname = firstname;
    employee.lastname = lastname;
    employee.title = title;
    employee.department = department;
    employee.location = location;
    employee.email = email;

    await employee.save();
    return employee;
  }

  async updateEmployee(updateEmployee: UpdateEmployeeDto): Promise<Employee> {
    const employee = new Employee();

    const {
      firstname,
      lastname,
      title,
      department,
      location,
      email,
    } = updateEmployee;

    employee.firstname = firstname;
    employee.lastname = lastname;
    employee.title = title;
    employee.department = department;
    employee.location = location;
    employee.email = email;

    await employee.save();
    return employee;
  }
}
