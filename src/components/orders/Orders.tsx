import { FC, useEffect, useState } from "react";
import OrderProducts from "./OrderProducts";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../store/reducers";
import { useOrderList, useProductsList } from "../../hooks/common";
import { setOrderList, setProductsList } from "../../store/actions";
import Order from "./Order";

const Orders: FC = () => {
  const [activeOrderId, setActiveOrderId] = useState<number | undefined>(undefined);
  const dispatch = useDispatch();
  const { orders, isLoading } = useOrderList();

  const { products } = useProductsList();
  useEffect(() => {
    dispatch(setProductsList(products));
    dispatch(setOrderList(orders));
  }, [
  products,
  dispatch,
  orders
]);


  const orderList = useSelector((state: AppState) => state.orderList);
  
  return (
  <>
    <div style={{ width: activeOrderId ? '40%' : '100%' }}>
      <h3>Orders List / {orderList.length}</h3>
      {isLoading &&
        <div>Loading...</div>
      }
      <div className="d-flex flex-column">
      {orderList.map((order, index) => (
        <Order 
          key={order.id}
          order={order}
          onClick={() => setActiveOrderId(prevId => {
            if (prevId && prevId === order.id) {
              return undefined;
            }
            
            return order.id;
          })}
        />
      ))}
      </div>
    </div>
    <OrderProducts
      orderId={activeOrderId}
      onCloseClick={() => setActiveOrderId(undefined)}
    />
  </>
)}

export default Orders;