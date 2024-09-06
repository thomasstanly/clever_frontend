import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { jwtDecode } from 'jwt-decode'
import { set_Authenticate } from '../../Redux/Auth/Auth'
import axios from '../../Axios'
import './Style.css'



const Login = () => {

   const [Show1, setShow1] = useState(false)

   const toggle = () => {
      setShow1(prevState => !prevState);

   }
   const [loginData, setLoginData] = useState({
      email: "",
      otp_email:"",
      password: "",
      otp: "",
   })

   const navigate = useNavigate()
   const dispatch = useDispatch()


   const handleOnchange = (e) => {
      setLoginData({ ...loginData, [e.target.name]: e.target.value })
   }

   const handleOtpClick = async (e) => {
      e.preventDefault()
      try {
         const res = await axios.post('api/otp_login/', loginData,
            { withCredentials: true })
         if (res.status === 200) {
            toast.success(res.data.message)
         }
      } catch (error) {
         toast.error(error.response.data.message)
      }
   }


   const handleSubmit = async (e) => {
      e.preventDefault()
      console.log(loginData)
      if (loginData.otp != "") {
         try {
            const res = await axios.post("api/otp_authenticate/", loginData)
            console.log(res)
            if (res.status === 200) {
               localStorage.setItem('user', JSON.stringify(res.data.email))
               localStorage.setItem('access', JSON.stringify(res.data.access_token))
               localStorage.setItem('refresh', JSON.stringify(res.data.refresh_token))
               console.log('acess', res.data.access_token)

               dispatch(
                  set_Authenticate({
                     first_name: jwtDecode(res.data.access_token).first_name,
                     isAuth: true,
                     isAdmin: res.data.isAdmin
                  })
               )
               navigate('/')
            }
         } catch (error) {
            console.log(error.response)
            toast.error(error.response.data.message)
         }

      }
      else if (!loginData.email || !loginData.password) {
         toast.error('All fields required')
      } else {
         try {
            const res = await axios.post("api/login/", loginData)
            console.log(res)
            if (res.status === 200) {
               localStorage.setItem('user', JSON.stringify(res.data.email))
               localStorage.setItem('access', JSON.stringify(res.data.access_token))
               localStorage.setItem('refresh', JSON.stringify(res.data.refresh_token))
               console.log('acess', res.data.access_token)

               dispatch(
                  set_Authenticate({
                     first_name: jwtDecode(res.data.access_token).email,
                     isAuth: true,
                     isAdmin: res.data.isAdmin
                  })
               )
               navigate('/')
            }
         } catch (error) {
            console.log(error.response)
            toast.error(error.response.data.detail)
         }
      }

   }

   return (
      <>
         <div className='Container'>
            <div className='row'>
               <span>Login</span>
               <form action="" onSubmit={handleSubmit}>
                  <div className='email'>
                     <label className='label' htmlFor="">Email</label>
                     <input className='form-control' type="email" name="email" value={loginData.email} onChange={handleOnchange}  />
                  </div>
                  <div>
                     <label className='label' htmlFor="">Password</label>
                     <input id='form3Example4cdg' className='form-control' type={Show1 ? "text" : "password"} name="password" value={loginData.password} onChange={handleOnchange} />
                     {Show1 ? <FaEye className='eye' onClick={() => toggle()} /> : <FaEyeSlash className='eye' onClick={() => toggle()} />}
                  </div>

                  <p>or</p>
                  <div className='flex justify-center items-end'>
                     <div className='email w-3/4'>
                        <label className='label' htmlFor="">Email</label>
                        <input className='form-control' type="email" name="otp_email" value={loginData.otp_email} onChange={handleOnchange} />
                     </div>
                     <button className='form-control ml-2 mb-1 w-1/5' type='submit' onClick={handleOtpClick}>Submit</button>
                  </div>
                  <div>
                     <label className='label' htmlFor="">OTP</label>
                     <input id='form3Example5cdg' className='form-control' type={Show1 ? "text" : "password"} name="otp" value={loginData.otp} onChange={handleOnchange} />
                     {Show1 ? <FaEye className='eye' onClick={() => toggle()} /> : <FaEyeSlash className='eye' onClick={() => toggle()} />}
                  </div>
                  <div>
                     <button className='form-control' type='submit'>Login</button>
                  </div>
               </form>
               <div>
                  <p onClick={() => navigate('/signup')} style={{ cursor: 'pointer' }}>Din't have an account? Sign up now</p>
               </div>
            </div>
         </div>
      </>
   )
}

export default Login