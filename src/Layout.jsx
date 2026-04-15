import React from 'react'
import { Outlet,  useNavigate } from 'react-router'
import Header from './ui/Header';
import { supabase } from './lib/supabaseClient';
import { useEffect } from 'react';
import { useState } from 'react';
import ConfirmSignout from './ConfirmSignout';
import { toast } from 'react-toastify';
import TabHeader from './ui/TabHeader';

export default function Layout() {
  const navigate = useNavigate();

  const [showOverlay, setShowSignout] = useState(false);
  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/login");
      }
    };

    checkUser();
  }, [navigate]);
  
  return (
    <div className="relative min-h-screen flex flex-col">
      <Header setShowSignout={setShowSignout} />
      {showOverlay && <ConfirmSignout setShowSignout={setShowSignout} />}
      <div className="mt-25 p-5 flex flex-col flex-1 gap-7">
        <TabHeader />
        <Outlet />
      </div>
      <p className="text-center flex items-center justify-center gap-2">
        <span className="brand">Tronix</span>{" "}
        <span className="text-[11px]">
          store &copy; {new Date().getFullYear()}
        </span>
      </p>
    </div>
  );
}
