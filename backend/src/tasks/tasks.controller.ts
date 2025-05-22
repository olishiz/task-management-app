import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Status, Task } from "./models/task.model";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(
    @Body()
    createTaskDto: {
      title: string;
      description: string;
      assignedTo: string;
    },
  ): Promise<Task> {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  async findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Task> {
    return this.tasksService.findOne(id);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body()
    updateTaskDto: Partial<{
      title: string;
      description: string;
      assignedTo: string;
      status: Status;
    }>,
  ): Promise<Task> {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param("id") id: string): Promise<void> {
    return this.tasksService.remove(id);
  }
}
