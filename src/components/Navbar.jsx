import React from "react";
import "../CSS/NavbarAdmin.css";
import { NavLink } from "react-router-dom"; // Import NavLink untuk menentukan halaman aktif
import ScoreIcon from "../assets/Score1.png"; // Import ikon user dari assets
import MateriIcon from "../assets/file.png"; // Import ikon materi dari assets
import KuisIcon from "../assets/exam.png"; // Import ikon kuis dari assets
import logo from "../assets/logo562.png"; // Import ikon kuis dari assets
import Hapus from "../assets/delete.png"; // Import ikon kuis dari assets

const Navbar = () => {
  return (
    <nav className="navbar21">
      <div className="navbar-header1">
        <img src={logo} alt="School Logo" className="logo1" />
        <h1 className="school-name1">MI Ya BAKII KARANGJENGKOL</h1>
      </div>
      <ul className="menu-items1">
        <NavItem to="/Nilai" icon={ScoreIcon} label="Score" />
        <NavItem to="/TambahMateri" icon={MateriIcon} label="Materi" />
        <NavItem to="/TambahKuis" icon={KuisIcon} label="Kuis" />
        <NavItem to="/hapuskuis" icon={Hapus} label="Hapus Kuis" />
      </ul>
    </nav>
  );
};

const NavItem = ({ to, icon, label }) => {
  return (
    <li>
      <NavLink to={to} activeClassName="active">
        <img src={icon} alt={`${label} Icon`} className="menu-icon1" />
        {label}
      </NavLink>
    </li>
  );
};

export default Navbar;
