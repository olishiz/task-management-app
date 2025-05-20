import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateTaskInput {
  @Field()
  id: string;

  @Field()
  status: string;
}
