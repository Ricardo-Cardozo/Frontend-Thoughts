import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Update from './pages/Update';
import Footer from './components/Footer';
import './App.css'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <div className='container'>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/edit/:id' element={<Update/>}/>
          </Routes>
        </div>
        <Footer/>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
