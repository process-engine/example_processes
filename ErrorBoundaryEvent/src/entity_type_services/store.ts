import {ExecutionContext, IQueryObject} from '@essential-projects/core_contracts';
import {IDatastoreService, IEntityCollection, IEntityType} from '@essential-projects/data_model_contracts';
import {IStoreEntity, IStoreEntityTypeService} from '../interfaces';

const STORE_ENTITY_TYPE_NAME: string = 'Store';

export class StoreEntityTypeService implements IStoreEntityTypeService {

  private _datastoreService: IDatastoreService = undefined;

  constructor(datastoreServiceFactory: IDatastoreService) {
    this._datastoreService = datastoreServiceFactory;
  }

  private get datastoreService(): IDatastoreService {
    return this._datastoreService;
  }

  public async getAllValuesByKey(context: ExecutionContext, key: string): Promise<Array<any>> {
    const getValuesByKeyQuery: IQueryObject = {
      attribute: 'key',
      operator: '=',
      value: key,
    };

    const storeEntities: IEntityCollection<IStoreEntity> = await this.datastoreService.getCollection<IStoreEntity>(STORE_ENTITY_TYPE_NAME, context, {
      query: getValuesByKeyQuery,
      limit: 'ALL',
    });

    const result: Array<any> = storeEntities.data.map((storeEntity: IStoreEntity) => {
      return storeEntity.value;
    });

    return result;
  }
}
