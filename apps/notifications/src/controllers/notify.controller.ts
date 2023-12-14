import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { NotifyService } from '../services/notify.service';
import { NotificationDto } from 'libs/common';

@Controller()
export class NotifyController {
  constructor(private readonly notifyService: NotifyService) {}

  @EventPattern('notify')
  handleNotify(@Payload() data: NotificationDto, @Ctx() ctx: RmqContext){
    this.notifyService.notify(data)
  }
}