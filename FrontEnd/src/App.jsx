import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/Aboutus";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EmergencyAlert from "./pages/EmergencyAlert";
import TopDestination from "./pages/TopDestination";
import Admin from "./pages/Admin";
import BeginYourJourney from "./pages/BeginYourJourney";
import Review from "./pages/Review";
import Error from "./pages/Error";
import Faqs from "./pages/Faqs";
import Contact from "./pages/contact";
import TrekHome from "./pages/trekHome";
import Weather from "./Components/WeatherUpdate";
import Chatbot from "./Components/Chatbot";


function App() {
  return (
    <Router>
      <Navbar />
      <Chatbot/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<AboutUs/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/topdestination" element={<TopDestination/>}/>
        <Route path="/emergencyAlert" element={<EmergencyAlert/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/review" element={<Review/>}/>
        <Route path="/trekhome" element={<TrekHome/>}/>
        <Route path="/beginyourjourney" element={<BeginYourJourney/>}/>
        <Route path="/error" element={<Error/>}/>
        <Route path="/faqs" element={<Faqs/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/weather" element={<Weather/>}/>
       
        
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
