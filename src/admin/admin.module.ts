import { Module, forwardRef } from '@nestjs/common'
import { MessagesModule } from 'src/messages/messages.module'
import { MessagesService } from 'src/messages/messages.service'
import { AdminController } from './admin.controller'
import { AdminService } from './admin.service'

@Module({
  imports: [forwardRef(() => MessagesModule)],
  controllers: [AdminController],
  providers: [AdminService, MessagesService]
})
export class AdminModule {}
