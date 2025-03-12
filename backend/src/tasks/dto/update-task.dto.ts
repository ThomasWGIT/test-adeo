import { IsString, IsEnum, IsOptional } from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(['à faire', 'en cours', 'terminé'])
  @IsOptional()
  status?: 'à faire' | 'en cours' | 'terminé';
}
