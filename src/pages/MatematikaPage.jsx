import React, { useState, useEffect } from "react";
import { Link, Route } from "react-router-dom";
import "../CSS/Matematika.css";
import KuisPage from "./KuisPage";
import Image from "react-bootstrap/Image";
import gambarKuis from "../assets/ava.png";
import Button from "react-bootstrap/Button";
import NavbarMM from "../components/NavbarMM.jsx";

function MatematikaPage() {
  const [materiData, setMateriData] = useState(null);
  const [selectedQuizId, setSelectedQuizId] = useState(null);

  useEffect(() => {
    const fetchMateriData = async () => {
      try {
        const response = await fetch("http://localhost:3000/materi/details/MATEMATIKA");
        const data = await response.json();
        setMateriData(data.body);
        console.log(data);
      } catch (error) {
        console.error("Error fetching materi data:", error);
      }
    };

    fetchMateriData();
  }, []);

  const handleQuizClick = (quizId) => {
    console.log("Clicked QuizId:", quizId);
    setSelectedQuizId(quizId);
  };

  const handleMateriTitleClick = (materi) => {
    // Redirect to the specified API using window.location.href
    if (materi && materi.Content) {
      const apiUrl = `http://localhost:3000/materi/download/${materi.Content}`;
      window.location.href = apiUrl;
      console.log("Click on materi title. To download, please right-click and choose 'Save Link As'.");

      // Optionally, you can keep the code below to log the materi details
      console.log("Materi details:", materi);
    }
  };

  return (
    <div className="enam">
      {/* ini bagian navbar */}
      <NavbarMM />
      {/* ini akhir bagian navbar */}
      {materiData ? (
        <div className="satu">
          {/* ini judul materi testing */}
          <div className="judulHeadline">
            <div className="headLine">
              <div className="materidataTitle">{materiData.Title}</div>
              <p className="loremLimaPuluh">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam ex, facilis doloribus ut quod nostrum voluptas vel natus aspernatur, odit culpa amet, praesentium cum corrupti at impedit ratione! Dolor voluptatem tempore eius
                rem placeat quos vitae esse architecto amet quaerat ea, libero laboriosam exercitationem expedita, inventore distinctio fugit! Rerum, dignissimos!
              </p>
              <Button className="cobaTom" variant="outline-light" onClick={() => handleMateriTitleClick(materiData)}>
                {materiData.Content}
              </Button>{" "}
            </div>

            {materiData.subMateries && (
              <div className="childrenMateri">
                {/* materi data */}
                {materiData.subMateries.map((child) => (
                  <div className="haha" key={child.Name}>
                    <div className="subSib">
                      {child.Title}
                      <div className="divbatas"></div>
                      <Button className="butSubsib" variant="outline-dark" onClick={() => handleMateriTitleClick(child)} style={{ cursor: "pointer" }}>
                        {child.Content}
                        &nbsp;
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* segemen 3 */}
          {materiData.quizes && (
            <div className="empat">
              {/* <h2 className="judulKuis mt-3 ">KUIS</h2> */}
              <div className="biaradaspasi"></div>
              <div className="empatDua">
                {materiData.quizes.map((quiz) => (
                  <div className="kuis11" key={quiz.Id}>
                    {/* box pertmaa */}
                    <div className="boxPertama">
                      {/* <div className="kotakGambar">
                        <Image src={gambarKuis} fluid className="gambarKKuis" alt="" />
                      </div> */}
                      <div className="kotakText">
                        <p className="pKuisTitle">{quiz.Title}</p>
                        <p className="pTimeLimit">Time Limit: {quiz.TimeLimit} seconds</p>
                      </div>
                      <div className="kotakTombol">
                        <Link className="linkEdit" to={`/kuis/${quiz.Id}`} onClick={() => handleQuizClick(quiz.Id)}>
                          <Button className="tombolPertama">Mulai Kuis</Button>
                        </Link>
                      </div>
                    </div>
                    {/* akhir  dari box pertama */}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <p>Loading materi details...</p>
      )}

      {selectedQuizId && <Route path="/kuis" element={<KuisPage quizId={selectedQuizId} />} />}
    </div>
  );
}

export default MatematikaPage;
