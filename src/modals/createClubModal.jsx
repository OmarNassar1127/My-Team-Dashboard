import React, { useState } from "react";
import {
  PlusIcon
} from "@heroicons/react/24/solid";
import { useStoreClub } from "@/api/useStoreClub";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreateClubModal() {
  const [showModal, setShowModal] = useState(false);
  const [clubData, setClubData] = useState({
    name: '',
    address: '',
    contact_info: '',
    email: '',
    president_user_id: null,
  });
  const [logo, setLogo] = useState(null);
  const { storeClub, isLoading, error } = useStoreClub();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClubData({ ...clubData, [name]: value });
  };

  const handleLogoChange = (e) => {
    setLogo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(clubData);
    try {
      const response = await storeClub(clubData, logo);
      toast.success("Club created successfully");
      setShowModal(false);
    } catch (error) {
      toast.error('Failed to create the club', error);
      // console.error('Failed to create the club:', error);
    }
  };

  return (
    <>
      <button
        className="bg-white text-black font-bold uppercase text-sm px-6 py-3 rounded shadow hover:bg-blue-500 hover:text-white outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 border border-blue-gray-100"
        type="button"
        onClick={() => setShowModal(true)}
        style={{
          transition: 'background-color 0.3s, color 0.3s',
          backgroundColor: '#fff',
          color: '#000',
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#000';
          e.target.style.color = '#fff';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '#fff';
          e.target.style.color = '#000';
        }}
      >
        <PlusIcon className="w-6 h-6 inline-block mr-2" />
        Create Club
      </button>
      <ToastContainer position="top-right"
        autoClose={1750}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" />
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-md" style={{ width: '600px' }}>
              {/* content */}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/* header */}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Create Club
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/* body */}
                <form onSubmit={handleSubmit} className="relative p-6 flex-auto">
                  {/* ... other inputs ... */}
                  <div className="mb-4">
                    <label htmlFor="name" className="mr-2 inline-block w-32 text-right">
                      Name:
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="address" className="mr-2 inline-block w-32 text-right">
                      Address:
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="contact_info" className="mr-2 inline-block w-32 text-right">
                      Contact Info:
                    </label>
                    <input
                      type="text"
                      id="contact_info"
                      name="contact_info"
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="mr-2 inline-block w-32 text-right">
                      Email:
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="president_user_id" className="mr-2 inline-block w-32 text-right">
                      President User ID:
                    </label>
                    <input
                      type="text"
                      id="president_user_id"
                      name="president_user_id"
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="logo" className="mr-2 inline-block w-32 text-right">
                      Logo:
                    </label>
                    <input
                      type="file"
                      id="logo"
                      name="logo"
                      onChange={handleLogoChange}
                      className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  {error && <p className="text-red-500">{error}</p>}
                </form>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="bg-black text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-green-800 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
