package com.example.Etudiants_app.controller;

import com.example.Etudiants_app.model.Note;
import com.example.Etudiants_app.model.Student;
import com.example.Etudiants_app.service.NoteService;
import com.example.Etudiants_app.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/notes")
public class NoteController {

    @Autowired
    private NoteService noteService;

    @Autowired
    private StudentService studentService;

    @PostMapping
    public Note addNote(@RequestBody Note note) {
        // On récupère l'étudiant à partir de son ID
        Long studentId = note.getStudent().getId();
        Student student = studentService.getStudentById(studentId).orElseThrow(() -> new RuntimeException("Étudiant non trouvé"));

        // Assigner l'étudiant à la note
        note.setStudent(student);
        
        // Sauvegarder la note avec l'étudiant
        return noteService.addNote(note);
    }

    @GetMapping("/{studentId}")
    public List<Note> getNotesByStudentId(@PathVariable Long studentId) {
        return noteService.getNotesByStudentId(studentId);
    }
}
