import { Employee } from '../employee.entity';

export interface PaginatedEmployees {
  employees: Employee[];
  totalPages: number;
  totalCount: number;
}
