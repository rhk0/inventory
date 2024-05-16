import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import CompanyRegistration from './components/auth/CompanyRegistration';
import Login from './components/auth/Login';
import Registraion from './components/auth/Registraion';
import ForgotPassword from './components/auth/ForgotPassword';
import Otpverification from './components/auth/Otpverification';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<CompanyRegistration/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/registration" element={<Registraion/>}/>
        <Route path="/forgetpassword" element={<ForgotPassword/>}/>
        <Route path="/otpverification" element={<Otpverification/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
