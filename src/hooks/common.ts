import axios from "axios";
import { useState, useEffect } from "react";
import { IOrder, IProduct } from "../types/common";

export const useOrderList = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('/data.json');
        setOrders(
          window.sessionStorage.getItem('ordersList')
          ?
          JSON.parse(window.sessionStorage.getItem('ordersList')!)
          :
          response.data.orders
        );
      } catch (error) {
        console.error('Error fetching order list:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { orders, isLoading };
};


export const useProductsList = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (window.sessionStorage.getItem('productsList')) {
        setProducts(JSON.parse(window.sessionStorage.getItem('productsList')!));
        setIsLoading(false);
      } else {
        try {
          const response = await axios.get("/data.json");
          const { products } = response.data;
          setProducts(products);
        } catch (error) {
          console.error("Error fetching product list:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, []);

  return { products, isLoading };
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
        const productsList = window.sessionStorage.getItem('productsList') ? JSON.parse(window.sessionStorage.getItem('productsList')!) : response.data.products;
        const ordersList = window.sessionStorage.getItem('ordersList') ? JSON.parse(window.sessionStorage.getItem('ordersList')!) : response.data.orders; 

        const orderProductsIds = ordersList
          .find((order: IOrder) => order.id === id)?.products
          .map((product: IProduct) => product.id);

        const chosenProducts = productsList.filter((product: IProduct) => orderProductsIds?.includes(product.id));
        setProducts(chosenProducts);
      } catch (error) {
        console.error("Error fetching product by order id:", error);
      }
    })();
  }, [id]);

  return products;
};


export const useProductFilterValues2 = () => {
  const [productTypes, setProductTypes] = useState<string[]>([]);
  const [productSpecifications, setProductSpecifications] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get("/data.json")
      .then(response => {
        const { products } = response.data;
        const types = [...new Set(products.map((product: IProduct) => product.type))] as string[];
        const specifications = [...new Set(products.map((product: IProduct) => product.specification))] as string[];
        setProductTypes(types);
        setProductSpecifications(specifications);
      })
      .catch(error => {
        console.error("Error fetching product list:", error);
      });
  }, []);

  return { productTypes, productSpecifications };
};
