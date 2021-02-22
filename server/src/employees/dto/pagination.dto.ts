import { IsPositive, IsOptional } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsPositive()
  public readonly pageSize: number;

  @IsOptional()
  @IsPositive()
  public readonly pageIndex: number;
}
