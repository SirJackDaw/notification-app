import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { DatabaseService } from '../database/database.service';
import { ClientProxy } from '@nestjs/microservices';
import { NotificationDto } from 'libs/common';
import { Observable, tap } from 'rxjs';
import { Item, PrismaPromise } from '@prisma/client';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor(private readonly dbService: DatabaseService, @Inject('NOTIFY') private notifyClient: ClientProxy){}
  DATE_OFFSET = 2 * 3600 * 1000

  @Cron('* * * * *')
  async notifyDeadlines() {
    this.logger.log('hey')
    const dateFrom = new Date()
    const dateTo = new Date(Date.now() + this.DATE_OFFSET );

    const deadlines = await this.dbService.item.findMany({
      where: { 
        // deadline: { gte: dateFrom, lte: dateTo }, 
        done: false, 
        NOT: { cases: { some: {id: 1}}}
      },
      select: { userId: true, title: true, id: true, cases: true },
    })

    if (deadlines.length == 0) return

    let updateManyTransaction: PrismaPromise<Item>[] = []

    deadlines.forEach(async (item) => {
      this.notify(item).pipe(tap(res => this.logger.log(res)))

      updateManyTransaction.push(this.dbService.item.update({
        where: {id: item.id},
        data: { cases: { set: [{id: 1}] }}
      }))
    })

    this.dbService.$transaction(updateManyTransaction).then()
  }

  notify(item: { userId: string, title: string, id: string }): Observable<any> {
    return this.notifyClient.emit('notify', {
      receivers: [item.userId],
      header: 'Deadline',
      message: `Deadline for todo "${item.title}" is coming to end`,
      additionalData: null
    })
  }
}