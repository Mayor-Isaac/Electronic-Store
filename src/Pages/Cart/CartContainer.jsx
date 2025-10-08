import React from 'react'
import { TiArrowLeftOutline } from 'react-icons/ti';
import { useNavigate } from 'react-router';
import RouteHeader from '../../Components/RouteHeader';
import BlueButton from '../../Components/BlueButton';
import ItemsContainer from './ItemsContainer';

export default function CartContainer() {

    const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6 h-full p-5">
      <div className="flex-1 flex flex-col overflow-auto gap-2">
              <RouteHeader title={"Cart"} />
              <div className="flex-1">
                  <ItemsContainer />
              </div>
      </div>
      <div className="flex items-center gap-8">
        <BlueButton text={"Continue Shopping"} path={"/products"} />
        <BlueButton text={"Checkout"} path={"/checkout"} />
      </div>
    </div>
  );
}
