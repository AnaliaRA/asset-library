"use client";

import React, { useState } from 'react';

const RequestButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="relative top-0 right-0">
      <button
        onClick={openModal}
        className="flex items-center gap-2 rounded-lg bg-gray-600 px-4 py-2 text-white shadow-md hover:bg-gray-700"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 12h18m-9-9v18" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
        Request
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-400 bg-opacity-40 flex justify-center items-center">
          <div className="bg-white rounded-xl shadow-2xl w-11/12 md:w-1/2 lg:w-1/3">
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="text-xl font-bold text-gray-800">Generate Request</h3>
              <button onClick={closeModal} className="text-gray-600 hover:text-gray-800 text-2xl">&times;</button>
            </div>
            <div className="p-4">
              <textarea
                className="w-full h-40 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Type your request here..."
              />
            </div>
            <div className="flex justify-end p-4 border-t">
              <button
                onClick={closeModal}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 mr-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Close
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestButton;
