import { Field, ObjectType } from '@nestjs/graphql';
import { Status } from '@prisma/client';

@ObjectType()
export class Task {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  assignedTo: string;

  @Field(() => Status) // Use Prisma's Status enum
  status: Status;

  @Field()
  createdAt: Date;
}
