import React from 'react'
import { Navbar } from "../../components/Navbar";

export const ProfilePage = () => {
  return (
    <>
      <Navbar userName="John Doe" />
      <div>
        <h1>My Profile</h1>
        {/* Add form for user details (editable) */}
      </div>
    </>
  )
}
