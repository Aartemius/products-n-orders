import Orders from './Orders';
import { useOrderList } from '../../hooks/common';
import { useDispatch, useSelector } from 'react-redux';
import { setOrderList } from '../../store/actions';
import { useEffect } from 'react';
import { AppState } from '../../store/reducers';

const OrderList = () => {
  const { orders, isLoading} = useOrderList();
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(setOrderList(orders));
  }, [dispatch, orders]);

  const orderList = useSelector((state: AppState) => state.orderList);

  return (
    <div>
      {isLoading &&
        <div>Loading...</div>
      }
      {!isLoading &&
        <div className="d-flex">
          {
            orderList.length ? (
              <Orders orders={orderList} />
            ) : 
            <div>No results found</div>
          }
        </div>
      }
    </div>
  );
};

export default OrderList;
