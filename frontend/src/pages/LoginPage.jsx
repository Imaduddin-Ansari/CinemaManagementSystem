import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import {Button} from '../components/button'
import { Input } from '../components/Input';
import { Mail,Lock } from "lucide-react"

export const LoginPage = () => {

  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('');

const handleSignUp=(e)=>{
    e.preventDefault();
}

  return (
    <div class='h-auto w-2/5 bg-black overflow-hidden rounded-2xl p-9'> 
    <h2 class='text-5xl font-bold mb-6 text-center text-transparent bg-clip-text text-red-700 mt-3'> 
    CINEMOVIE
    </h2> 
    <h2 class='text-2xl font-bold mb-10 text-center text-transparent bg-clip-text text-white'>
    Enjoy the world of entertainment. 
    </h2> 
     <form onSubmit={handleSignUp}>
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

       <div className="space-y-4 flex flex-col justify-center items-center py-3">
            <Button type="submit">
            <Link to={"/login"}>Sign In</Link>
            </Button>
            <Button type="button" variant="outline">
              <Link to={"/signup"}>Sign Up</Link>
            </Button>
      </div>
    </form> 
  </div> 
  ) 
}
