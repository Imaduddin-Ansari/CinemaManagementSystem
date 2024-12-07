import React from 'react'
import { Navbar } from "../../components/Navbar";

export const MyWishlistPage = () => {
  return (
    <>
      <Navbar userName="John Doe" />
      <div>
        <h1>My Wishlist</h1>
        {/* Add logic to fetch and display wishlist */}
      </div>
    </>
  )
}
