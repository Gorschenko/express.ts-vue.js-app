import { IsString } from 'class-validator'
import { CourseCreateDto } from './course-create.dto'

export class CourseEditDto extends CourseCreateDto {
  @IsString({ message: 'Неверно указан Id' })
  _id: string
}
