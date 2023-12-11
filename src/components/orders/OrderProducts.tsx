import { FC, useState } from 'react';
import ProductDetails from '../products/ProductDetails';
import AddProductToOrderForm from '../forms/AddProductToOrderForm';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/reducers';
export interface IOrderProductsProps {
  orderId?: number | undefined;
  onCloseClick?: () => void;
}

const OrderProducts: FC<IOrderProductsProps> = ({ orderId, onCloseClick }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const orderList = useSelector((state: AppState) => state.orderList);
  const productList = useSelector((state: AppState) => state.productsList);
  
  const currentOrder = orderList.find(order => order.id === orderId);
  const currentOrderProducts = currentOrder?.products;
  const filteredProducts = productList.filter(item =>
    currentOrderProducts?.some(obj => obj.id === item.id)
  );
  
  return (
    <>
      {orderId &&
        <div
          className="order-products-wrap position-relative p-5"
          style={{ width: '60%' }}
        >
          <h5>{currentOrder?.title}</h5>
          <button
            className="btn btn-secondary mb-3"
            onClick={() => setIsModalVisible(true)}
          >
            Add product
          </button>
          { isModalVisible &&
            <AddProductToOrderForm
              orderId={orderId}
              onCloseClick={() => setIsModalVisible(false)}
            />
          }
          <img
            src="images/closeIcon.svg"
            alt="close"
            className="position-absolute top-0 end-0"
            onClick={ onCloseClick }
            style={{ cursor: 'pointer' }}
          />
          { filteredProducts && filteredProducts.length ?
            filteredProducts.map(product => (
              <ProductDetails
                key={`product-${product.id}-${uuidv4()}`}
                product={product}
                isDetailsCut
              />
            )) : (
            <div>no products in current order</div>
            )
          }
        </div>
      }
    </>
  );
}

export default OrderProducts;

