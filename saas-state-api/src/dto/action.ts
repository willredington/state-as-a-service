import { PropertyType } from '@prisma/client';

export interface CreateActionDto {
  reducerId: number;
  actionName: string;
  actionType: string;
  property: string;
  propertyType: PropertyType;
  handlerName: string;
  handlerClz: string;
  validatorClz: string;
}
