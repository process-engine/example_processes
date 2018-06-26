import {EventAggregator, Subscription} from 'aurelia-event-aggregator';
import {bindable, inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {ShoppingCartService} from '../shopping-cart/shopping-cart.service';

@inject(Router, ShoppingCartService, EventAggregator)
export class BookstoreNav {

  public router: Router;
  @bindable() public shoppingCartLabel: string;

  private _shoppingCartService: ShoppingCartService;
  private _eventAggregator: EventAggregator;
  private _cartUpdateSubscription: Subscription;

  constructor(router: Router, shoppingCartService: ShoppingCartService,
              eventAggregator: EventAggregator) {

    this.router = router;
    this._shoppingCartService = shoppingCartService;
    this._eventAggregator = eventAggregator;
  }

  public attached(): void {

    this.updateCartLabel();

    this._cartUpdateSubscription = this._eventAggregator
      .subscribe('cartUpdate', () => {
        this.updateCartLabel();
      });

  }

  public detached(): void {

    this._cartUpdateSubscription.dispose();
  }

  private updateCartLabel(): void {

    const numberOfBooks: number = this._shoppingCartService.getNumberOfBooks();

    if (numberOfBooks === 0) {
      return;
    }

    if (numberOfBooks === 1) {
      this.shoppingCartLabel = '1 Book';
      return;
    }

    this.shoppingCartLabel = `${numberOfBooks} Books`;
  }
}
