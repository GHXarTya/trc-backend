import {
  Body,
  Controller,
  HttpCode,
  Param,
  Post,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import type { Locale } from 'src/config/locale.config'
import { AdminService } from './admin.service'
import { AdminDto } from './dto/admin.dto'

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post(':locale')
  check(@Param('locale') locale: Locale, @Body() dto: AdminDto) {
    return this.adminService.check(locale, dto)
  }
}
