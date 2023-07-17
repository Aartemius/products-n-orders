export enum ProductTypes {
  COMPUTERS = 'Computers',
  MONITORS = 'Monitors'
}


export interface IProduct {
  id: number;
  serialNumber: number;
  isNew: boolean;
  photo: string;
  title: string;
  type: string;
  specification: string;
  guarantee: {
    start: string;
    end: string;
  };
  price: {
    value: number;
    symbol: string;
    isDefault: boolean;
  }[];
  order: number;
  date: string;
}


export interface IOrder {
  id: number;
  title: string;
  date: string;
  description: string;
  products: {
    id: number;
    quantity: number;
  }[];
}