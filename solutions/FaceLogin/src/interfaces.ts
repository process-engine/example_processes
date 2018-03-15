import {ExecutionContext, IEntity} from '@essential-projects/core_contracts';

export interface IStoreEntityTypeService {
  getAllValuesByKey(context: ExecutionContext, key: string): Promise<Array<any>>;
}

export interface IStoreEntity extends IEntity {
  key: string;
  value: any;
}
