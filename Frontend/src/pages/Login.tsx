//@ts-nocheck
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Login() {
    const navigate = useNavigate()
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    })

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:4000/login', loginForm, {
                // withCredentials: true
            })
            console.log(response.data)
            if (response.data.success) {
                localStorage.setItem('jwtToken', response.data.token)
                navigate('/blogs')
                location.reload()

            } else {
                alert("Invalid Credentials")
            }



            // console.log(response.data)



        } catch (error) {
            alert("invalid username or password")
        }
    }

    return (
        <div className='w-full h-screen flex justify-center items-center bg-white'>
            <div className='h-[30%] w-[20%] bg-gradient-to-r from-cyan-400 to-teal-500 flex justify-center items-center rounded-xl border-3 broder-gray-300 shadow-2xl p-5'>
                <form action="" method='Post' onSubmit={handleLogin} className='flex flex-col gap-5 text-xl '>
                    <div>
                        <label htmlFor="email" className=''>Email:
                            <input type="email" name="email" id="email"
                                placeholder='Enter your email'
                                value={loginForm.email}
                                className='p-2 rounded-xl m-2 w-full'
                                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                                required
                            />

                        </label>
                    </div>
                    <div>
                        <label htmlFor="password">Password:
                            <input type="password" name="password" id="password"
                                placeholder='Enter password'
                                value={loginForm.password}
                                className='p-2 rounded-xl m-2 w-full'
                                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                                required
                            />
                        </label>
                    </div>
                    <div className=' w-full'>
                        <button type="submit"
                            className='px-6 py-2  bg-gradient-to-r from-cyan-200 to-cyan-400 w-full rounded-xl hover:scale-105 duration-300'
                        >Login</button>
                    </div>

                </form>
            </div>

        </div>
    )
}

export default Login