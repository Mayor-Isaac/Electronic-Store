import React from 'react'
import useFetch from '../../hooks/useFetch'
import { getCartItems } from '../../services/cartAPI'
import formatCurrency from '../../utils/formatCurrency';

export default function ItemsContainer() {
  const { isPending, error, data } = useFetch({
    queryFn: getCartItems,
    key: 'cartItems'
  });

  if (isPending) return <div className="p-4">Loading cart items...</div>;

  if (error) return <div className="p-4 text-red-500">An error has occurred: {error.message}</div>;
  
    const grandTotal = data?.reduce((total, item) => total + (item.price * item.quantity), 0) || 0;

  return (
    <div className="p-4">
      <div className="space-y-4 my-3">
        {data?.map((item, index) => (
          <div key={index} className="py-2">
            <CartItem item={item} />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between text-[#91B8C9]">
        <p className=" text-[18px] font-medium ">Subtotal:</p>
        <p className="text-[18px] font-bold"> {formatCurrency(grandTotal)}</p>
      </div>
    </div>
  );
}


const CartItem = ({ item }) => (
  <div className="flex justify-between items-center">
    <div className="flex gap-4 items-center">
      <div className="w-[54px] h-[54px] bg-white rounded-[8px] p-2 flex items-center justify-center">
        <img src={item.image} alt={item.name} className='rounded-[4px]' />
      </div>
      <div className="flex flex-col gap-1.5">
        <p className="font-medium text-[16px]">{item.name}</p>
        <p className="text-[#91B8C9]">Quantity: {item.quantity}</p>
      </div>
    </div>
    <p className="">{formatCurrency(item.price)}</p>
  </div>
);
