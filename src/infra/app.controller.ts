import { randomUUID } from 'node:crypto';

import { Body, Controller, Get, Post } from '@nestjs/common';

import { PrismaService } from './infra/prisma.service';
import { CreateNotificationBody } from './infra/create-notification-body';

@Controller('notifications')
export class AppController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  list() {
    return this.prismaService.notification.findMany();
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    await this.prismaService.notification.create({
      data: {
        id: randomUUID(),
        content,
        category,
        recipientId,
      },
    });
  }
}
