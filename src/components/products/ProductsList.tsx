import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useProductFilterValues, useProductsList } from "../../hooks/common";
import { AppState } from "../../store/reducers";
import ProductDetails, { IProduct } from "./ProductDetails";
import { setProductsList } from "../../store/actions";

const ProductsList = () => {
  const { products, isLoading } = useProductsList();
  const dispatch = useDispatch();

  const [productFilters, setProductFilters] = useState<{
    productTypes: unknown[];
    productSpecifications: unknown[];
  }>({
    productTypes: [],
    productSpecifications: []
  });

  useEffect(() => {
    dispatch(setProductsList(products));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  useEffect(() => {
    (async () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const filters = await useProductFilterValues();
      setProductFilters(filters);
    })();
  }, [dispatch]);

  const productList = useSelector((state: AppState) => state.productsList);
  const [selectedType, setSelectedType] = useState("");
  const [selectedSpecification, setSelectedSpecification] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    setFilteredProducts(
      productList.filter((product: IProduct) => {
        const matchType = product.type.includes(selectedType);
        const matchSpecification = product.specification.includes(selectedSpecification);
        return matchType && matchSpecification;
      })
    );
  }, [selectedType, selectedSpecification, productList]);

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value);
  };

  const handleSpecificationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSpecification(event.target.value);
  };

  const handleProductDelete = (index: number) => {
    productList.splice(index, 1);
    setFilteredProducts([...filteredProducts.slice(0, index), ...filteredProducts.slice(index + 1)]);
  };

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <>
          <div className="d-flex mb-5 align-items-center">
            <h3 className="me-3">Products / {filteredProducts.length}</h3>
            <label htmlFor="type" className="me-1">Type: </label>
            <select
              name="type"
              id="type"
              onChange={handleTypeChange}
              className="me-3 form-select"
              style={{ width: 'fit-content' }}
            >
              <option value="">All Types</option>
              {productFilters.productTypes.length &&
                productFilters.productTypes.map((filter) => (
                  <option value={filter as string} key={filter as string}>
                    {filter as string}
                  </option>
                ))}
            </select>
            <label htmlFor="specification" className="me-1">Specification: </label>
            <select
              name="specification"
              id="specification"
              onChange={handleSpecificationChange}
              className="form-select"
              style={{ width: 'fit-content' }}
            >
              <option value="">All Specifications</option>
              {productFilters.productSpecifications.length &&
                productFilters.productSpecifications.map((filter) => (
                  <option value={filter as string} key={filter as string}>
                    {filter as string}
                  </option>
                ))}
            </select>
          </div>
          {filteredProducts.length ? (
            filteredProducts.map((product, index) => (
              <ProductDetails
                product={product}
                key={`product${product.id}`}
                onClick={() => handleProductDelete(index)}
              />
            ))
          ) : (
            <div>No results found</div>
          )}
        </>
      )}
    </>
  );
};

export default ProductsList;
