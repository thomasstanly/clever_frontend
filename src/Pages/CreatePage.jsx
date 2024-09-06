import React, { useEffect, useState } from 'react'
import axios from '../Axios'
import Sidebar from '../Component/Sidebar/Sidebar'
import InputArea from '../Component/InputArea/InputArea'

const CreatePage = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [update, setUpdate] = useState(null)
    const [load, setLoad] = useState(false)
 
    const handleEdit = async (id) => {
       const access = JSON.parse(localStorage.getItem('access'))
       try {
          const res = await axios.get(`notes/${id}/`, {
             headers: {
                Authorization: `Bearer ${access}`
             }
          })
          console.log(res.data)
          setUpdate(res.data)
       } catch (error) {
          console.log(error.response.data)
       }
    }
 
    useEffect(() => {
       if (load) {
          setLoad(false);
       }
    }, [load])
    return (
       <>
          <button
             onClick={() => setIsSidebarOpen((prev)=>!prev)}
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
                   <Sidebar isSidebarOpen={isSidebarOpen} load={load} handleEdit={handleEdit} />
                </div>
             )}
             <div className='w-screen'>
                <InputArea setLoad={setLoad} update={update} setUpdate={setUpdate} />
             </div>
          </div>
       </>
    )
}

export default CreatePage