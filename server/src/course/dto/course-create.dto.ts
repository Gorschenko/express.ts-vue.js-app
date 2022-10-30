import { IsString, IsUrl } from 'class-validator'

export class CourseCreateDto {
  @IsString({ message: 'Неверно указано название' })
  title: string

  @IsString({ message: 'Неверно указана цена' })
  price: number

  @IsUrl({ message: 'Неверно указано URL изображения' })
  image: string
}
