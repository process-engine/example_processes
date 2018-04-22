import {CategoryRepository} from './category_repository';

export class CategoryService {

  private categoryRepository: CategoryRepository;

  constructor(categoryRepository: CategoryRepository) {

    this.categoryRepository = categoryRepository;
  }

  public getBooksByCategory(categoryName: string): Array<any> {

    return [];
  }

  public getCategories(): Array<string> {

    return undefined;
  }
}
