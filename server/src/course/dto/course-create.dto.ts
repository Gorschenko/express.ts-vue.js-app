import { IsString, IsUrl } from 'class-validator'
import { Schema } from 'mongoose'

export class CourseCreateDto {
  @IsString({ message: 'Неверно указано название' })
  title: string

  @IsString({ message: 'Неверно указана цена' })
  price: string

  @IsUrl({ message: 'Неверно указано URL изображения' })
  image: string

  @IsString({ message: 'Неверно указано описание' })
  description: string

  @IsString({ message: 'Неверно указана категория' })
  category: string

  @IsString({ message: 'Неверно указан уровень' })
  level: string
}
