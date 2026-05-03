package com.ozgur_kilic.ozgur_kilic_staj_projesi.api.service;

import com.ozgur_kilic.ozgur_kilic_staj_projesi.api.entity.User;
import com.ozgur_kilic.ozgur_kilic_staj_projesi.api.entity.enums.Role;

import java.util.List;

public interface IUserService extends IService<User> {

    List<User> getUsersByRole(Role role);


    User updateRole(Integer id, Role newRole);
    void deleteUserCompletely(Integer id);
    List<User> getAllEmployees();




}
