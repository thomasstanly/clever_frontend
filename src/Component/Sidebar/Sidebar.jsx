import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../Axios'

const Sidebar = ({ isSidebarOpen}) => {

  const navigate = useNavigate()

  const handleLogout = async () => {

    const refresh_token = JSON.parse(localStorage.getItem('refresh'))
    const access = JSON.parse(localStorage.getItem('access'))

    try {
      await axios.post('api/logout/', { refresh_token: refresh_token }, {
        headers: {
          'Authorization': `Bearer ${access}`
        }
      })
      localStorage.clear()
      window.location.href = '/login'
    } catch (error) {
      console.log(error)
    }

  }

  const handleDelete = async (id) => {
    const userConfirmed = window.confirm('Are you sure you want to delete this note?');

    if (!userConfirmed) {
      return;
    }

    const access = JSON.parse(localStorage.getItem('access'))
    try {
      const res = await axios.delete(`notes/${id}/`, {
        headers: {
          Authorization: `Bearer ${access}`
        }
      })
      console.log(res.data)
    } catch (error) {
      console.log(error.response.data)
    }
  }

  return (
    <div
      id="sidebar"
      className={`bg-white h-screen shadow-xl px-3 w-44 md:w-60 overflow-x-hidden transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
    >

      <div className="space-y-6 md:space-y-10 mt-24">
        <button
          onClick={handleLogout}
          className="justify-end p-2 border-2 hover:bg-gray-700 text-gray-500 hover:text-white rounded-md border-gray-200   absolute top-10 right-8 "
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16 17V15H7V9H16V7L21 12L16 17ZM14 2H4C2.9 2 2 2.9 2 4V20C2 21.1 2.9 22 4 22H14C15.1 22 16 21.1 16 20V17H14V20H4V4H14V7H16V4C16 2.9 15.1 2 14 2Z"
              fill="currentColor"
            />
          </svg>
        </button>
        <div id="menu" className="flex flex-col space-y-2">
          <div className="flex justify-between text-sm font-medium cursor-pointer text-green-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out"
          onClick={()=>navigate('/')}>
            <p className="max-w-xs truncate overflow-hidden whitespace-nowrap">
              <span>
                Home
              </span>
            </p>
          </div>
          <div className="flex justify-between text-sm font-medium cursor-pointer text-green-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out"
          onClick={()=>navigate('/create')}>
            <p className="max-w-xs truncate overflow-hidden whitespace-nowrap">
              <span>
                Create Task
              </span>
            </p>
          </div>
          <div className="flex justify-between text-sm font-medium cursor-pointer text-green-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out"
          onClick={()=>navigate('/list')}>
            <p className="max-w-xs truncate overflow-hidden whitespace-nowrap">
              <span>
                List Task
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
