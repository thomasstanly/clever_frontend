import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import axios from '../../Axios'

const InputArea = () => {

   const [formData, setFormDate] = useState({
      task_name: '',
      start_date: '',
      start_time: '',
      end_date: '',
      end_time: '',
   })

   const handleOnChange = (e) => {
      setFormDate({ ...formData, [e.target.name]: e.target.value })
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      if (!formData.task_name.trim()) {
         return toast.error('Empty tite')
      }
      if (!formData.start_date || !formData.end_date || !formData.start_time || !formData.end_time) {
         return toast.error('date time are required for scheduling')
      }
      const token = JSON.parse(localStorage.getItem('access'));
      try {
         const response = await axios.post('api/task/', formData, {
            headers: {
               'Authorization': `Bearer ${token}`,
               'Content-Type': 'application/json'
            }
         });
         console.log('Schedule created successfully', response.data);
         toast.success('Schedule created successfully')
         
      } catch (error) {
         toast.error(error.response.data)
         console.error('Error creating note:', error.response ? error.response.data : error.message);
      }

   }

   return (
      <>
         <form onSubmit={handleSubmit}>
            <div className="bg-indigo-50 h-screen md:px-20 pt-6">
               <div className=" bg-white rounded-md px-6 py-10 max-w-2xl mx-auto">
                  <h1 className="text-center text-2xl font-bold text-gray-500 mb-10">Create Task</h1>
                  <div className="space-y-4">
                     <div>
                        <label htmlFor="task_name" className="text-lx font-serif">Title :</label>
                        <input value={formData.task_name} name='task_name' type="text" placeholder="title" id="title" className="ml-2 outline-none py-1 px-2 text-md border-2 rounded-md"
                           onChange={handleOnChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="start" className='text-lx font-serif'>Start :</label>
                        <input className="ml-2 outline-none py-1 px-2 text-md border-2 rounded-md" type="date" name='start_date' value={formData.start_date}
                           onChange={handleOnChange} />
                        <input className="ml-2 outline-none py-1 px-2 text-md border-2 rounded-md" type="time" name='start_time' value={formData.start_time}
                           onChange={handleOnChange} />
                     </div>
                     <div>
                        <label htmlFor="start" className='text-lx font-serif'>End &nbsp;:</label>
                        <input className="ml-2 outline-none py-1 px-2 text-md border-2 rounded-md" type="date" name='end_date' value={formData.end_date}
                           onChange={handleOnChange} />
                        <input className="ml-2 outline-none py-1 px-2 text-md border-2 rounded-md" type="time" name='end_time' value={formData.end_time}
                           onChange={handleOnChange} />
                     </div>

                     <div className='flex justify-center gap-10'>
                        <button
                           type="submit"
                           className="px-6 py-2 rounded-md text-lg font-semibold text-indigo-100 bg-indigo-600"
                        >
                           Save
                        </button>

                     </div>
                  </div>
               </div>
            </div>
         </form>
      </>
   )
}

export default InputArea