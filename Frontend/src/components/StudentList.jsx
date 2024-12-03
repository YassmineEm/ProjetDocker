import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { fetchStudents, createStudent} from "../services/ApiService";
import "../style/StudentList.css";

const cleanName = (name) => {
  return name.trim().replace(/[\r\n"]/g, "");
};

const formatDate = (date) => {
  return new Date(date).toISOString().split("T")[0];
};

function StudentList() {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newStudentName, setNewStudentName] = useState("");
  const navigate = useNavigate(); 

  useEffect(() => {
    const getStudents = async () => {
      try {
        const data = await fetchStudents();
        setStudents(data);
      } catch (error) {
        console.error("Erreur lors du chargement des étudiants:", error);
      }
    };
    getStudents();
  }, []);

  const toggleModal = () => setShowModal(!showModal);

  const handleAddStudent = async () => {
    if (!newStudentName.trim()) {
      alert("Veuillez entrer un nom.");
      return;
    }

    const cleanedName = cleanName(newStudentName);

    try {
      const addedStudent = await createStudent(cleanedName);
      setStudents([...students, addedStudent]);
      setShowModal(false);
      setNewStudentName("");
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'étudiant:", error);
    }
  };

  const handleRowClick = (studentId) => {
    navigate(`/notes/${studentId}`); 
  };
  
  return (
    <div className="student-list-container">
      <h1>Liste des étudiants</h1>
      <button onClick={toggleModal} className="add-student-button">
        Ajouter un étudiant
      </button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Ajouter un étudiant</h2>
            <input
              type="text"
              value={newStudentName}
              onChange={(e) => setNewStudentName(e.target.value)}
              placeholder="Nom de l'étudiant"
            />
            <button onClick={handleAddStudent}>Ajouter</button>
            <button onClick={toggleModal}>Fermer</button>
          </div>
        </div>
      )}

      <table className="student-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Date de création</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr
              key={student.id}
              style={{
                backgroundColor: student.average && student.average > 10 ? "green" : "#FF8E8E",
                color: "white",
                cursor: "pointer", 
              }}
              onClick={() => handleRowClick(student.id)} 
            >
              <td>{cleanName(student.name)}</td>
              <td>{formatDate(student.creationDate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;





