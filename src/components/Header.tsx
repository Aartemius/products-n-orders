import { FC } from 'react';
import { getDateTime } from '../utils/common';
import Clock from './Clock';

const Header: FC = () => {
  const { currentDate } = getDateTime();

  return (
    <header
      className="d-flex align-items-center justify-content-between shadow"
      style={{
        height: '10vh',
        padding: '0 10vw'
      }}
    >
      <div style={{ color: 'green' }}>
      <img
        src="images/inventoryIcon.svg"
        alt="inventory"
        className="me-2"
      />
        INVENTORY
      </div>
      <div>
        <div style={{ textAlign: 'left' }}>Today,</div>
        <span>{currentDate}</span>
        <img
          src="images/clock.svg"
          alt="time"
          style={{ width: '18px' }}
          className="me-3 ms-3"
        />
        <Clock />
      </div>
    </header>
  );
}

export default Header;