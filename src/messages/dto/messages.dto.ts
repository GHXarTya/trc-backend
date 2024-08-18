import { IsDefined, IsString } from 'class-validator'

export class MessagesDto {
  @IsDefined({
    message: 'Localization not provided'
  })
  messages: any

  @IsDefined({
    message: 'Password not provided'
  })
  @IsString({
    message: 'Password not properly provided'
  })
  password: string
}
