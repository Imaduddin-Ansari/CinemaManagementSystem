import React from 'react'

export const Button = ({ children, className, variant = 'default', ...props }) => {
    const baseStyles = "w-4/5 py-3 rounded font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
    const variantStyles = {
      default: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
      outline: "border border-red-600 text-red-600 hover:bg-red-600 hover:text-white focus:ring-red-500",
    }
  
    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className || ''}`
  
    return (
      <button className={combinedClassName} {...props}>
        {children}
      </button>
    )
}
