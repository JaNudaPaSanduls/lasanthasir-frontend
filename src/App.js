import './App.css';
import Home from './components/home/Home';
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/user/login/Login';
import Register from './components/user/register/Register';
import Update from './components/user/update/Update';
import ViewUsers from './components/user/view/View';
import StudentRegister from './components/student/register/Register';
import StudentUpdate from './components/student/update/Update';
import StudentView from './components/student/view/View';
import StudentMark from './components/student/mark/Mark';
import GetPayment from './components/student/getpayment/getPayment';
import GetMark from './components/student/getmark/getMark';
import SendAbsent from './components/student/absent/sendAbsent';
import SendSMS from './components/student/sendsms/sendSMS';
import Settings from './components/settings/Settings';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={ localStorage.getItem('User')=="log" ? <Dashboard /> : <Home /> } />
          <Route path="/login" element={ localStorage.getItem('User')=="log" ? <Dashboard /> : <Login /> } />
          <Route path="/register" element={ localStorage.getItem('Admin') ? <Register /> : <Dashboard /> } />
          <Route path="/update" element={ localStorage.getItem('User')=="log" ? <Update /> : <Home /> } />
          <Route path="/users" element={ localStorage.getItem('Admin') ? <ViewUsers /> : <Dashboard /> } />
          <Route path="/student/register" element={ localStorage.getItem('User')=="log" ? <StudentRegister /> : <Home />} />
          <Route path="/student/update" element= { localStorage.getItem('Admin') ? <StudentUpdate /> : <Dashboard /> } />
          <Route path="/student/view" element= { localStorage.getItem('Admin') ? <StudentView /> : <Dashboard />  } />
          <Route path="/student/mark" element= { localStorage.getItem('User')=="log" ? <StudentMark /> : <Home />  } />
          <Route path="/student/payment" element= { localStorage.getItem('Admin') ? <GetPayment /> : <Dashboard /> } />
          <Route path="/student/getmark" element= { localStorage.getItem('Admin') ? <GetMark /> : <Dashboard />  } />
          <Route path="/student/absent" element= { localStorage.getItem('Admin') ? <SendAbsent /> : <Dashboard />  } />
          <Route path="/student/sendsms" element = { localStorage.getItem('Admin') ? <SendSMS /> : <Dashboard /> } />
          <Route path="/settings" element = { localStorage.getItem('User')=="log" ? <Settings /> : <Home /> } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
