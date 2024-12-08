import { Route,Routes } from "react-router-dom"
import { SignUpPage } from "./pages/SignUpPage"
import { LoginPage } from "./pages/LoginPage"
//User Panel
import {HomePageUser} from "./pages/User/HomePageUser"
import {BookingPage } from "./pages/User/BookingPage";
import {ProfilePage } from "./pages/User/ProfilePage";
import {ReviewPage } from "./pages/User/ReviewPage";
import {MyWishlistPage } from "./pages/User/MyWishlistPage";
import { BookTicketPage } from "./pages/User/BookTicketPage";
//Employee Panel
import {HomePageEmployee} from "./pages/Employee/HomePageEmployee"
//Admin Panel
import {HomePageAdmin} from "./pages/Admin/HomePageAdmin"

function App() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-black to-red-950 flex items-center justify-center relative overflow-hidden '>
      <Routes>
        {/* Employee Routes */}
        <Route path='/employee-dashboard' element={<HomePageEmployee/>}/>
        {/* User Routes */}
        <Route path='/user-dashboard' element={<HomePageUser/>}/>
        <Route path="/user-bookings" element={<BookingPage />} />
        <Route path="/user-profile" element={<ProfilePage />} />
        <Route path="/user-reviews" element={<ReviewPage />} />
        <Route path="/user-wishlist" element={<MyWishlistPage />} />
        <Route path="/user-book/:movieId" element={<BookTicketPage />} />
        {/* Admin Routes  */}
        <Route path='/admin-dashboard' element={<HomePageAdmin/>}/>
        <Route path='/signup' element={<SignUpPage/>}/>
        <Route path='/' element={<LoginPage/>}/>
      </Routes>
    </div>
  )
}

export default App
