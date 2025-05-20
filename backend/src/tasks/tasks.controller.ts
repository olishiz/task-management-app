import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './models/task.model';
import { Status } from '@prisma/client';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getAllTasks(): Promise<Task[]> {
    return this.tasksService.getAllTasks();
  }

  @Get(':id')
  async getTask(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTask(id);
  }

  @Post()
  async createTask(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('assignedTo') assignedTo: string,
  ): Promise<Task> {
    return this.tasksService.createTask(title, description, assignedTo);
  }

  @Put(':id')
  async updateTask(
    @Param('id') id: string,
    @Body('title') title?: string,
    @Body('description') description?: string,
    @Body('assignedTo') assignedTo?: string,
    @Body('status') status?: string, // Accept status as a string
  ): Promise<Task> {
    // Convert status string to Prisma Enum
    const mappedStatus = status ? this.mapStringToStatus(status) : undefined;

    return this.tasksService.updateTask(id, {
      title,
      description,
      assignedTo,
      status: mappedStatus, // Pass the mapped status
    });
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string): Promise<Task> {
    return this.tasksService.deleteTask(id);
  }

  // Helper function to map status string to Prisma Status Enum
  private mapStringToStatus(status: string): Status | undefined {
    const upperStatus = status.toUpperCase();
    if (Object.values(Status).includes(upperStatus as Status)) {
      return upperStatus as Status;
    }
    return undefined; // Return undefined if status is invalid
  }
}
