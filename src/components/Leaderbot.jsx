import React, { useState, useEffect } from "react";
import banner from "../assets/bannerKeren.png";
import rank1 from "../assets/rank1.png";
import rank2 from "../assets/rank2.png";
import rank3 from "../assets/rank3.png";
import rank from "../assets/rank.png";

const Leaderbot = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const fetchLeaderboardData = async () => {
    try {
      const response = await fetch("http://localhost:3000/quiz/leaderboard");
      const data = await response.json();
      // Sort the data based on TotalScore in descending order
      const sortedData = data.body.sort((a, b) => b.TotalScore - a.TotalScore);
      // Take only the top 10 entries
      const top10Data = sortedData.slice(0, 10);
      setLeaderboardData(top10Data);
    } catch (error) {
      console.error("Error fetching leaderboard data", error);
    }
  };

  return (
    <div className="containerbox">
      <div className="title">
        <img src={banner} alt="" />
      </div>
      <br />
      <div className="containerTambah">
        {/* Tambahkan baris keterangan di sini */}
        <div className="keterangan">
          <div>Rank</div>
          <div>Nama</div>
          <div>Score</div>
        </div>
        {/* Tampilkan data leaderboard */}
        {leaderboardData.map((item, index) => (
          <div className={`tempat${index + 1}`} key={index}>
            <div className={`badgeSiswa${index + 1}`}>
              {index === 0 && <img src={rank1} alt="" />}
              {index === 1 && <img src={rank2} alt="" />}
              {index === 2 && <img src={rank3} alt="" />}
              {/* Tambahkan gambar untuk peringkat selanjutnya jika diperlukan */}
              {index >= 3 && <img src={rank} alt="" />}
            </div>
            <div className={`namaSiswa${index + 1}`}>{item.CreatedBy}</div>
            <div className={`scoreMapel${index + 1}`}>{item.TotalScore}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderbot;
