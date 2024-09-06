import React, { useState, useEffect } from 'react'
import axios from '../Axios'
import Sidebar from '../Component/Sidebar/Sidebar'
import MyCalendar from '../Component/Calender/MyCalendar'
import moment from 'moment'

const HomePage = () => {

   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
   const [events, setEvents] = useState([])

   useEffect(() => {
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
            const datas = res.data
            const result = datas.map((data) => (
               {
                  start: moment(`${data.start_date}T${data.start_time}`).toDate(),
                  end: moment(`${data.end_date}T${data.end_time}`).toDate(),
                  title: data.task_name,
               }))
               setEvents(result)
         } catch (error) {
            console.error(error)
         }
      }

      fetch()

   }, [])


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
            {isSidebarOpen && (
               <div className=''>
                  <Sidebar isSidebarOpen={isSidebarOpen} />
               </div>
            )}
            <div className='w-screen'>
               <MyCalendar events={events} />
            </div>
         </div>
      </>
   )
}

export default HomePage