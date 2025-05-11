import React,{useState} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import {Button} from '../components/button'
import { Input } from '../components/Input';
import { User,Mail,Lock,Loader } from "lucide-react"
import { useAuthStore } from '../store/authStore';

export const SignUpPage = () => {

  const [name, setName]=useState('');
  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('');
  const navigate=useNavigate();
  const { signup,error,isLoading }= useAuthStore();

const handleSignUp=async (e)=>{
    e.preventDefault();
    try{
      await signup(email,password,name);
      navigate("/");
    } catch(error)
    {
      console.log(error);           
    }
}
return ( 
  <div className='min-h-screen bg-gradient-to-br from-black to-red-950 flex items-center justify-center relative overflow-hidden '>
  <div class='h-auto w-2/5 bg-black overflow-hidden rounded-2xl p-9'> 
    <h2 class='text-5xl font-bold mb-6 text-center text-red-800 mt-3'> 
    CINEMOVIE
    </h2> 
    <h2 class='text-2xl font-bold mb-10 text-center text-transparent bg-clip-text text-white'>
    Start Your Free Experience Today
    </h2> 
     <form onSubmit={handleSignUp}>
      <Input 
        icon={User}
        type='text'
        placeholder='Full Name'
        value={name}
        onChange={(e)=> setName(e.target.value)}
      />
      <Input 
        icon={Mail}
        type='email'
        placeholder='Email Address'
        value={email}
        onChange={(e)=> setEmail(e.target.value)}
      />
      <Input 
        icon={Lock}
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e)=> setPassword(e.target.value)}
      />

      {error && <p class='ml-16 text-red-600 font-semibold mt-2'>{error}</p>}

       <div className="space-y-4 flex flex-col justify-center items-center py-3">
       <Button type="submit">
            {isLoading ? <Loader className="animate-spin mx-auto" size={24} /> : "Register"}
            </Button>
            <Button type="button" variant="outline">
              <Link to={"/"}>
              Sign In
              </Link>
            </Button>
      </div>
    </form> 
  </div> 
  </div>
  ) 
}