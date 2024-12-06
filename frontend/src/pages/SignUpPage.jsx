import React, { useState } from 'react'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Checkbox } from "../components/ui/checkbox"

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Netflix Logo */}
        <div className="text-center">
          <h1 className="text-6xl font-bold text-[#E50914]">N</h1>
          <p className="mt-4 text-lg text-white">
            Enjoy the world of entertainment.
          </p>
        </div>

        {/* Sign Up Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <Input
                type="email"
                placeholder="Email or phone number"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-[#333333] border-none text-white placeholder:text-gray-400 pl-10"
              />
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>

            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="bg-[#333333] border-none text-white placeholder:text-gray-400 pl-10 pr-10"
              />
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Checkbox id="remember" className="border-gray-400 data-[state=checked]:bg-[#E50914] data-[state=checked]:border-[#E50914]" />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-400">
                Remember me
              </label>
            </div>
            <button type="button" className="text-sm text-gray-400 hover:underline">
              Forgot password?
            </button>
          </div>

          <div className="space-y-4">
            <Button 
              type="submit" 
              className="w-full bg-[#E50914] hover:bg-[#f6121d] text-white"
            >
              Sign In
            </Button>
            <Button 
              type="button" 
              variant="outline"
              className="w-full border-[#E50914] text-[#E50914] hover:bg-[#E50914] hover:text-white"
            >
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

