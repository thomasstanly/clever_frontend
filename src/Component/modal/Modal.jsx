import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../Axios';
import { toast } from 'react-toastify';

function Modal({ task }) {

   const navigate = useNavigate()
   const [formData, setFormData] = useState({
      task_name: '',
      start_date: '',
      start_time: '',
      end_date: '',
      end_time: '',
   })

   const handleOnChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value, });
   };

   const handleSubmit = async (e) => {
      e.preventDefault()
      const token = JSON.parse(localStorage.getItem('access'));
      try {
         const res = await axios.patch(`api/task/${task.id}/`, formData,
            {
               headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
               }
            }
         )
         navigate('/')
      }
      catch (error) {
         toast.error(error.response.data)
      }
   }

   useEffect(() => {
      setFormData({
         task_name: task.task_name,
         start_date: task.start_date,
         start_time: task.start_time,
         end_date: task.end_date,
         end_time: task.end_time,
      })
   }, [task])

   return (
      <>
         <div className="modal fade " id="staticBackdrop" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
               <div className="modal-content">
                  <div className="modal-header">
                     <h1 className="modal-title fs-5" id="staticBackdropLabel">Update Task</h1>
                     <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <form onSubmit={handleSubmit}>
                     <div className="modal-body space-y-4">
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
                     </div>
                     <div className="modal-footer">
                        <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Update</button>
                     </div>
                  </form>
               </div>
            </div>
         </div>

      </>
   )
}

export default Modal