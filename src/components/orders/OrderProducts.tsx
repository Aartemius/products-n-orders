import { FC } from 'react';
import ProductDetails from '../products/ProductDetails';
import { useProductsByOrderId } from '../../hooks/common';

export interface IOrderProductsProps {
  orderId: number | undefined;
  onClick?: () => void;
}

const OrderProducts: FC<IOrderProductsProps> = ({orderId, onClick}) => {
  const products = useProductsByOrderId(orderId);

  return (
    <>
      {products?.length > 0 &&
        <div
          className="order-products-wrap position-relative p-5"
          style={{ width: '60%' }}
        >
          <img
            src="images/closeIcon.svg"
            alt="close"
            className="position-absolute top-0 end-0"
            onClick={onClick}
            style={{ cursor: 'pointer' }}
          />
          {
          products ?
            products.map(product => (
              <div>
                <ProductDetails
                  key={`product${product.id}`}
                  product={product}
                />
              </div>
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