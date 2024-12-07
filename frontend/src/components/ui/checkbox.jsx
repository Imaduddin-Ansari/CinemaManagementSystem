import React from 'react'

export function Checkbox({ id, className, ...props }) {
  return (
    <input
      type="checkbox"
      id={id}
      className={`h-4 w-4 rounded border-gray-400 text-[#E50914] focus:ring-[#E50914] ${className}`}
      {...props}
    />
  )
}

