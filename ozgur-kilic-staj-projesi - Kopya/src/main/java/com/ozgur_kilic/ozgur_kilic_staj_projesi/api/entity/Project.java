package com.ozgur_kilic.ozgur_kilic_staj_projesi.api.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.ozgur_kilic.ozgur_kilic_staj_projesi.api.entity.enums.Status;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "projects")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;



    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;


    @ManyToMany
    @JoinTable(
            name = "user_projects",
            joinColumns = @JoinColumn(name = "project_id", referencedColumnName = "id"),
            inverseJoinColumns = {@JoinColumn(name = "user_id", referencedColumnName = "id")}
    )
    private List<User> employees = new ArrayList<>();

}
