package com.example.Etudiants_app.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private LocalDate creationDate;

    // Getter pour l'id
    public Long getId() {
        return id;
    }

    // Setter pour l'id
    public void setId(Long id) {
        this.id = id;
    }

    // Getter pour le nom
    public String getName() {
        return name;
    }

    // Setter pour le nom
    public void setName(String name) {
        this.name = name;
    }

    // Getter pour la date de création
    public LocalDate getCreationDate() {
        return creationDate;
    }

    // Setter pour la date de création
    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

}