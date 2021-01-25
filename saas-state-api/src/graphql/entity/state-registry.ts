import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class StateRegistry {
  @Field((type) => ID)
  id: string;

  @Field()
  stateKey: string;

  @Field()
  created: Date;
}
