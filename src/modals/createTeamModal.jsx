import React, { useState } from "react";
import {
  PlusIcon
} from "@heroicons/react/24/solid";
import { useStoreTeam } from '../api/useStoreTeam';
import { toast, ToastContainer } from 'react-toastify';

export default function CreateTeamModal() {
  const [showModal, setShowModal] = useState(false);
  const { storeTeam, isLoading, error } = useStoreTeam();
  const [teamData, setTeamData] = useState({
    club_id: '',
    name: '',
    category: '',
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTeamData({ ...teamData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { club_id, name, category } = teamData;
    try {
      await storeTeam({ club_id, name, category });
      setShowModal(false);
      toast.success("Team created successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Error creating team. Please try again.");
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
        Create Team
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
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Create Team
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
                <form onSubmit={handleSubmit} className="relative p-6 flex-auto">
                  <div className="mb-4">
                    <label htmlFor="name" className="mr-2 inline-block w-32 text-right">
                      Club ID:
                    </label>
                    <input
                      type="number"
                      id="club_id"
                      name="club_id"
                      required
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="address" className="mr-2 inline-block w-32 text-right">
                      Name:
                    </label>
                    <input
                      type="name"
                      id="name"
                      name="name"
                      required
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="address" className="mr-2 inline-block w-32 text-right">
                      Category:
                    </label>
                    <input
                      type="category"
                      id="category"
                      required
                      name="category"
                      onChange={handleInputChange}
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
