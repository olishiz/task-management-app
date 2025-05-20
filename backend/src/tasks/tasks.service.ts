import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Status, Task } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async getAllTasks(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  async getTask(id: string): Promise<Task> {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

  async createTask(
    title: string,
    description: string,
    assignedTo: string,
  ): Promise<Task> {
    return this.prisma.task.create({
      data: { title, description, assignedTo, status: Status.PENDING },
    });
  }

  async updateTask(
    id: string,
    updateData: {
      title?: string;
      description?: string;
      assignedTo?: string;
      status?: Status;
    },
  ): Promise<Task> {
    return this.prisma.task.update({
      where: { id },
      data: { ...updateData }, // Dynamically update only provided fields
    });
  }

  async deleteTask(id: string): Promise<Task> {
    return this.prisma.task.delete({ where: { id } });
  }
}
