import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOrderList } from "../../store/actions";
import { AppState } from "../../store/reducers";
import { useOrderList } from "../../hooks/common";
import { v4 as uuidv4 } from 'uuid';
import { IOrder } from "../../types/common";

interface IOrderProps {
  onClick?: () => void;
  order: IOrder;
}

const Order: FC<IOrderProps> = ({ onClick, order }) => {
  const [activeOrderId, setActiveOrderId] = useState<number | undefined>(undefined);
  const dispatch = useDispatch();
  const orderList = useSelector((state: AppState) => state.orderList);
  const { orders } = useOrderList();

  const handleOrderDelete = (orderId: number) => {
    const filteredOrdersList = orderList.filter((order: IOrder) => order.id !== orderId)
    window.sessionStorage.setItem('ordersList', JSON.stringify(filteredOrdersList));
    dispatch(setOrderList(filteredOrdersList));
    if (activeOrderId === orders.find((order: IOrder) => order.id === orderId)) {
      setActiveOrderId(undefined);
    }
  };

  return (
    <div
      key={`order-${order.id}-${uuidv4()}`}
      onClick={onClick}
      className="d-flex align-items-center border border-dark mb-2 justify-content-between p-2"
      style={{ cursor: 'pointer' }}
    >
      {!activeOrderId &&
        <span>{order.title}</span>
      }
      <img
        src="images/listIcon.svg"
        alt="products"
        style={{
          width: '30px',
          cursor: 'pointer'
        }}
      />
      <span className="text-start">
        {order.products.length ? order.products.length : '0'}<br/>Product(s)
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
        src="images/deleteIcon.svg"
        alt="delete"
        onClick={(e) => {
          e.stopPropagation();
          handleOrderDelete(order.id);
        }}
      />
    </div>
  );
}

export default Order;