import { FilePlusIcon, XIcon } from '@phosphor-icons/react'
import React from 'react'
import BlueButton from '../../../ui/BlueButton';
import useAlter from '../../../hooks/useAlter';
import { addSupplier } from './supplierAPI';
import { toast } from 'react-toastify';

export default function AddSupplierForm({ closeForm }) {
    const [userForm, setUserForm] = React.useState({
        name: "",
        email: "",
        phone_num: "",
        contact_person: "",
        address: "",
    });
  
  const createSupplier = useAlter({
    mutationFn: addSupplier,
    key: "suppliers",
    onSuccessCallback: () => {
      closeForm();
      toast.success(`${userForm.name} added successfully!`);
    }
  });

    const handleSubmit = (e) => {
      e.preventDefault();
      createSupplier.mutate({...userForm});
    }


  return (
    <div className="w-[450px] bg-white rounded-[10px] ">
      <header className="flex items-center justify-between py-3 px-5 bg-blue-500 rounded-t-[10px] text-white">
        <div className="flex items-center gap-5">
          <FilePlusIcon weight="fill" size={24} />
          <h3 className="text-[20px] font-bold text-white">Add Supplier</h3>
              </div>
              <XIcon weight="bold" className="cursor-pointer text-[18px] hover:text-[20px] transition ease-in-out" onClick={closeForm} />
          </header>
          
          <Form userForm={userForm} setUserForm={setUserForm} handleSubmit={handleSubmit}/>
    </div>
  );
}


const Form = function ({ userForm, setUserForm, handleSubmit }) {
 return (
   <form onSubmit={(e) => handleSubmit(e)} className="p-5 text-[18px] flex flex-col gap-6">
     <div className="">
       <label className="block font-medium mb-1 text-[15px]" htmlFor="name">
         Name <span className="ml-1  text-red-500">*</span>
       </label>
       <input
         type="text"
         required
         id="name"
         value={userForm.name}
         onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
         className="border rounded-[8px] w-full p-3 focus:outline-none"
       />
     </div>
     <div className="">
       <label className="block font-medium mb-1 text-[15px]" htmlFor="email">
         Email
       </label>
       <input
         type="email"
         id="email"
         value={userForm.email}
         onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
         className="border rounded-[8px] w-full p-3 focus:outline-none"
       />
     </div>
     <div className="">
       <label className="block font-medium mb-1 text-[15px]" htmlFor="phone_num">
         Phone Number <span className="ml-1  text-red-500">*</span>
       </label>
       <input
         type="text"
         id="phone_num"
         required
         value={userForm.phone_num}
         onChange={(e) =>
           setUserForm({ ...userForm, phone_num: e.target.value })
         }
         className="border rounded-[8px] w-full p-3 focus:outline-none"
       />
     </div>
     <div className="">
       <label className="block font-medium mb-1 text-[15px]" htmlFor="contact_person">
         Contact Person
       </label>
       <input
         type="text"
         id="contact_person"
         value={userForm.contact_person}
         onChange={(e) =>
           setUserForm({ ...userForm, contact_person: e.target.value })
         }
         className="border rounded-[8px] w-full p-3 focus:outline-none"
       />
     </div>
     <div className="">
       <label className="block font-medium mb-1 text-[15px]" htmlFor="address">
         Address
       </label>
       <input
         type="text"
         id="address"
         value={userForm.address}
         onChange={(e) => setUserForm({ ...userForm, address: e.target.value })}
         className="border rounded-[8px] w-full p-3 focus:outline-none"
       />
     </div>

     <div className="flex items-center justify-end gap-3">
       <BlueButton type='submit' text={"Add Supplier"} />
     </div>
   </form>
 );
};