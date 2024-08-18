import { IsBoolean, IsDefined, IsOptional, IsString } from 'class-validator'

export class AdminDto {
  @IsDefined({
    message: 'Password not provided'
  })
  @IsString({
    message: 'Password not properly provided'
  })
  password: string

  @IsOptional()
  @IsBoolean({
    message: 'Hash status not properly provided'
  })
  isHashed?: boolean
}
