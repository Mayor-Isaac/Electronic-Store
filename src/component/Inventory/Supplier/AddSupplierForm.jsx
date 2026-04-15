import { FilePlusIcon, XIcon } from '@phosphor-icons/react'
import React from 'react'
import BlueButton from '../../../ui/BlueButton';

export default function AddSupplierForm({ closeForm }) {
    const [userForm, setUserForm] = React.useState({
        name: "",
        email: "",
        phone_num: "",
        contact_person: "",
        address: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userForm);
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
   <form onSubmit={(e) => handleSubmit(e)} className="p-5 text-[18px]">
     <div className="mb-4">
       <label className="block font-medium mb-2" htmlFor="name">
         Name <span className="ml-1  text-red-500">*</span>
       </label>
       <input
         type="text"
         required
         id="name"
         value={userForm.name}
         onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
       />
     </div>
     <div className="mb-4">
       <label className="block font-medium mb-2" htmlFor="email">
         Email
       </label>
       <input
         type="email"
         id="email"
         value={userForm.email}
         onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
       />
     </div>
     <div className="mb-4">
       <label className="block font-medium mb-2" htmlFor="phone_num">
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
         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
       />
     </div>
     <div className="mb-4">
       <label className="block font-medium mb-2" htmlFor="contact_person">
         Contact Person
       </label>
       <input
         type="text"
         id="contact_person"
         value={userForm.contact_person}
         onChange={(e) =>
           setUserForm({ ...userForm, contact_person: e.target.value })
         }
         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
       />
     </div>
     <div className="mb-4">
       <label className="block font-medium mb-2" htmlFor="address">
         Address
       </label>
       <input
         type="text"
         id="address"
         value={userForm.address}
         onChange={(e) => setUserForm({ ...userForm, address: e.target.value })}
         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
       />
     </div>

     <div className="flex items-center justify-end gap-3">
       <BlueButton text={"Add Supplier"} onClick={handleSubmit} />
       {/* <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Add Supplier
      </button> */}
     </div>
   </form>
 );
};