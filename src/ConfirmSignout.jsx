import React from "react";
import RedBtn from "./Components/RedBtn";
import GrayBtn from "./Components/GrayBtn";
import { useNavigate } from "react-router";
import { supabase } from "./lib/supabaseClient";
import { toast } from "react-toastify";

export default function ConfirmSignout({ setShowSignout }) {
  const navigate = useNavigate();

  const confirmSignOut = async () => {
    const { error } = await supabase.auth.signOut(); 

    if (!error) {
      setShowSignout(false);
      navigate("/login");
      toast.success("You have been signed out.");
    } else {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 shadow-[0_0_12px_rgba(0,0,0,0.12)] rounded-[10px] w-fit p-6 absolute -top-1 bg-white/92 right-3">
      <h3>Are you sure you want to sign out?</h3>
      <div className="flex items-center gap-4">
        <RedBtn onClick={confirmSignOut} text="Yes, I'm sure" />
        <GrayBtn onClick={() => setShowSignout(false)} text="Cancel" />
      </div>
    </div>
  );
}
