import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import CompanyRegistration from './components/auth/CompanyRegistration';
import Login from './components/auth/Login';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<CompanyRegistration/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
