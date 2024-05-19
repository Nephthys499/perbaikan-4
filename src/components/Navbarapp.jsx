import Logosd from "../assets/logo562.png";
import logo2 from "../assets/logo2.png";

const Navbarapp = () => {
  return (
    <nav className="navbar1">
      <div className="kiri">
        <div className="navbar-logo1">
          <img src={Logosd} alt="" />
        </div>
        <div className="text">
          <h1>E-LEARNING</h1>
          <span>sekolah dasar</span>
        </div>
      </div>
      <div className="navbar-extra1">
        <a href="/Kelas">beranda</a>
        <img src={logo2} alt="" />
        <a href="/About">About Us</a>
      </div>
    </nav>
  );
};

export default Navbarapp;
