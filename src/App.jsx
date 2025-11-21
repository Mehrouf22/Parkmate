import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserLand from './Pages/Users/Userland'
import Lots from './Pages/Users/Lots'
import Lot1 from './Pages/Users/Lot1'
import Lot2 from './Pages/Users/Lot2'
import Lot3 from './Pages/Users/Lot3'
import Userprof from './Pages/Users/Userprof'
import Service from './Pages/Users/Service'
import Navbar from './Components/Nav/Navbar'

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="app-content">
        <div className="container">
          <Routes>
            <Route path="/" element={<UserLand />} />
            <Route path="/lots" element={<Lots />} />
            <Route path="/lots/1" element={<Lot1 />} />
            <Route path="/lots/2" element={<Lot2 />} />
            <Route path="/lots/3" element={<Lot3 />} />
            <Route path="/service" element={<Service />} />
            <Route path="/profile" element={<Userprof />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App