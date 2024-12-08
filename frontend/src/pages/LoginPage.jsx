import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {Button} from '../components/button'
import { Input } from '../components/Input';
import { Mail,Lock,Loader } from "lucide-react"
import { useAuthStore } from '../store/authStore';

export const LoginPage = () => {

  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('');
  const {login,isLoading,error,role}=useAuthStore();
  const navigate=useNavigate();

const handleLogin=async (e)=>{
    e.preventDefault();
    try{
      await login(email,password);
      if (role === "employee") {
        navigate("/employee-dashboard");
      } else if (role === "user") {
        navigate("/user-dashboard");
      } else if (role === "admin") {
        navigate("/admin-dashboard");
      }
    } catch(error)
    {
      console.log(error);
    }
}

  return (
    <div class='h-auto w-2/5 bg-black overflow-hidden rounded-2xl p-9'> 
    <h2 class='text-5xl font-bold mb-6 text-center text-red-800 mt-3'> 
    CINEMOVIE
    </h2> 
    <h2 class='text-2xl font-bold mb-10 text-center text-transparent bg-clip-text text-white'>
    Enjoy the world of entertainment. 
    </h2> 
     <form onSubmit={handleLogin}>
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
            {isLoading ? <Loader className="animate-spin mx-auto" size={24} /> : "Sign In"}
            </Button>
            <Button type="button" variant="outline">
              <Link to={"/signup"}>Sign Up</Link>
            </Button>
      </div>
    </form> 
  </div> 
  ) 
}
