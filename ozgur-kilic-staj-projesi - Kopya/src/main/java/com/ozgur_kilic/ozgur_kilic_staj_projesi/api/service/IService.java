package com.ozgur_kilic.ozgur_kilic_staj_projesi.api.service;

import com.ozgur_kilic.ozgur_kilic_staj_projesi.api.entity.Project;
import com.ozgur_kilic.ozgur_kilic_staj_projesi.api.entity.User;
import com.ozgur_kilic.ozgur_kilic_staj_projesi.api.entity.enums.Role;
import com.ozgur_kilic.ozgur_kilic_staj_projesi.api.entity.enums.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IService <T>{

    T save(T t);

    T getById(Integer id);

    Page<T> getAll(Pageable pageable);

    List<User> getByRole(Role role);

    void delete(Integer id);

    List<Project> getByStatus(Status status);
}
