import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";

import trashIcon from "../assets/trash.png";

const TambahMateri = () => {
  const [newMateri, setNewMateri] = useState({
    mode: "CREATE",
    ParentMateriId: null,
    Name: "",
    Title: "",
    Id: null,
    subMateries: [
      {
        mode: "CREATE",
        ParentMateriId: null,
        Id: null,
        Name: "",
        Title: "",
        file: null,
      },
    ],
  });

  const [parentSubjects, setParentSubjects] = useState([]);
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

  const handleParentSubjectChange = async e => {
    const selectedParentMateriId = e.target.value;

    if (selectedParentMateriId) {
      const selectedParentSubject = parentSubjects.find(
        subject => subject.Id === parseInt(selectedParentMateriId)
      );

      if (selectedParentSubject) {
        setNewMateri({
          ...newMateri,
          mode: "UPDATE",
          ParentMateriId: selectedParentSubject.Id,
          Name: selectedParentSubject.Name,
          Title: selectedParentSubject.Title,
          Id: selectedParentSubject.Id,
        });
      }
    } else {
      setNewMateri({
        ...newMateri,
        mode: "CREATE",
        ParentMateriId: null,
        Name: "",
        Title: "",
        Id: "",
      });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      console.log("Submitting data:", newMateri);

      const formData = new FormData();
      formData.append("mode", newMateri.mode);
      formData.append(
        "ParentMateriId",
        newMateri.ParentMateriId ? newMateri.ParentMateriId : null
      );
      formData.append("Name", newMateri.Name);
      formData.append("Title", newMateri.Title);
      formData.append("Id", newMateri.Id);

      newMateri.subMateries.forEach((subMateri, index) => {
        formData.append(`subMateries[${index}].mode`, subMateri.mode);
        formData.append(
          `subMateries[${index}].ParentMateriId`,
          newMateri.ParentMateriId
        );
        formData.append(`subMateries[${index}].Name`, subMateri.Name);
        formData.append(`subMateries[${index}].Title`, subMateri.Title);
        formData.append(`subMateries[${index}].file`, subMateri.file);
      });

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
        setMessage("Material added successfully");
      } else {
        const errorData = await response.json();
        console.error("Error adding material:", errorData);
        setMessage(`Failed to add material: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error adding material:", error);
      setMessage("Error adding material");
    }
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedSubMateries = [...newMateri.subMateries];
    updatedSubMateries[index] = {
      ...updatedSubMateries[index],
      [name]: value,
    };
    setNewMateri({
      ...newMateri,
      subMateries: updatedSubMateries,
    });
  };

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    const updatedSubMateries = [...newMateri.subMateries];
    updatedSubMateries[index] = {
      ...updatedSubMateries[index],
      file: file,
    };
    setNewMateri({
      ...newMateri,
      subMateries: updatedSubMateries,
    });
  };

  const addSubMateri = () => {
    setNewMateri({
      ...newMateri,
      subMateries: [
        ...newMateri.subMateries,
        {
          mode: "CREATE",
          Id: newMateri.subMateries.length + 1,
          Name: "",
          Title: "",
          file: null,
          ParentMateriId: newMateri.ParentMateriId,
        },
      ],
    });
  };

  const removeSubMateri = index => {
    const updatedSubMateries = newMateri.subMateries.filter(
      (_, i) => i !== index
    );
    setNewMateri({
      ...newMateri,
      subMateries: updatedSubMateries,
    });
  };

  return (
    <div className="tambah-materi-container">
      <Navbar />
      <div className="tambah-materi-content">
        <h2>Add Material</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Parent Subject:
            <select
              value={newMateri.ParentMateriId}
              onChange={handleParentSubjectChange}
            >
              <option value="">Select Parent Subject</option>
              {parentSubjects.map(subject => (
                <option key={subject.Id} value={subject.Id}>
                  {subject.Name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Material Name:
            <input
              type="text"
              value={newMateri.Name}
              onChange={e =>
                setNewMateri({ ...newMateri, Name: e.target.value })
              }
            />
          </label>

          <label>
            Material Title:
            <input
              type="text"
              value={newMateri.Title}
              onChange={e =>
                setNewMateri({ ...newMateri, Title: e.target.value })
              }
            />
          </label>

          {newMateri.subMateries.map((subMateri, index) => (
            <div className="submateri-container" key={index}>
              <label>
                Sub Material Name:
                <input
                  type="text"
                  name="Name"
                  value={subMateri.Name}
                  onChange={e => handleInputChange(e, index)}
                />
              </label>

              <label>
                Sub Material Title:
                <input
                  type="text"
                  name="Title"
                  value={subMateri.Title}
                  onChange={e => handleInputChange(e, index)}
                />
              </label>

              <label>
                Upload File:
                <input type="file" onChange={e => handleFileChange(e, index)} />
              </label>

              {/* Gambar ikon tempat sampah */}
              <img
                src={trashIcon}
                alt="Delete"
                onClick={() => removeSubMateri(index)}
                className="trash-icon"
              />
            </div>
          ))}

          <button
            type="button"
            className="add-submateri-button"
            onClick={addSubMateri}
          >
            Add Sub Material
          </button>

          <button type="submit" className="submit-button">
            Add Material
          </button>
        </form>

        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default TambahMateri;
