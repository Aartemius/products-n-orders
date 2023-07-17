import { ChangeEvent, FC, FormEvent, useState } from "react";
import { useProductFilterValues2, useProductsList } from "../../hooks/common";
import { getDateTime } from "../../utils/common";
import { useDispatch } from "react-redux";
import { setProductsList } from "../../store/actions";

interface AddProductFormProps {
  isVisible?: boolean;
  onSubmit: () => void;
}

const AddProductForm: FC<AddProductFormProps> = ({ isVisible, onSubmit }) => {
  const [imageSrc, setImageSrc] = useState<string>("");
  const { productTypes, productSpecifications } = useProductFilterValues2();
  const dispatch = useDispatch();
  const { products } = useProductsList();

  const handleClose = () => onSubmit();

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: { [key: string]: string | File } = {};
    formData.forEach((value, key) => {
      if (key === "guaranteeFrom" || key === "guaranteeTo") {
        const dateInput = event.currentTarget.elements.namedItem(key) as HTMLInputElement;
        const timeInput = event.currentTarget.elements.namedItem(key + "Time") as HTMLInputElement;
        data[key] = `${dateInput.value} ${timeInput.value}:00`;
      } else {
        data[key] = String(value);
      }
      onSubmit();
    });
    const { formattedDateTime } = getDateTime();

    const newId = Math.max(...(products.map(prod => prod.id))) + 1;

    products.push({
      id: newId,
      serialNumber: Number(data.serialNumber),
      isNew: data.isNew === 'New' ? true : false,
      photo: imageSrc,
      title: data.title as string,
      type: data.type as string,
      specification: data.specification as string,
      guarantee: {
        start: `${data.guaranteeFrom}`,
        end: `${data.guaranteeTo}`,
      },
      price: [{
        value: Number(data.price),
        symbol: data.currency as string,
        isDefault: true,
      }, {
        value: data.currency === 'usd' ? Number(data.price) / 37 : Number(data.price) * 37,
        symbol: data.currency === 'usd' ? 'UAH' : 'USD',
        isDefault: false,
      }],
      order: Number(data.order),
      date: formattedDateTime,
    })
    window.sessionStorage.setItem('productsList', JSON.stringify(products));
    dispatch(setProductsList(products));
  };

  return (
    <>
      <div className="modal show" style={{ display: "block" }}>
        <div className="modal-dialog">
          <div className="modal-content">
          <button
            type="button"
            className="btn-close position-absolute top-1 end-0 mt-1 me-1"
            onClick={handleClose}
          ></button>
            <form
              action="/submit"
              method="post"
              onSubmit={handleSubmit}
              className="d-flex flex-row flex-wrap p-4"
            >
              <div className="w-100 d-flex mb-2">
                <label className="me-2" htmlFor="photo">Upload Image:</label>
                <input type="file" id="photo" name="photo" accept="image/*" onChange={handleImageChange} required />
              </div>

              <div className="w-100 d-flex mb-2">
                <label className="me-2" htmlFor="title">Title:</label>
                <input type="text" id="title" name="title" required />
              </div>

              <div className="w-100 d-flex mb-2">
                <label className="me-2" htmlFor="serialNumber">Serial Number:</label>
                <input type="number" id="serialNumber" name="serialNumber" required />
              </div>

              <div className="w-100 d-flex mb-2">
                <label className="me-2" htmlFor="isNew">Condition:</label>
                <select id="isNew" name="isNew" required>
                  <option value="new">New</option>
                  <option value="used">Used</option>
                </select>
              </div>

              <div className="w-100 d-flex mb-2">
                <label className="me-2" htmlFor="type">Category:</label>
                <select id="type" name="type" required>
                  {productTypes &&
                    productTypes.length &&
                    productTypes.map((filter) => (
                      <option value={filter} key={filter}>
                        {filter}
                      </option>
                    ))}
                </select>
              </div>

              <div className="w-100 d-flex mb-2">
                <label className="me-2" htmlFor="guaranteeFrom">Guarantee Date From:</label>
                <input className="me-2" type="date" id="guaranteeFrom" name="guaranteeFrom" required />
                <input type="time" id="guaranteeFromTime" name="guaranteeFromTime" required />
              </div>

              <div className="w-100 d-flex mb-2">
                <label className="me-2" htmlFor="guaranteeTo">Guarantee Date To:</label>
                <input className="me-2" type="date" id="guaranteeTo" name="guaranteeTo" required />
                <input type="time" id="guaranteeToTime" name="guaranteeToTime" required />
              </div>

              <div className="w-100 d-flex mb-2">
                <label className="me-2" htmlFor="price">Price:</label>
                <input type="text" id="price" name="price" required />
                <select id="currency" name="currency" required>
                  <option value="USD" key="usd">
                    USD
                  </option>
                  <option value="UAH" key="uah">
                    UAH
                  </option>
                </select>
              </div>

              <div className="w-100 d-flex mb-2">
                <label className="me-2" htmlFor="specification">Specification:</label>
                <select id="specification" name="specification" required>
                  {productSpecifications.length &&
                    productSpecifications.map((filter) => (
                      <option value={filter} key={filter}>
                        {filter}
                      </option>
                    ))}
                </select>
              </div>

              <div className="w-100 d-flex mb-2">
                <label className="me-2" htmlFor="order">List Order:</label>
                <input type="number" id="order" name="order" required />
              </div>

              <div className="w-100 d-flex mb-2">
                <button className="me-2 btn btn-outline-dark" onClick={handleClose}>Cancel</button>
                <input className="btn-primary btn" type="submit" value="Submit" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProductForm;
