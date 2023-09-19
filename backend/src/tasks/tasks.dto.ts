import { IsBoolean, IsString, Length } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @Length(1, 9)
  content: string;
}

export class UpdateTaskDto {
  @IsBoolean()
  done: boolean;
}
