import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef
} from '@nestjs/common'
import { readFileSync, writeFileSync } from 'fs'
import { AdminService } from 'src/admin/admin.service'
import { Locale, locales } from 'src/config/locale.config'
import { MessagesDto } from './dto/messages.dto'

@Injectable()
export class MessagesService {
  constructor(
    @Inject(forwardRef(() => AdminService))
    private readonly adminService: AdminService
  ) {}

  check(locale: Locale) {
    if (!locales.includes(locale))
      throw new BadRequestException('Invalid locale')
  }

  get(locale: Locale) {
    this.check(locale)

    const data = readFileSync(`messages/${locale}.json`, 'utf-8')
    const messages = JSON.parse(data)

    return messages
  }

  save(locale: Locale, dto: MessagesDto) {
    this.check(locale)

    const { messages, password } = dto

    this.adminService.verify(password, locale)
    writeFileSync(`messages/${locale}.json`, JSON.stringify(messages))

    return {
      message:
        locale === 'uk-UA'
          ? 'Дані успішно збережено!'
          : 'Data successfully saved!'
    }
  }
}
