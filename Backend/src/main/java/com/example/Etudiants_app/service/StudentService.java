package com.example.Etudiants_app.service;

import com.example.Etudiants_app.model.Student;
import com.example.Etudiants_app.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.time.LocalDate;
@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Optional<Student> getStudentById(Long id) {
        return studentRepository.findById(id);
    }

    public Student createStudent(String name) {
        Student student = new Student();
        student.setName(name);
        student.setCreationDate(LocalDate.now());
        return studentRepository.save(student);
    }
}