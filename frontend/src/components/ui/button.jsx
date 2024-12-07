import React from 'react'

export function Button({ children, className, variant = 'default', ...props }) {
  const baseStyles = "px-4 py-2 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors"
  const variantStyles = {
    default: "bg-[#E50914] hover:bg-[#f6121d] text-white focus:ring-[#E50914]",
    outline: "border border-[#E50914] text-[#E50914] hover:bg-[#E50914] hover:text-white focus:ring-[#E50914]"
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

