import React from 'react'
import { Navbar } from "../../components/Navbar";

export const ReviewPage = () => {
  return (
    <>
      <Navbar userName="John Doe" />
      <div>
        <h1>My Reviews</h1>
        {/* Add logic to fetch and display reviews */}
      </div>
    </>
  )
}
