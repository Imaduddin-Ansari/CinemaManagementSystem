import React from 'react'

export function Input({ className, ...props }) {
  return (
    <input
      className={`w-full px-3 py-2 bg-[#333333] text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E50914] ${className}`}
      {...props}
    />
  )
}

