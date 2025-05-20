// import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
// import { TasksService } from './tasks.service';
// import { CreateTaskInput } from './dto/create-task.input';
// import { UpdateTaskInput } from './dto/update-task.input';
// import { Status, Task } from '@prisma/client';
//
// @Resolver(() => Task)
// export class TasksResolver {
//   constructor(private readonly tasksService: TasksService) {}
//
//   @Query(() => [Task])
//   getAllTasks() {
//     return this.tasksService.getAllTasks();
//   }
//
//   @Mutation(() => Task)
//   createTask(@Args('data') data: CreateTaskInput) {
//     return this.tasksService.createTask(
//       data.title,
//       data.description,
//       data.assignedTo,
//     );
//   }
//
//   @Mutation(() => Task)
//   updateTask(@Args('data') data: UpdateTaskInput) {
//     return this.tasksService.updateTask(data.id, data.status as Status);
//   }
//
//   @Mutation(() => Task)
//   deleteTask(@Args('id') id: string) {
//     return this.tasksService.deleteTask(id);
//   }
// }
