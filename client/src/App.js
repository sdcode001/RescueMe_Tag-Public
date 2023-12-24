import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import SigninSignup from './pages/SignInSignup'
import Profile from './pages/Profile'
import User from './pages/User'
import ProtectiveRoute from './util/ProtectiveRoute';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/profile' element={<ProtectiveRoute><Profile/></ProtectiveRoute>}/>
          <Route path='/signup' element={<SigninSignup/>}/>
          <Route path='/user/:id' element={<User/>}/>
          <Route path='*' element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
