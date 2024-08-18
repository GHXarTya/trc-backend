import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef
} from '@nestjs/common'
import { compareSync, hashSync } from 'bcrypt'
import type { Locale } from 'src/config/locale.config'
import { MessagesService } from 'src/messages/messages.service'
import { AdminDto } from './dto/admin.dto'

@Injectable()
export class AdminService {
  constructor(
    @Inject(forwardRef(() => MessagesService))
    private readonly messagesService: MessagesService
  ) {}

  verify(password: string, locale: Locale) {
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

    if (!ADMIN_PASSWORD)
      throw new BadRequestException(
        locale === 'uk-UA'
          ? 'Не вдалося перевірити пароль'
          : 'Password verification failed'
      )

    const match = compareSync(ADMIN_PASSWORD, password)

    if (!match)
      throw new BadRequestException(
        locale === 'uk-UA' ? 'Недійсний пароль' : 'Invalid password'
      )
  }

  check(locale: Locale, dto: AdminDto) {
    this.messagesService.check(locale)

    const { password, isHashed } = dto

    if (isHashed) {
      this.verify(password, locale)

      return { message: locale === 'uk-UA' ? 'Вітаємо!' : 'Welcome!' }
    } else {
      const hashedPassword = hashSync(password, 10)

      this.verify(hashedPassword, locale)

      return {
        message:
          locale === 'uk-UA'
            ? 'Вас успішно авторизовано!'
            : 'You have successfully authorized!',
        password: hashedPassword
      }
    }
  }
}
