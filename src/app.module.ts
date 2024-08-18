import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AdminModule } from './admin/admin.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MessagesModule } from './messages/messages.module'

@Module({
  imports: [ConfigModule.forRoot(), MessagesModule, AdminModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
