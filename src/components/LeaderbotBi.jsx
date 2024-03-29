import React, { useState, useEffect } from "react";
import "../CSS/Leaderboard.css";
const LeaderbotBi = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const fetchLeaderboardData = async () => {
    try {
      const response = await fetch("localhost:3000/quiz/leaderboard/BAHASA");
      const data = await response.json();
      setLeaderboardData(data.body);
    } catch (error) {
      console.error("Error fetching leaderboard data", error);
    }
  };

  return (
    <div className="containerbox">
      <div className="title">
        <h1>LEADERBOARD</h1>
        <span>Top 10</span>
      </div>
      <div className="containerleader">
        <div className="orangkiri">
          {leaderboardData.slice(0, 5).map((user, index) => (
            <div key={index} className={`container2 s-box${index + 1}`}>
              <div className="nama">
                {/* Update the property access to user.CreatedBy */}
                <h1>{user.CreatedBy}</h1>
              </div>
            </div>
          ))}
        </div>
        <div className="orangkanan">
          {leaderboardData.slice(5, 10).map((user, index) => (
            <div key={index} className={`container2 box-${index + 1}`}>
              <div className="nama">
                {/* Update the property access to user.CreatedBy */}
                <h1>{user.CreatedBy}</h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaderbotBi;
