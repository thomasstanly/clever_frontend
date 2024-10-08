import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import axios from '../../Axios'
import './Style.css'



const Signup = () => {

   const [Show1, setShow1] = useState(false)
   const [Show2, setShow2] = useState(false)
   const [timer, setTimer] = useState(20);
   const [isResendDisabled, setIsResendDisabled] = useState(true);

   const toggle = (value) => {
      if (value === 1) {
         setShow1(prevState => !prevState);
      }
      else {
         setShow2(prevState => !prevState);
      }

   }
   const [formdata, setFormdata] = useState({
      username: "",
      email: "",
      password: "",
      password2: "",
   })

   const [otp, setOtp] = useState({
      otpvalue: '',
      email: '',
      status: false,
      expiryTime: null
   })

   const navigate = useNavigate()


   const handleOnchange = (e) => {
      setFormdata({ ...formdata, [e.target.name]: e.target.value })
   }

   const handleResend = async () => {
      try {
         const res = await axios.put("api/otp/", { email: otp.email }, { withCredentials: true })
         if (res.status === 200) {
            setOtp({ ...otp, expiryTime: res.data.expiry })
            toast.success(res.data.message)
         }
         setIsResendDisabled(true);
         setTimer(20);
      } catch (error) {
         toast.error(error.response.data.message)
      }
   }

   const otpVerfication = async (e) => {

      e.preventDefault()
      console.log(otp)
      try {
         const res = await axios.post("api/otp/", otp, { withCredentials: true })

         if (res.status === 201) {
            setOtp({ ...otp, status: false })
            console.log(res.data.message)
            toast.success(res.data.message)
            navigate('/login')

         }
      } catch (error) {
         console.log(error.response.data.message)
         toast.error(error.response.data.message)
      }
   }


   const handleSubmit = async (e) => {
      e.preventDefault()

      if (!formdata.username.trim() || !formdata.email.trim()) {
         return toast.success('all fields are required')

      }
      else if (!/^[a-zA-Z0-9]+$/.test(formdata.username.trim())) {
         return toast.warning("Username can only contain letters and numbers.");
      }
      else if (!/^\S+@\S+\.\S+$/.test(formdata.email.trim())) {
         return toast.warning('Enter a valid email')
      }
      else if (!formdata.password.trim() || !formdata.password2.trim()) {
         return toast.warning('password required')
      }
      else if (formdata.password !== formdata.password2) {
         return toast.warning('password not matching')
      }
      else if (formdata.password.length < 6) {
         console.log(formdata.password.length)
         return toast.warning('password min length 6')
      }
      else {
         console.log(formdata)
         try {
            const res = await axios.post("api/signup/", formdata,
               { withCredentials: true }
            )

            if (res.status === 200) {
               setOtp({ ...otp, status: true, email: res.data.email, expiryTime: res.data.expiry })
               console.log(otp)
               console.log(res.data)
               toast.warning(res.data.message)
               setIsResendDisabled(true);
               setTimer(20);
            }

         } catch (error) {
            if (error.response.status === 400) {
               console.log(error.response.data)
               if (error.response.data.username?.[0] && error.response.data.email?.[0]) {
                  toast.warning(error.response.data.username[0])
                  toast.warning(error.response.data.email[0])
               } else if (error.response.data.username?.[0] && error.response.data.non_field_errors?.[0]) {
                  toast.warning(error.response.data.username[0])
                  toast.warning(error.response.data.non_field_error[0])
               } else if (error.response.data.username?.[0]) {
                  toast.warning(error.response.data.username[0])
               } else if (error.response.data.email?.[0]) {
                  toast.warning(error.response.data.email[0])
               } else {
                  toast.warning(error.response.data.non_field_errors[0])
               }

            }
            else {
               console.log(error);

            }
         }
      }

   }

   useEffect(() => {
      let countdown;
      if (timer > 0) {
         countdown = setInterval(() => {
            setTimer(timer - 1);
         }, 1000);
      } else {
         setIsResendDisabled(false);
      }
      return () => clearInterval(countdown);
   }, [timer]);

   return (
      <div>
         <div className='Container'>
            <div className='row'>
               <span className='heading'>Register</span>
               <form action="" onSubmit={handleSubmit}>
                  <div className='username'>
                     <label className='label' htmlFor="">Username</label>
                     <input className='form-control' type="text" value={formdata.username} name='username' onChange={handleOnchange} />
                  </div>
                  <div>
                     <label className='label' htmlFor="">Email</label>
                     <input className='form-control' type="email" value={formdata.email} name='email' onChange={handleOnchange} />
                  </div>
                  <div>
                     <label className='label' htmlFor="">Password</label>
                     <input className='form-control' type={Show1 ? "text" : "password"} value={formdata.password} name='password' onChange={handleOnchange} />
                     {Show1 ? <FaEye className='eye' onClick={() => toggle(1)} /> : <FaEyeSlash className='eye' onClick={() => toggle(1)} />}
                  </div>
                  <div>
                     <label className='label' htmlFor="">Confirm Password</label>
                     <input className='form-control' type={Show2 ? "text" : "password"} value={formdata.password2} name='password2' onChange={handleOnchange} />
                     {Show2 ? <FaEye className='eye' onClick={() => toggle(2)} /> : <FaEyeSlash className='eye' onClick={() => toggle(2)} />}
                  </div>
                  <div>
                     <button className='form-control' type='submit'>SignUp</button>
                  </div>

               </form>
               {
                  otp.status && <form action="" onSubmit={otpVerfication}>
                     <div className='d-flex justify-content-between'>
                        <input className='form-control w-50' type="number" name='phone_number' onChange={(e) => setOtp({ ...otp, otpvalue: e.target.value })} />
                        <button className='btn' type='submit' >verify</button>
                     </div>
                     <div>
                        <p
                           style={{
                              cursor: isResendDisabled ? 'not-allowed' : 'pointer',
                              color: isResendDisabled ? 'gray' : 'blue'
                           }}
                           onClick={!isResendDisabled ? handleResend : null}
                        >
                           Resend {isResendDisabled ? `(${timer})` : ''}
                        </p>
                     </div>
                  </form>
               }
               <div>
                  <p onClick={() => navigate('/login')} style={{ cursor: 'pointer' }}>Already have an account? login</p>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Signup
