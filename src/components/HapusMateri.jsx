import React, { useState, useEffect } from "react";
import "../CSS/TambahUser.css";
const HapusMateri = () => {
  const [newMateri, setNewMateri] = useState({
    mode: "CREATE",
    ParentMateriId: null,
    Name: "",
    Title: "",
    Id: null,
    subMateries: [
      {
        mode: "DELETE",
        ParentMateriId: null,
        Id: null,
        Name: "",
        Title: "",
        file: null,
      },
    ],
  });

  const [parentSubjects, setParentSubjects] = useState([]);
  const [selectedSubMateri, setSelectedSubMateri] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchParentSubjects = async () => {
      try {
        const response = await fetch("http://localhost:3000/materi/admin");
        if (response.ok) {
          const data = await response.json();
          setParentSubjects(
            data.body.filter(subject => subject.ParentMateriId === null)
          );
        } else {
          console.error("Failed to fetch parent subjects");
        }
      } catch (error) {
        console.error("Error fetching parent subjects:", error);
      }
    };

    fetchParentSubjects();
  }, []);

  const fetchSubMateries = async parentMateriId => {
    if (parentMateriId) {
      try {
        const response = await fetch("http://localhost:3000/materi/admin");
        if (response.ok) {
          const data = await response.json();
          setNewMateri(prevMateri => ({
            ...prevMateri,
            subMateries: data.body.filter(
              subMateri => subMateri.ParentMateriId === parentMateriId
            ),
          }));
        } else {
          console.error("Failed to fetch sub materials");
        }
      } catch (error) {
        console.error("Error fetching sub materials:", error);
      }
    } else {
      setNewMateri(prevMateri => ({
        ...prevMateri,
        subMateries: [],
      }));
    }
  };

  const handleParentSubjectChange = async e => {
    const selectedParentMateriId = e.target.value;

    if (selectedParentMateriId) {
      const selectedParentSubject = parentSubjects.find(
        subject => subject.Id === parseInt(selectedParentMateriId)
      );

      if (selectedParentSubject) {
        setNewMateri({
          mode: "UPDATE",
          ParentMateriId: selectedParentSubject.ParentMateriId,
          Name: selectedParentSubject.Name,
          Title: selectedParentSubject.Title,
          Id: selectedParentSubject.Id,
          subMateries: [], // Clear sub materials when parent changes
        });
        fetchSubMateries(selectedParentSubject.Id);
      }
    }
  };

  const handleDelete = async () => {
    if (!selectedSubMateri) return;

    try {
      console.log("Deleting submateri:", selectedSubMateri);

      const formData = new FormData();
      formData.append("mode", newMateri.mode);
      formData.append("ParentMateriId", newMateri.ParentMateriId);
      formData.append("Name", newMateri.Name);
      formData.append("Title", newMateri.Title);
      formData.append("Id", newMateri.Id);

      // Set mode to "DELETE" for the selected submateri
      selectedSubMateri.mode = "DELETE";

      formData.append(`subMateries[0].mode`, selectedSubMateri.mode);
      formData.append(
        `subMateries[0].ParentMateriId`,
        selectedSubMateri.ParentMateriId
      );
      formData.append(`subMateries[0].Id`, selectedSubMateri.Id);
      formData.append(`subMateries[0].Name`, selectedSubMateri.Name);
      formData.append(`subMateries[0].Title`, selectedSubMateri.Title);
      formData.append(`subMateries[0].file`, selectedSubMateri.file);

      const response = await fetch(
        "http://localhost:3000/materi/admin/submit",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Response data:", data);
        setMessage(
          `Submateri "${selectedSubMateri.Name}" deleted successfully`
        );
      } else {
        const errorData = await response.json();
        console.error("Error deleting submateri:", errorData);
        setMessage(`Failed to delete submateri: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error deleting submateri:", error);
      setMessage("Failed to delete submateri");
    }
  };

  return (
    <div className="hapus-materi-container">
      <h2>Delete Materi</h2> {/* Tambahkan nama kelas untuk container */}
      <select
        className="select-parent-material"
        onChange={handleParentSubjectChange}
      >
        <option value="">Pilih Mata Pelajarani</option>
        {parentSubjects.map(subject => (
          <option key={subject.Id} value={subject.Id}>
            {subject.Name}
          </option>
        ))}
      </select>
      {newMateri.subMateries.length > 0 && (
        <div className="submateri-list-container">
          {" "}
          {/* Tambahkan nama kelas untuk daftar submateri */}
          <ul className="submateri-list">
            {" "}
            {/* Tambahkan nama kelas untuk daftar submateri */}
            {newMateri.subMateries.map(subMateri => (
              <li
                key={subMateri.Id}
                onClick={() => setSelectedSubMateri(subMateri)}
                className="submateri-item"
              >
                {subMateri.Name}
              </li>
            ))}
          </ul>
          {selectedSubMateri && (
            <div className="detail-submateri-container">
              {" "}
              <h2 className="detail-submateri-title">Detail Submateri</h2>{" "}
              <p className="detail-submateri-name">
                Name: {selectedSubMateri.Name}
              </p>{" "}
              <p className="detail-submateri-title">
                Title: {selectedSubMateri.Title}
              </p>{" "}
              <button className="delete-submateri-btn" onClick={handleDelete}>
                Delete Submateri
              </button>{" "}
            </div>
          )}
        </div>
      )}
      {message && <p className="message">{message}</p>}{" "}
    </div>
  );
};

export default HapusMateri;
