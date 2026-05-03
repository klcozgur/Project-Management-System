package com.ozgur_kilic.ozgur_kilic_staj_projesi.api.service.impl;

import com.ozgur_kilic.ozgur_kilic_staj_projesi.api.common.GeneralExpection;
import com.ozgur_kilic.ozgur_kilic_staj_projesi.api.entity.Project;
import com.ozgur_kilic.ozgur_kilic_staj_projesi.api.entity.User;
import com.ozgur_kilic.ozgur_kilic_staj_projesi.api.entity.enums.Role;
import com.ozgur_kilic.ozgur_kilic_staj_projesi.api.entity.enums.Status;
import com.ozgur_kilic.ozgur_kilic_staj_projesi.api.repository.IProjectRepository;
import com.ozgur_kilic.ozgur_kilic_staj_projesi.api.repository.IUserRepository;
import com.ozgur_kilic.ozgur_kilic_staj_projesi.api.service.IUserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public  class UserService  implements IUserService {


    private final IUserRepository userRepository;
    private final IProjectRepository projectRepository;

    public UserService(IUserRepository userRepository, IProjectRepository projectRepository) {
        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
    }

    @Override
    public List<User> getUsersByRole(Role role) {
            return List.of();
    }

    @Override
    public List<User> getAllEmployees() {
        return List.of();
    }

    @Override
    public User save(User user) {

       if (user.getId() == null){


           if (user.getIdentityNo() == null || user.getIdentityNo().length() !=11 ){

               throw new GeneralExpection("Invalid identity no!!");
           }
           if (userRepository.existsByIdentityNo(user.getIdentityNo())) {

               throw new GeneralExpection("Identity no already exists!!");
           }

        }
        return userRepository.save(user);
    }

    @Override
    public User getById(Integer id) {
        Optional<User> user = userRepository.findById(id);
        if(user.isEmpty()){
            throw new GeneralExpection("User not found!!");

        }

        return user.get();
    }

    @Override
    public Page<User> getAll(Pageable pageable) {
        return userRepository.findAll(pageable);

    }

    @Override
    public void delete(Integer id) {
        if(!userRepository.existsById(id)){
            throw new GeneralExpection("User not found!!");
        }
        userRepository.deleteById(id);

    }
    @Override
    public List<Project> getByStatus(Status status) {
        return List.of();
    }
    @Override
    public List<User> getByRole(Role role) {
        return userRepository.findByRole(role);
    }
    @Override
    public User updateRole(Integer id, Role newRole) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setRole(newRole);
        return userRepository.save(user);
    }
    @Override
    public void deleteUserCompletely(Integer id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        for (Project project : user.getProjects()) {
            project.getEmployees().remove(user);
        }

        // Projeleri güncelle (değişiklikleri kaydetmek için)
        projectRepository.saveAll(user.getProjects());

        // En son kullanıcıyı sil
        userRepository.deleteById(id);
    }
}
