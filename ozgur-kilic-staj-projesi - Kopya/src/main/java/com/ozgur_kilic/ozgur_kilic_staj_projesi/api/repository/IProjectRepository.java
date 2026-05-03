package com.ozgur_kilic.ozgur_kilic_staj_projesi.api.repository;

import com.ozgur_kilic.ozgur_kilic_staj_projesi.api.entity.Project;
import com.ozgur_kilic.ozgur_kilic_staj_projesi.api.entity.enums.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface IProjectRepository extends JpaRepository<Project, Integer> {


    List<Project> findByStatus(Status status);
}
