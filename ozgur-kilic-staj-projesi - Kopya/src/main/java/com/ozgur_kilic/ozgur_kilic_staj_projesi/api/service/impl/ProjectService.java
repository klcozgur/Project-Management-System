package com.ozgur_kilic.ozgur_kilic_staj_projesi.api.service.impl;

import com.ozgur_kilic.ozgur_kilic_staj_projesi.api.DTO.ProjectDTO;
import com.ozgur_kilic.ozgur_kilic_staj_projesi.api.entity.Project;
import com.ozgur_kilic.ozgur_kilic_staj_projesi.api.entity.User;
import com.ozgur_kilic.ozgur_kilic_staj_projesi.api.entity.enums.Role;
import com.ozgur_kilic.ozgur_kilic_staj_projesi.api.entity.enums.Status;
import com.ozgur_kilic.ozgur_kilic_staj_projesi.api.repository.IProjectRepository;
import com.ozgur_kilic.ozgur_kilic_staj_projesi.api.repository.IUserRepository;
import com.ozgur_kilic.ozgur_kilic_staj_projesi.api.service.IProjectService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service

public class ProjectService implements IProjectService {

    private final IProjectRepository projectRepository;
    private final IUserRepository userRepository;
    public ProjectService(IProjectRepository projectRepository,IUserRepository userRepository) {
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }


    @Override
    public Project save(Project project) {
        if (project.getEmployees() != null && !project.getEmployees().isEmpty()) {
            List<Integer> employeeIds = project.getEmployees().stream()
                    .map(User::getId)
                    .toList();

            List<User> realEmployees = userRepository.findAllById(employeeIds);
            project.setEmployees(realEmployees);
        }
        return projectRepository.save(project);
    }

    @Override
    public Project getById(Integer id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));
    }

    @Override
    public Page<Project> getAll(Pageable pageable) {
        return projectRepository.findAll(pageable);
    }

    @Override
    public List<User> getByRole(Role role) {
        return List.of();
    }

    @Override
    public void delete(Integer id) {
        projectRepository.deleteById(id);
    }

    @Override
    public List<Project> getByStatus(Status status) {
        return projectRepository.findByStatus(status);
    }
    @Override
    public Project update(Integer id, Project updatedProject) {
        Project existingProject = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        existingProject.setName(updatedProject.getName());
        existingProject.setStatus(updatedProject.getStatus());
        return projectRepository.save(existingProject);
    }
    @Override
    public Project removeEmployeeFromProject(Integer projectId, Integer employeeId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        User employeeToRemove = userRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        project.getEmployees().remove(employeeToRemove);
        return projectRepository.save(project);
    }
    @Override
    public Project addEmployeeToProject(Integer projectId, Integer employeeId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Proje bulunamadı"));

        User employee = userRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Çalışan bulunamadı"));

        if (project.getEmployees().contains(employee)) {
            throw new RuntimeException("Bu çalışan zaten projeye atanmış.");
        }

        project.getEmployees().add(employee);
        return projectRepository.save(project);
    }
    @Override
    public List<ProjectDTO> getAllProjects() {
        List<Project> projects = projectRepository.findAll();

        return projects.stream().map(project -> {
            ProjectDTO dto = new ProjectDTO();
            dto.setName(project.getName());
            dto.setStatus(project.getStatus().name());
            return dto;
        }).collect(Collectors.toList());
    }
}
