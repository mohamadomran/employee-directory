import { Test } from '@nestjs/testing';
import { EmployeesService } from './employees.service';
import { EmployeeRepository } from './employee.repository';
import { GetEmployeeFilterDto } from './dto/get-employees-filter.dto';
import { Department } from './Enums/employee-department.enum';
import { NotFoundException } from '@nestjs/common';

const mockUser = { id: 12, username: 'Test user' };

const mockEmployeeRepository = () => ({
  getEmployees: jest.fn(),
  findOne: jest.fn(),
  createEmployee: jest.fn(),
  delete: jest.fn(),
});

describe('EmployeesService', () => {
  let employeesService;
  let employeeRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        EmployeesService,
        { provide: EmployeeRepository, useFactory: mockEmployeeRepository },
      ],
    }).compile();

    employeesService = await module.get<EmployeesService>(EmployeesService);
    employeeRepository = await module.get<EmployeeRepository>(
      EmployeeRepository,
    );
  });

  describe('getEmployees', () => {
    it('gets all employees from the repository', async () => {
      employeeRepository.getEmployees.mockResolvedValue('someValue');

      expect(employeeRepository.getEmployees).not.toHaveBeenCalled();
      const filters: GetEmployeeFilterDto = {
        search: 'Some search query',
        department: Department.MEDIA,
      };
      const result = await employeesService.getEmployees(filters, mockUser);
      expect(employeeRepository.getEmployees).toHaveBeenCalled();
      expect(result).toEqual('someValue');
    });
  });

  describe('getEmployeeById', () => {
    it('throws an error as employee is not found', () => {
      employeeRepository.findOne.mockResolvedValue(null);
      expect(employeesService.getEmployeeById(1, mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('deleteEmployee', () => {
    it('throws an error as employee could not be found', () => {
      employeeRepository.delete.mockResolvedValue({ affected: 0 });
      expect(employeesService.deleteEmployee(1, mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
