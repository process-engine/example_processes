import {EventAggregator} from 'aurelia-event-aggregator';
import {inject} from 'aurelia-framework';
import {ICartEntry} from '../interfaces';
import {ShoppingCartService} from './shopping-cart.service';

@inject(ShoppingCartService, EventAggregator)
export class ShoppingCart {

  public cartContents: Array<{
    title: string,
    num: number,
  }> = [];

  private _shoppingCartService: ShoppingCartService;
  private _eventAggregator: EventAggregator;

  constructor(shoppingCartService: ShoppingCartService,
              eventAggregator: EventAggregator) {

    this._shoppingCartService = shoppingCartService;
    this._eventAggregator = eventAggregator;
  }

  public attached(): void {

    this._updateCart();
    this._eventAggregator.subscribe('cartUpdate', () => {
      this._updateCart();
    });
  }

  private _updateCart(): void {

    Object.assign(this.cartContents, this._shoppingCartService.getCartContents());
  }
}
