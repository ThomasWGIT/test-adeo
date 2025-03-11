import { IsNotEmpty, IsString, IsEnum } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsEnum(['à faire', 'en cours', 'terminé'])
  status: 'à faire' | 'en cours' | 'terminé';
}
