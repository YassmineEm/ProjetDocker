import React, { useEffect, useState } from "react";
import { fetchStudentById, fetchNotesByStudentId, createNote } from "../services/ApiService";
import { useParams } from "react-router-dom";
import "../style/StudentDetails.css";

const cleanString = (str) => {
  return str.replace(/[\r\n"]/g, "").trim();
};

function StudentDetails() {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const [courseName, setCourseName] = useState('');
  const [gradeValue, setGradeValue] = useState('');

  
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      if (!studentId) {
        setError("ID de l'étudiant manquant.");
        return;
      }
  
      try {
        setLoading(true);
        setError(null);

        // Récupérer les informations de l'étudiant
        const studentData = await fetchStudentById(studentId);
        console.log("Données de l'étudiant:", studentData);
  
        // Nettoyer les données
        const cleanedStudent = {
          ...studentData,
          name: cleanString(studentData.name),  // Nettoyer le nom
        };
        setStudent(cleanedStudent);
  
        // Récupérer les notes de l'étudiant
        const notesData = await fetchNotesByStudentId(studentId);
        console.log("Données des notes:", notesData);
  
        // Nettoyer les notes
        const cleanedNotes = notesData.map(note => ({
          ...note,
          student: {
            ...note.student,
            name: cleanString(note.student.name), // Nettoyer le nom de l'étudiant dans les notes
          },
        }));
        setNotes(cleanedNotes);
  
      } catch (error) {
        console.error("Erreur de récupération des données:", error);
        setError("Erreur lors du chargement des données : " + error.message); 
      } finally {
        setLoading(false);
      }
    };
  
    fetchStudentDetails();
  }, [studentId]);

  // Fonction pour ajouter une note
  const handleAddNote = async (e) => {
    e.preventDefault();

    if (!courseName || !gradeValue) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    if (isNaN(gradeValue) || gradeValue < 0 || gradeValue > 20) {
      setError("La note doit être un nombre entre 0 et 20");
      return;
    }

    try {
      const newNote = await createNote(studentId, courseName, gradeValue);
      setNotes([...notes, newNote]); 
      setCourseName(''); 
      setGradeValue(''); 
      setError(null); 
      setSuccessMessage("Note ajoutée avec succès !");
      setShowModal(false); 
    } catch (err) {
      setError('Erreur lors de l\'ajout de la note');
    }
  };

 
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;
  if (!student) return <div>Aucun étudiant trouvé.</div>;

  return (
    <div className="student-details-container">
      <h2>Détails de l'étudiant</h2>
      <div className="student-info">
        <p><strong>Nom :</strong> {student.name}</p>
        <p><strong>Date de création :</strong> {student.creationDate ? new Date(student.creationDate).toLocaleDateString() : "Non disponible"}</p>
      </div>

      <h3>Notes</h3>
      {notes.length > 0 ? (
        <table className="notes-table">
          <thead>
            <tr>
              <th>Cours</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note) => (
              <tr
                key={note.id}
                style={{
                  backgroundColor: note.value > 10 ? "green" : "#AC1B01",
                  color: "white",
                }}
              >
                <td>{note.courseName}</td>
                <td>{note.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Aucune note disponible pour cet étudiant.</p>
      )}

      <button onClick={toggleModal}>Ajouter une note</button>

      {/* Modal pour ajouter une note */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Ajouter une note</h3>
            {successMessage && <div className="success-message">{successMessage}</div>}
            <form onSubmit={handleAddNote}>
              <div>
                <label htmlFor="courseName">Nom du cours</label>
                <input
                  type="text"
                  id="courseName"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="gradeValue">Note</label>
                <input
                  type="number"
                  id="gradeValue"
                  value={gradeValue}
                  onChange={(e) => setGradeValue(e.target.value)}
                  min="0"
                  max="20"
                />
              </div>
              <button type="submit">Ajouter la note</button>
              <button type="button" onClick={toggleModal}>Fermer</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentDetails;





