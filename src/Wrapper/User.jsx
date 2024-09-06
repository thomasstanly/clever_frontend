import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { set_Authenticate } from '../Redux/Auth/Auth'
import UserAuth from '../Utils/Auth'
import HomePage from '../Pages/HomePage'
import LoginPage from '../Pages/LoginPage'
import SignupPage from '../Pages/SignupPage'
import CreatePage from '../Pages/CreatePage'
import ListPage from '../Pages/ListPage'
import UserRouter from '../Router/User/UserRouter'
import UserRouterNotLogin from '../Router/User/UserRouterNotLogin'



function User() {
  const { name } = useSelector((state) => state.auth_user)
  const dispatch = useDispatch()


  useEffect(() => {

    const checkAuth = async () => {
      const user = await UserAuth();
      dispatch(
        set_Authenticate({
          first_name: user.name,
          isAuth: user.isAuthenticated
        })
      )
    }
    if (!name) {
      checkAuth()
    }
  }, [])
  return (
    <div>
      <Routes>
        <Route path='login' element={<UserRouterNotLogin> <LoginPage /> </UserRouterNotLogin>} />
        <Route path='signup' element={<UserRouterNotLogin> <SignupPage /> </UserRouterNotLogin>} />
        <Route path='' element={<UserRouter> <HomePage /> </ UserRouter>} />
        <Route path='create' element={<UserRouter> <CreatePage /> </ UserRouter>} />
        <Route path='list' element={<UserRouter> <ListPage /> </ UserRouter>} />
      </Routes>
    </div>
  )
}

export default User