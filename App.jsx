import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Pages
import Splash from './pages/Splash';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Chatbot from './pages/Chatbot';
import Games from './pages/Games';
import Videos from './pages/Videos';
import Store from './pages/Store';
import Settings from './pages/Settings';

// Components
import BottomNav from './components/BottomNav';

function App() {
    const { user } = useAuth();

    return (
        <div className="page-container">
            <Routes>
                <Route path="/" element={<Splash />} />

                {/* Auth Route */}
                <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />

                {/* Onboarding Gatekeeper */}
                <Route path="/onboarding" element={
                    !user ? <Navigate to="/login" /> :
                        user.onboardingComplete ? <Navigate to="/dashboard" /> :
                            <Onboarding />
                } />

                {/* Protected Routes */}
                <Route path="/dashboard" element={
                    !user ? <Navigate to="/login" /> :
                        !user.onboardingComplete ? <Navigate to="/onboarding" /> :
                            <><Dashboard /><BottomNav /></>
                } />

                <Route path="/games" element={
                    !user ? <Navigate to="/login" /> :
                        !user.onboardingComplete ? <Navigate to="/onboarding" /> :
                            <><Games /><BottomNav /></>
                } />

                <Route path="/videos" element={
                    !user ? <Navigate to="/login" /> :
                        !user.onboardingComplete ? <Navigate to="/onboarding" /> :
                            <><Videos /><BottomNav /></>
                } />

                <Route path="/store" element={
                    !user ? <Navigate to="/login" /> :
                        !user.onboardingComplete ? <Navigate to="/onboarding" /> :
                            <><Store /><BottomNav /></>
                } />

                <Route path="/settings" element={
                    !user ? <Navigate to="/login" /> :
                        !user.onboardingComplete ? <Navigate to="/onboarding" /> :
                            <><Settings /><BottomNav /></>
                } />

            </Routes>
        </div>
    );
}

export default App;
