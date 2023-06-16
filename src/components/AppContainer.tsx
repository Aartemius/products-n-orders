import { Link, Routes, Route, useLocation } from "react-router-dom";
import OrderList from "./orders/OrderList";
import ProductsList from "./products/ProductsList";
import { FC } from "react";
import { links } from "../links";

const AppContainer: FC = () => {
  const location = useLocation();
  
  return (
    <>
      <div
        className="sidebar p-3 d-flex align-items-start justify-content-center flex-column shadow"
        style={{ height: '90vh' }}
      >
        <div className="profile-img-wrap mb-5">
          <img src="images/avatar.jpg" alt="avatar" />
        </div>
        <Link
          className="text-reset"
          to={links.products.path}
          style={{ textDecoration: location.pathname === links.products.path ? 'underline' : 'none' }}
        >
          {links.products.name}
        </Link>
        <Link
          className="text-reset"
          to={links.orders.path}
          style={{ textDecoration: location.pathname === links.orders.path ? 'underline' : 'none' }}
        >
          {links.orders.name}
        </Link>
      </div>
      <div
        className="app-wrap p-3 pt-5"
        style={{ background: 'rgba(0,0,0, .05)' }}
      >
        <Routes>
          <Route path={links.products.path} element={<ProductsList />} />
          <Route path={links.orders.path} element={<OrderList />} />
        </Routes>
      </div>
    </>
  )
};

export default AppContainer;