import { FC } from 'react';
import { ProductTypes } from '../../types/common';
import './ProductDetails.scss';

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

interface ProductDetailsProps {
  product: IProduct;
  onClick?: () => void;
}

const ProductDetails: FC<ProductDetailsProps> = ({product, onClick}) => (
  <>
    {product &&
      <div
        className="product-card d-flex p-1 align-items-center justify-content-between w-100 border mb-2"
        style={ {
          order: product.order,
          background: '#fff'
        } }
      >
        <div style={{
          width: '5px',
          height: '5px',
          borderRadius: '50%',
          alignSelf: 'center',
          background: product.type === ProductTypes.MONITORS ? 'orange' : 'green',
          
        }}></div>
        <div className="product-img-wrap">
          <img src={product.photo} alt={product.title} style={{ height: '100%', maxHeight: '50px' }}/>
        </div>
        <div className="d-flex flex-column product-title-wrap">
          <div>{product.title}</div>
          <div className="text-black-50">{product.serialNumber}</div>
        </div>
        <div className="product-type" style={{ color: product.type === ProductTypes.MONITORS ? 'orange' : 'green' }}>{product.type}</div>
        <div className="d-flex flex-column guarantee-wrap">
          <div className="text-black-50">from {product.guarantee.start}</div>
          <div className="text-black-50">to {product.guarantee.end}</div>
        </div>
        <div className="is-new">{ product.isNew ? 'new' : 'used' }</div>
        <div className="d-flex flex-column price-wrap">
          <div>
            {
              `${product.price.find(price => price.isDefault)?.symbol}
              ${(product.price.find(price => price.isDefault)?.value)?.toFixed(2)}`
            }
          </div>
          <div>
            {
              `${product.price.find(price => !price.isDefault)?.symbol}
              ${(product.price.find(price => !price.isDefault)?.value)?.toFixed(2)}`
            }
          </div>
        </div>
        <div className="product-specification">{product.specification}</div>
        <div className="product-date">{product.date}</div>
        {onClick &&
          <div
            onClick={onClick}
            style={{ cursor: 'pointer' }}
          >
            <img style={{ width: '30px' }} src="images/deleteicon.svg" alt="delete" />
          </div>
        }
      </div>
    }
  </>
);

export default ProductDetails;
