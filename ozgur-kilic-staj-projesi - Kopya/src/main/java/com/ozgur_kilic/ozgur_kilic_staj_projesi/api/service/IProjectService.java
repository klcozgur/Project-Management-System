package com.ozgur_kilic.ozgur_kilic_staj_projesi.api.service;


import com.ozgur_kilic.ozgur_kilic_staj_projesi.api.DTO.ProjectDTO;
import com.ozgur_kilic.ozgur_kilic_staj_projesi.api.entity.Project;
import com.ozgur_kilic.ozgur_kilic_staj_projesi.api.entity.enums.Status;
import org.springframework.stereotype.Service;

import java.util.List;

@Service


public interface IProjectService extends IService<Project> {

    Project addEmployeeToProject(Integer projectId, Integer employeeId);
    Project removeEmployeeFromProject(Integer projectId, Integer employeeId);
    Project update(Integer id, Project updatedProject);
    List<Project> getByStatus(Status status);
    List<ProjectDTO> getAllProjects();

}

