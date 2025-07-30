import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingPage from './components/LoadingPage';
import "./App.css"
import NotFound from './pages/404'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { ToastContainer } from 'react-toastify'
import Compiler from './pages/Compiler'
import OAuthsuccess from './pages/OAuthsuccess'


const Home = lazy(() => import('./pages/Home'));
// You can lazy load other pages similarly

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/oauth-success" element={<OAuthsuccess />} />
          <Route path="/playground" element={<Compiler />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <ToastContainer />
      </Suspense>
    </Router>
  );
}

export default App;