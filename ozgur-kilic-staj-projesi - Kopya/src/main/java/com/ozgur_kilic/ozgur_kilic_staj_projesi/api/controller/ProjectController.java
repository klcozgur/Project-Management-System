package com.ozgur_kilic.ozgur_kilic_staj_projesi.api.controller;


import com.ozgur_kilic.ozgur_kilic_staj_projesi.api.entity.Project;
import com.ozgur_kilic.ozgur_kilic_staj_projesi.api.entity.enums.Status;
import com.ozgur_kilic.ozgur_kilic_staj_projesi.api.service.IProjectService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")

public class ProjectController {

    private final IProjectService projectService;

    public ProjectController(IProjectService projectService){
        this.projectService = projectService;
    }

    @GetMapping
    public ResponseEntity<Page<Project>> getAllProjects(@RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "10") Integer pageSize){
        return ResponseEntity.ok(projectService.getAll(PageRequest.of(page,pageSize, Sort.by("id"))));

    }
    @PutMapping("/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable Integer id, @RequestBody Project updatedProject) {
        Project project = projectService.update(id, updatedProject);
        return ResponseEntity.ok(project);
    }
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Project>> getProjectsByStatus(@PathVariable Status status) {
        return ResponseEntity.ok(projectService.getByStatus(status));
    }
    @PostMapping
    public ResponseEntity<Project> createProject(@RequestBody Project project){
        return ResponseEntity.ok(projectService.save(project));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable Integer id){
        return ResponseEntity.ok(projectService.getById(id));
    }
    @PostMapping("/{projectId}/employees/{employeeId}")
    public ResponseEntity<Project> addEmployeeToProject(
            @PathVariable Integer projectId,
            @PathVariable Integer employeeId) {
        Project updatedProject = projectService.addEmployeeToProject(projectId, employeeId);
        return ResponseEntity.ok(updatedProject);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProjectById(@PathVariable Integer id){
        projectService.delete(id);
        return ResponseEntity.ok().build();
    }
    @DeleteMapping("/{projectId}/employees/{employeeId}")
    public ResponseEntity<Project> removeEmployeeFromProject(
            @PathVariable Integer projectId,
            @PathVariable Integer employeeId) {
        Project updatedProject = projectService.removeEmployeeFromProject(projectId, employeeId);
        return ResponseEntity.ok(updatedProject);
    }




}
