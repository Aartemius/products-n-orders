import { FC, useState } from "react";
import OrderProducts from "./OrderProducts";

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

interface IOrderProps {
  orders: IOrder[];
  onClick?: () => void;
}

const Orders: FC<IOrderProps> = ({orders, onClick}) => {
  const [activeOrderId, setActiveOrderId] = useState<number | undefined>(undefined);
  const [ordersList, setOrdersList] = useState(orders);

  const handleOrderDelete = (index: number) => {
    setOrdersList([...ordersList.slice(0, index), ...ordersList.slice(index + 1)]);
    if (activeOrderId === ordersList[index].id) {
      setActiveOrderId(undefined);
    }
  };
  
  return (
  <>
    <div style={{ width: activeOrderId ? '40%' : '100%' }}>
      <h3>Orders List / {ordersList.length}</h3>
      {ordersList.map((order, index) => (
        <div
          key={`order${order.id}`}
          onClick={() => setActiveOrderId(order.id)}
          className="d-flex align-items-center border border-dark mb-2 justify-content-between p-2"
        >
          {!activeOrderId &&
            <span>{order.title}</span>
          }
          <img
            src="images/listIcon.svg"
            alt="products"
            onClick={onClick}
            style={{
              width: '30px',
              cursor: 'pointer'
            }}
          />
          <span className="text-start">
            {order.products.length ? order.products.length : 'No'}<br/>Product(s)
          </span>
          {!activeOrderId &&
            <span>{order.description}</span>
          }
          <span>{order.date}</span>
          <img
            style={{
              width: '30px',
              cursor: 'pointer'
            }}
            src="images/deleteicon.svg"
            alt="delete"
            onClick={(e) => {
              e.stopPropagation();
              handleOrderDelete(index);
            }}
          />
        </div>
      ))}
    </div>
    <OrderProducts
      orderId={activeOrderId}
      onClick={() => setActiveOrderId(undefined)}
    />
  </>
)}

export default Orders;