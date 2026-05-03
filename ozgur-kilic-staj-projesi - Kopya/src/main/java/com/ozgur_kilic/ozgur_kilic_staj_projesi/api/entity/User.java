package com.ozgur_kilic.ozgur_kilic_staj_projesi.api.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ozgur_kilic.ozgur_kilic_staj_projesi.api.entity.enums.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Entity
@Table(name = "users")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true)
    private String identityNo;

    @Column(nullable = true)
    private String name;

    @Column(nullable = true)
    private String surname;

    @Column
    private String position;

    @Column
    @Enumerated(EnumType.STRING)
    private Role role;



    @ManyToMany(mappedBy = "employees")
    @JsonIgnore
    private Set<Project> projects;
}
