import { Routes, Route } from "react-router-dom";

// import NavbarComponent from "./components/NavbarComponent";

import HomePage from "./pages/HomePage";
import KelasPage from "./pages/KelasPage";
import TestimonialPage from "./pages/TestimonialPage";
import FaqPage from "./pages/FaqPage";
import SyaratKetenPage from "./pages/SyaratKetenPage";
import KuisPage from "./pages/KuisPage";
import MatematikaPage from "./pages/MatematikaPage";
import IpaPage from "./pages/IpaPage";
import IpsPage from "./pages/IpsPage";
import PknPage from "./pages/PknPage";
import BahasaPage from "./pages/BahasaPage";
import tambahUser from "./pages/tambahUser";
import tambahKuis from "./pages/tambahKuis";
import hapusKuis from "./components/HapusKuis";
import hapusMateri from "./components/HapusMateri";
import tambahMateri from "./pages/tambahMateri";
import LoginAdmin from "./pages/LoginAdmin.jsx";
import About from "./pages/AboutPage.jsx";
import Nilai from "./pages/NilaiPage.jsx";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/Kelas" Component={KelasPage} />
        <Route path="/Testimonial" Component={TestimonialPage} />
        <Route path="/Faq" Component={FaqPage} />
        <Route path="/Syaratketen" Component={SyaratKetenPage} />
        <Route path="/kuis/:quizId" Component={KuisPage} />
        <Route path="/Matematika" Component={MatematikaPage} />
        <Route path="/Ipa" Component={IpaPage} />
        <Route path="/Ips" Component={IpsPage} />
        <Route path="/Pkn" Component={PknPage} />
        <Route path="/Bahasa" Component={BahasaPage} />
        <Route path="/Tambah" Component={tambahUser} />
        <Route path="/TambahKuis" Component={tambahKuis} />
        <Route path="/hapusKuis" Component={hapusKuis} />
        <Route path="/hapusMateri" Component={hapusMateri} />
        <Route path="/TambahMateri" Component={tambahMateri} />
        <Route path="/LoginAdmin" Component={LoginAdmin} />
        <Route path="/About" Component={About} />
        <Route path="/Nilai" Component={Nilai} />
      </Routes>
    </div>
  );
}

export default App;
