import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import AddRooms from "./pages/AddRooms";
import RoomsList from './pages/RoomsList';
import EditRoom from './pages/EditRoom';
import BookingLists from './pages/BookingLists';
import Home from "./components/Home"
import Navbar from './components/Navbar';
function App() {

  return (

    <Router>
      <Navbar/>
    <Routes>
      <Route path="/addRoom" element={<AddRooms/>}/>
      <Route path="/" element={<Home/>}/>
      <Route path="/roomLists" element={<RoomsList/>}/>
      <Route path="/editRoom" element={<EditRoom/>}/>
      <Route path="/bookLists" element={<BookingLists/>}/>
       <Route path='/Home' element={<Home/>} />
    </Routes>
       </Router>

  )
}
export default App


