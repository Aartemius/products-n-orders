/* eslint-disable no-unused-vars */
import { IOrder, IProduct } from "../types/common";

export enum ActionTypes {
  SET_ORDER_LIST = 'SET_ORDER_LIST',
  SET_PRODUCT = 'SET_PRODUCT',
  SET_PRODUCTS_LIST = 'SET_PRODUCTS_LIST',
}

export const setOrderList = (orderList: IOrder[]) => ({
  type: ActionTypes.SET_ORDER_LIST,
  payload: orderList,
});

export const setProduct = (product: IProduct | null) => ({
  type: ActionTypes.SET_PRODUCT,
  payload: product,
});

export const setProductsList = (products: IProduct[]) => ({
  type: ActionTypes.SET_PRODUCTS_LIST,
  payload: products,
});

