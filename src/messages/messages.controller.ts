import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import type { Locale } from 'src/config/locale.config'
import { MessagesDto } from './dto/messages.dto'
import { MessagesService } from './messages.service'

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get(':locale')
  get(@Param('locale') locale: Locale) {
    return this.messagesService.get(locale)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post(':locale')
  save(@Param('locale') locale: Locale, @Body() dto: MessagesDto) {
    return this.messagesService.save(locale, dto)
  }
}
