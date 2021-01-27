import { Injectable } from '@nestjs/common';
import { CommonState } from 'saas-common';
import { SchemaFactory } from '.';

@Injectable()
export class CommonStateSchemaFactory implements SchemaFactory<CommonState> {
  generate() {
    return {
      date: new Date().toISOString().slice(0, 10),
    };
  }
}
