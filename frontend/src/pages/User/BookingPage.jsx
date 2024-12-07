import React from 'react'
import { Navbar } from "../../components/Navbar";

export const BookingPage = () => {
  return (
    <>
      <Navbar userName="John Doe" />
      <div>
        <h1>My Bookings</h1>
        {/* Add logic to fetch and display bookings */}
      </div>
    </>
  )
}
