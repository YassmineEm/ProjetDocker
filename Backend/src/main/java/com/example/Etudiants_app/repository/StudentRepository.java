package com.example.Etudiants_app.repository;


import com.example.Etudiants_app.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
public interface StudentRepository extends JpaRepository<Student, Long> {
}