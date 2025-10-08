import React from 'react'
import { TiArrowLeftOutline } from 'react-icons/ti';
import { useNavigate } from 'react-router';

export default function RouteHeader({ title }) {

    const navigate = useNavigate();

  return (
    <div>
        <div className="flex items-center gap-6">
                <TiArrowLeftOutline
                  size={28}
                  onClick={() => navigate(-1)}
                  className="cursor-pointer hover:scale-110 transition"
                />
                <h3 className="font-bold text-[18px] flex-1 text-center">
                  {title}
                </h3>
              </div>
    </div>
  )
}
