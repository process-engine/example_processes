import {ExecutionContext, IEntity, IInheritedSchema, SchemaAttributeType} from '@essential-projects/core_contracts';
import {Entity, EntityDependencyHelper, IEntityType, IPropertyBag} from '@essential-projects/data_model_contracts';
import {schemaAttribute} from '@essential-projects/metadata';
import {IStoreEntity} from '../interfaces';

export class StoreEntity extends Entity implements IStoreEntity {

  constructor(entityDependencyHelper: EntityDependencyHelper,
              context: ExecutionContext,
              schema: IInheritedSchema,
              propertyBag: IPropertyBag,
              entityType: IEntityType<IEntity>) {
    super(entityDependencyHelper, context, schema, propertyBag, entityType);
  }

  public initialize(): Promise<void> {
    return super.initialize(this);
  }

  @schemaAttribute({ type: SchemaAttributeType.string })
  public get key(): string {
    return this.getProperty(this, 'key');
  }

  public set key(value: string) {
    this.setProperty(this, 'key', value);
  }

  @schemaAttribute({ type: SchemaAttributeType.object })
  public get value(): any {
    return this.getProperty(this, 'value');
  }

  public set value(value: any) {
    this.setProperty(this, 'value', value);
  }

}
