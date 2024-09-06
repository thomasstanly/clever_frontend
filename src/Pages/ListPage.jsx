import React, { useState, useEffect } from 'react'
import axios from '../Axios';
import Sidebar from '../Component/Sidebar/Sidebar';
import Modal from '../Component/modal/Modal';


export const ListPage = () => {

   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
   const [list, setList] = useState([])
   const [modal, setModal] = useState(null)

   const handlEdit = (row) => {
      setModal(row)
   }

   const fetch = async () => {
      const token = JSON.parse(localStorage.getItem('access'));
      try {
         const res = await axios.get('api/task/',
            {
               headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
               }
            }
         )
         setList(res.data)
      } catch (error) {
         console.error(error)
      }
   }

   const handleStatus = async (row) => {
      try {

         const formdata = new FormData()
         if (row.is_complete) {
            formdata.append('is_complete', 'false')
         }
         else {
            formdata.append('is_complete', 'true')
         }

         const token = JSON.parse(localStorage.getItem('access'))
         const res = await axios.patch(`api/task/${row.id}/`, formdata,
            {
               headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
               },
            }
         )
         fetch()
      } catch (error) {
         console.error(error)
      }
   }

   const handleDelete = async(id)=> {
   try {
      const token = JSON.parse(localStorage.getItem('access'))
      const result = confirm('Are you sure')
      if (result) {
         const res = await axios.delete(`api/task/${id}/`,
            {
               headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
               }
            })
            fetch()
      }

   } catch (error) {
      console.log(error)
   }
}

useEffect(() => {

   fetch()

}, [])

const formatTime = (timeStr) => {
   const [hours, minutes] = timeStr.split(':').map(Number);
   const date = new Date();
   date.setHours(hours);
   date.setMinutes(minutes);
   return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
};

return (
   <>
      <button
         onClick={() => setIsSidebarOpen(prev => !prev)}
         className="z-10 p-2 border-2 hover:bg-gray-700 text-gray-500 hover:text-white rounded-md border-gray-200 shadow-lg  absolute top-10 left-4 "
      >
         <svg
            className="w-5 h-5"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
         >
            <path
               fillRule="evenodd"
               d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
               clipRule="evenodd"
               fill="currentColor"
            ></path>
         </svg>
      </button>
      <div className='flex'>
         {isSidebarOpen &&
            (
               <div className=''>
                  <Sidebar isSidebarOpen={isSidebarOpen} />
               </div>
            )}
         <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-16 mt-4 flex-grow">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
               <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                     <th scope="col" className="px-6 py-3">
                        Date
                     </th>
                     <th scope="col" className="px-6 py-3">
                        Time
                     </th>
                     <th scope="col" className="px-6 py-3">
                        Event
                     </th>
                     <th scope="col" className="px-6 py-3">
                        status
                     </th>
                     <th scope="col" className="px-6 py-3">
                        Edit
                     </th>
                     <th scope="col" className="px-6 py-3">
                        Delete
                     </th>
                  </tr>
               </thead>
               <tbody>
                  {
                     list.map((row) => {
                        const startTime = formatTime(row.start_time);
                        const endTime = formatTime(row.end_time);
                        return (

                           <tr key={row.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                 {row.end_date != row.start_date ? `${row.start_date} - ${row.end_date}` : row.start_date}
                              </th>
                              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                 {`${startTime} - ${endTime}`}
                              </td>
                              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                 {row.task_name}
                              </td>
                              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white cursor-pointer"
                                 onClick={() => handleStatus(row)}>
                                 {row.is_complete ? 'complete' : 'not complete'}
                              </td>
                              <td className="px-6 py-4">
                                 <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                    data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => handlEdit(row)}>
                                    Edit</a>
                              </td>
                              <td className="px-6 py-4">
                                 <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                    onClick={() => handleDelete(row.id)}>
                                    Delete</a>
                              </td>
                           </tr>

                        )
                     })
                  }
               </tbody>
            </table>
         </div>
      </div>
      {modal && <Modal task={modal} />}
   </>
)
}

export default ListPage