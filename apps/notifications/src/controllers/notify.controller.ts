import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { NotifyService } from '../services/notify.service';

@Controller()
export class NotifyController {
  constructor(private readonly notifyService: NotifyService) {}

  @EventPattern('notify')
  handleNotify(@Payload() data: any, @Ctx() ctx: RmqContext){
    this.notifyService.notify(data, 'hui')
  }
}