import { FC, FormEvent } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useOrderList } from "../../hooks/common";
import { useDispatch, useSelector } from "react-redux";
import { setOrderList } from "../../store/actions";
import { AppState } from "../../store/reducers";

interface AddProductToOrderProps {
  orderId: number;
  onCloseClick: () => void;
}

const AddProductToOrderForm: FC<AddProductToOrderProps> = ({ orderId, onCloseClick }) => {
  // const { products } = useProductsList();
  const products = useSelector((state: AppState) => state.productsList);
  const { orders } = useOrderList();
  const dispatch = useDispatch();

  const orderProducts = { ...orders.find(order => order.id === orderId) }.products;

  const filteredProducts = products.filter(product =>
    !orderProducts?.some(op => op.id === product.id)
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: { [key: string]: string } = {};
    formData.forEach((value, key) => {
      data[key] = String(value);
    })
    onCloseClick();
    orders.forEach(order => {
      if (order.id === orderId) {
        order.products.push({
          quantity: 1,
          id: Number(data.productId),
        })
      }
    })
    window.sessionStorage.setItem('ordersList', JSON.stringify(orders));
    dispatch(setOrderList(orders));
  }

  return (
    <>
      <div className="modal show" style={{ display: "block" }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <form action="/submit" method="post" onSubmit={handleSubmit}>
              <select id="productId" name="productId" required>
                {filteredProducts && filteredProducts.length &&
                  filteredProducts.map((product) => (
                    <option value={product.id} key={product.id + uuidv4()}>
                      {product.title}
                    </option>
                  ))}
              </select><br />
              <button type="button" onClick={onCloseClick}>
                Cancel
              </button>
              <input type="submit" value="Add product to this order" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddProductToOrderForm;