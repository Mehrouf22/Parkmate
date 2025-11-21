import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './Context/AuthContext'
import ProtectedRoute from './Components/ProtectedRoute'
import UserLand from './Pages/Users/Userland'
import Lots from './Pages/Users/Lots'
import DynamicLot from './Pages/Users/DynamicLot'
import Userprof from './Pages/Users/Userprof'
import Service from './Pages/Users/Service'
import Navbar from './Components/Nav/Navbar'
import OwnerLayout from './Pages/Owner/OwnerLayout'
import OwnerDashboard from './Pages/Owner/OwnerDashboard'
import OwnerLots from './Pages/Owner/OwnerLots'
import OwnerServices from './Pages/Owner/OwnerServices'
import OwnerBookings from './Pages/Owner/OwnerBookings'
import OwnerProfile from './Pages/Owner/OwnerProfile'
import UserLogin from './Pages/Auth/UserLogin'
import UserRegister from './Pages/Auth/UserRegister'
import OwnerLogin from './Pages/Auth/OwnerLogin'
import OwnerRegister from './Pages/Auth/OwnerRegister'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />

        <div className="app-content">
          <div className="container">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<UserLand />} />
              <Route path="/login" element={<UserLogin />} />
              <Route path="/register" element={<UserRegister />} />
              <Route path="/owner/login" element={<OwnerLogin />} />
              <Route path="/owner/register" element={<OwnerRegister />} />

              <Route path="/lots" element={<Lots />} />
              <Route path="/lots/:lotId" element={<DynamicLot />} />
              <Route path="/service" element={<Service />} />

              {/* Protected User Routes (Optional, but good for profile) */}
              <Route path="/profile" element={<Userprof />} />

              {/* Protected Owner Routes */}
              <Route element={<ProtectedRoute role="owner" />}>
                <Route path="/owner" element={<OwnerLayout />}>
                  <Route index element={<OwnerDashboard />} />
                  <Route path="lots" element={<OwnerLots />} />
                  <Route path="bookings" element={<OwnerBookings />} />
                  <Route path="services" element={<OwnerServices />} />
                  <Route path="profile" element={<OwnerProfile />} />
                </Route>
              </Route>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App