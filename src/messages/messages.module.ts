import { Module, forwardRef } from '@nestjs/common'
import { AdminModule } from 'src/admin/admin.module'
import { AdminService } from 'src/admin/admin.service'
import { MessagesController } from './messages.controller'
import { MessagesService } from './messages.service'

@Module({
  imports: [forwardRef(() => AdminModule)],
  controllers: [MessagesController],
  providers: [MessagesService, AdminService]
})
export class MessagesModule {}
