import { IOrder } from '../components/orders/Orders';
import { IProduct } from '../components/products/ProductDetails';
import { ActionTypes } from './actions';
import { combineReducers } from 'redux';

export interface AppState {
  orderList: IOrder[];
  product: IProduct | null;
  productsList: IProduct[];
}

const orderListReducer = (state: IOrder[] = [], action: any) => {
  switch (action.type) {
    case ActionTypes.SET_ORDER_LIST:
      return action.payload;
    default:
      return state;
  }
};

const productReducer = (state: IProduct | null = null, action: any) => {
  switch (action.type) {
    case ActionTypes.SET_PRODUCT:
      return action.payload;
    default:
      return state;
  }
};

const productsListReducer = (state: IProduct[] = [], action: any) => {
  switch (action.type) {
    case ActionTypes.SET_PRODUCTS_LIST:
      return action.payload;
    default:
      return state;
  }
};

export const rootReducer = combineReducers<AppState>({
  orderList: orderListReducer,
  product: productReducer,
  productsList: productsListReducer,
});
