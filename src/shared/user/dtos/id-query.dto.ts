import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class IDQueryDTO {
  @ApiProperty({ required: true, description: 'Envie um id válido' })
  @IsNumber({}, { message: 'O ID deve ser um number.' })
  @IsNotEmpty({ message: 'O ID não pode estar vazio.' })
  id: number;
}