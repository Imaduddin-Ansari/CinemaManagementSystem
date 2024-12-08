import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard/DashboardPage';
import MoviesManagementPage from './pages/MovieManagementPage';
import AddNewMoviePage from "./pages/AddNewMoviePage";
import DeleteMoviePage from "./pages/DeleteMoviePage";
import EditMoviePage from './pages/EditMoviePage';
import FilterMoviesPage from './pages/FilterMoviesPage';
import ShowManagementPage from "./pages/ShowManagementPage"; // New page for show management
import EmployeeManagementPage from './pages/EmployeeManagementPage';
import AddEmployeePage from './pages/AddEmployeePage';  // Add this import
import EditEmployeePage from './pages/EditEmployeePage'; // Add this import
import NotificationManagementPage from './pages/NotificationManagementPage';  // Add this import
import SendToSpecificEmployeesPage from './pages/SendToSpecificEmployeesPage';
import ReportsPage from './pages/ReportsPage'; // Import ReportsPage

const App = () => {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/movies" element={<MoviesManagementPage />} />
          <Route path="/movies/add" element={<AddNewMoviePage />} />
          <Route path="/movies/delete" element={<DeleteMoviePage />} />
          <Route path="/movies/edit" element={<EditMoviePage />} />
          <Route path="/movies/filter" element={<FilterMoviesPage />} />
          <Route path="/movies/show-management" element={<ShowManagementPage />} /> {/* New route for Show Management */}
          <Route path="/employees" element={<EmployeeManagementPage />} />
          <Route path="/employees/add" element={<AddEmployeePage />} />
          <Route path="/employees/edit/:id" element={<EditEmployeePage />} />
          <Route path="/notifications" element={<NotificationManagementPage />} />
          <Route path="/SendToSpecificEmployeesPage" element={<SendToSpecificEmployeesPage />} />
          <Route path="/reports" element={<ReportsPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

