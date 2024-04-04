import React from "react";
import "../CSS/About.css";
import logo from "../assets/cobaini.jpg";
import logo2 from "../assets/Group 17.png";
import logo3 from "../assets/Group 20.png";
import logo5 from "../assets/inibackground.png";
import logo4 from "../assets/image.jpg";
import NavbarMM from "../components/NavbarMM.jsx";
const AboutPage = () => {
  return (
    <div className="responsive-container-block bigContainer">
      <NavbarMM />
      <div className="responsive-container-block Container21">
        <div className="responsive-container-block leftSide">
          <p className="text-blk heading">
            VISI & MISI
            <br />
            MI Ya BAKII KARANGJENGKOL
          </p>
          <p className="text-blk subHeading">
            A. Visi Madrasah
            <br />
            “TERDEPAN DALAM PRESTASI, TANGGUH DALAM IMTAQ DAN TERPUJI DALAM
            AKHLAK”
            <br />
            <br />
            Indikator
            <br />
            1. Terwujudnya siswa siswi yang terdepan dalam prestasi pencapaian
            nilai akademik dan non akademik.
            <br />
            2. Terwujudnya siswa siswi yang mampu bersaing dengan lulusan yang
            sederajat untuk melanjutkan / diterima dijenjang pendidikan yang
            lebih tinggi
            <br />
            3. Terwujudnya siswa siswi yang mampu berpikir aktif, kreatif dan
            ketrampilan memecahkan masalah.
            <br />
            4. Terwujudnya siswa siswi yang memiliki ketrampilan, kecakapan non
            akademis sesuai dengan bakat dan minatnya.
            <br />
            5. Terwujudnya siswa siswi yang memiliki keyakinan kuat dan
            mengamalkan ajaran Islam secara benar dan konsekuen.
            <br />
            6. Terwujudnya siswa siswi yang santun dalam bertutur dan prilaku,
            disiplin, percaya diri, tanggungjawab, hormat kepada orang tua dan
            guru serta penyayang sesama teman.
            <br />
            <br />
            B. Misi Madrasah
            <br />
            Berdasarkan visi dan indikator visi di atas, maka Misi Pendidikan di
            MI Ya BAKII Karangjengkol sebagai berikut :<br />
            1. Menyelenggarakan pendidikan yang berkualitas dalam pencapaian
            prestasi akademik dan non akademik
            <br />
            2. Menyelenggarakan pendidikan secara PAIKEM sehingga siswa siswi
            berkembang secara maksimal.
            <br />
            3. Menyelenggarakan pembelajaran untuk menumbuh kembangkan kemampuan
            berpikir aktif, kreatif dan aktif dalam memecahkan masalah.
            <br />
            4. Menyelenggarakan pengembangan diri sehingga siswa-siswi dapat
            berkembang sesuai dengan bakat dan minatnya.
            <br />
            5. Menumbuh kembangkan lingkungan dan perilaku religius sehingga
            siswa-siswi dapat mengamalkan dan menghayati agamanya secara nyata.
            <br />
            6. Mewujudkan pembelajaran dan pembiasaan dalam mempelajari Alqur’an
            dan menjalankan ajaran agama Islam.
            <br />
            7. Menumbuh kembangkan perilaku terpuji dan praktik nyata sehingga
            siswa-siswi dapat menjadi teladan bagi teman dan di masyarakat.
          </p>
        </div>
        <div className="responsive-container-block rightSide">
          <img className="number1img" src={logo2} alt="Team member 1" />
          <img className="number2img" src={logo} alt="Team member 2" />
          <img
            className="number3img"
            src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/b245.png"
            alt="Team member 3"
          />
          <img className="number5img" src={logo5} alt="Team member 5" />
          <iframe
            title="Team member 4"
            allowFullScreen
            className="number4vid"
            poster="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/b242.png"
            src="https://www.youtube.com/embed/Sx86f_Awg5I"
          />
          <img className="number7img" src={logo3} alt="Team member 7" />
          <img className="number6img" src={logo4} alt="Team member 6" />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
