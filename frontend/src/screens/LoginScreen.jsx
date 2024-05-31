import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../state/Actions/AuthActions';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const userData = useSelector((state) => state.user);
    const {isSuccess,isRequest, userInfo,data,errorMessage} = userData
    const history = useNavigate()

    const dispatch = useDispatch()



    const onSubmitHandler = (e)=>{
        e.preventDefault()
      
        dispatch(login({email,password}))
  
        
    
      } 
    

    useEffect(()=>{
        if(isSuccess){
            history('/profile')
        }

    },[isSuccess])




  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 dark:bg-gray-950">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Or{' '}
            <a
              className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
              href="#"
            >
              create a new account
            </a>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={onSubmitHandler}>
          <input type="hidden" value="true" name="remember" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="email"
              >
                Email address
              </label>
              <input
                className="h-10 bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-50 dark:placeholder-gray-400"
                id="email"
                autoComplete="email"
                required
                placeholder="Enter your email address"
                type="email"
                name="email"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="h-10 bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-50 dark:placeholder-gray-400"
                id="password"
                autoComplete="current-password"
                required
                placeholder="Enter your password"
                type="password"
                name="password"

                value={password}
                onChange={(e)=> setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                type="button"
                role="checkbox"
                aria-checked="true"
                data-state="checked"
                value="on"
                className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                id="remember-me"
              >
                <span
                  data-state="checked"
                  className="flex items-center justify-center text-current"
                  style={{ pointerEvents: 'none' }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-check h-4 w-4"
                  >
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                </span>
              </button>
              <input
                aria-hidden="true"
                tabIndex="-1"
                type="checkbox"
                value="on"
                defaultChecked
                name="remember-me"
                style={{
                  transform: 'translateX(-100%)',
                  position: 'absolute',
                  pointerEvents: 'none',
                  opacity: 0,
                  margin: 0,
                  width: '16px',
                  height: '16px',
                }}
              />
              <label
                className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-2 block text-sm text-gray-900 dark:text-gray-50"
                htmlFor="remember-me"
              >
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a
                className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                href="#"
              >
                Forgot your password?
              </a>
            </div>
          </div>
          <div>
            <button
              className="items-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-400 dark:text-gray-950 dark:hover:bg-indigo-500"
              type="submit"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
