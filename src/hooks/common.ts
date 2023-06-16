import axios from "axios";
import { useState, useEffect } from "react";
import { IOrder } from "../components/orders/Orders";
import { IProduct } from "../components/products/ProductDetails";


export const useOrderList = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('/data.json');
        setOrders(response.data.orders);
      } catch (error) {
        console.error('Error fetching order list:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return {orders, isLoading};
};


export const useProductsList = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/data.json");
        const { products } = response.data;
        setProducts(products);
      } catch (error) {
        console.error("Error fetching product list:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return {products, isLoading};
};


export const useProductFilterValues = async () => {
  try {
    const response = await axios.get("/data.json");
    const { products } = response.data;

    const productTypes = [...new Set(products.map((product: IProduct) => product.type))];
    const productSpecifications = [...new Set(products.map((product: IProduct) => product.specification))];

    return { productTypes, productSpecifications };

  } catch (error) {
    console.error("Error fetching product list:", error);
    return { productTypes: [], productSpecifications: [] };
  }
};


export const useProductsByOrderId = (id: number | undefined) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/data.json");
        const orderProductsIds = response.data.orders
          .find((order: IOrder) => order.id === id)?.products
          .map((product: IProduct) => product.id);
        const chosenProducts = response.data.products.filter((product: IProduct) => orderProductsIds?.includes(product.id));
        setProducts(chosenProducts);
      } catch (error) {
        console.error("Error fetching product by order id:", error);
      }
    })();
  }, [id]);
  return products;
};
