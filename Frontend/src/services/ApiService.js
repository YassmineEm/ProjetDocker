const BASE_URL = "http://exam-yassmine.com/api";



export const fetchStudents = async () => {
  try {
    const response = await fetch(`${BASE_URL}/etudients`);
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des étudiants");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur API:", error);
    throw error;
  }
};


export const fetchStudentById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/etudients/${id}`);
    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération de l'étudiant avec l'ID ${id}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur API:", error);
    throw error;  
  }
};



export const createStudent = async (name) => {
  try {
    const response = await fetch(`${BASE_URL}/etudients`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(name), 
    });
    if (!response.ok) {
      throw new Error("Erreur lors de la création de l'étudiant");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur API:", error);
    throw error;
  }
};


export const createNote = async (studentId, courseName, gradeValue) => {
  const noteData = {
    student: {
      id: studentId,
    },
    courseName: courseName,
    value: gradeValue,
  };

  try {
    const response = await fetch(`${BASE_URL}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(noteData),
    });
    if (!response.ok) {
      throw new Error("Erreur lors de l'ajout de la note");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur API:", error);
    throw error;
  }
};



export const fetchNotesByStudentId = async (studentId) => {
  try {
    const response = await fetch(`${BASE_URL}/notes/${studentId}`);
    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération des notes de l'étudiant avec l'ID ${studentId}`);
    }
    const data = await response.json();
    console.log("Notes récupérées:", data);
    return data;
  } catch (error) {
    console.error("Erreur API:", error);
    throw error;  
  }
};




