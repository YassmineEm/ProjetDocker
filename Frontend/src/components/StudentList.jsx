import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { fetchStudents, createStudent, fetchNotesByStudentId} from "../services/ApiService";
import "../style/StudentList.css";

const cleanName = (name) => {
  return name.trim().replace(/[\r\n"]/g, "");
};

const formatDate = (date) => {
  return new Date(date).toISOString().split("T")[0];
};

const calculateAverage = (notes) => {
  const total = notes.reduce((sum, note) => sum + note.value, 0);
  return notes.length > 0 ? total / notes.length : 0; 
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
        const studentsWithAverage = await Promise.all(
          data.map(async (student) => {
            const notes = await fetchNotesByStudentId(student.id); 
            const average = calculateAverage(notes); 
            return { ...student, average }; 
          })
        );
        setStudents(studentsWithAverage); 
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
              className={student.average > 10 ? "student-row-green" : "student-row-red"}
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





