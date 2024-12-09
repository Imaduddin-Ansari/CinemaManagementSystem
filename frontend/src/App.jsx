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
import { WatchPage } from "./pages/User/WatchPage";
import { SearchPage } from "./pages/User/SearchPage";
//Employee Panel
import {HomePageEmployee} from "./pages/Employee/HomePageEmployee"
import {BookingsPage} from "./pages/Employee/BookingsPage"
import { ReviewsPage } from "./pages/Employee/ReviewsPage";
import { ReportsPage } from "./pages/Employee/ReportsPage";
import { ShiftsPage } from "./pages/Employee/ShiftsPage";
//Admin Panel
import Dashboard from './pages/Admin/Dashboard/DashboardPage';
import MoviesManagementPage from './pages/Admin/MovieManagementPage';
import AddNewMoviePage from "./pages/Admin/AddNewMoviePage";
import DeleteMoviePage from "./pages/Admin/DeleteMoviePage";
import EditMoviePage from './pages/Admin/EditMoviePage';
import FilterMoviesPage from './pages/Admin/FilterMoviesPage';
import ShowManagementPage from "./pages/Admin/ShowManagementPage"; // New page for show management
import EmployeeManagementPage from './pages/Admin/EmployeeManagementPage';
import AddEmployeePage from './pages/Admin/AddEmployeePage';  // Add this import
import EditEmployeePage from './pages/Admin/EditEmployeePage'; // Add this import
import NotificationManagementPage from './pages/Admin/NotificationManagementPage';  // Add this import
import SendToSpecificEmployeesPage from './pages/Admin/SendToSpecificEmployeesPage';
import ReportsPageAdmin from './pages/Admin/ReportsPage'; // Import ReportsPage
import ForgotPasswordPage from './pages/Admin/ForgotPasswordPage';

function App() {
  return (
      <Routes>
        {/* Employee Routes */}
        <Route path='/employee-dashboard' element={<HomePageEmployee/>}/>
        <Route path='/employee-book' element={<BookingsPage/>}/>
        <Route path='/employee-support' element={<ReviewsPage/>}/>
        <Route path='/employee-report' element={<ReportsPage/>}/>
        <Route path='/employee-shift' element={<ShiftsPage/>}/>
        {/* User Routes */}
        <Route path='/user-dashboard' element={<HomePageUser/>}/>
        <Route path="/user-bookings" element={<BookingPage />} />
        <Route path="/user-profile" element={<ProfilePage />} />
        <Route path="/user-reviews" element={<ReviewPage />} />
        <Route path="/user-wishlist" element={<MyWishlistPage />} />
        <Route path="/user-book/:movieId" element={<BookTicketPage />} />
        <Route path="/watch/:id" element={<WatchPage />} />
        <Route path="/search" element={<SearchPage />} />
        {/* Admin Routes  */}
        <Route path="/admin-dashboard" element={<Dashboard />} />
        <Route path="/movies" element={<MoviesManagementPage />} />
        <Route path="/movies/add" element={<AddNewMoviePage />} />
        <Route path="/movies/delete" element={<DeleteMoviePage />} />
        <Route path="/movies/edit/:id" element={<EditMoviePage />} />
        <Route path="/movies/filter" element={<FilterMoviesPage />} />
        <Route path="/movies/show-management" element={<ShowManagementPage />} /> {/* New route for Show Management */}
        <Route path="/employees" element={<EmployeeManagementPage />} />
        <Route path="/employees/add" element={<AddEmployeePage />} />
        <Route path="/employees/edit/:id" element={<EditEmployeePage />} />
        <Route path="/notifications" element={<NotificationManagementPage />} />
        <Route path="/SendToSpecificEmployeesPage" element={<SendToSpecificEmployeesPage />} />
        <Route path="/reports" element={<ReportsPageAdmin />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        {/* Login/Signup */}
        <Route path='/signup' element={<SignUpPage/>}/>
        <Route path='/' element={<LoginPage/>}/>
      </Routes>
  )
}

export default App
