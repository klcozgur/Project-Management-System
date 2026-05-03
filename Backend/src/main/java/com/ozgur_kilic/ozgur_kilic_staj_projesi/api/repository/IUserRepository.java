package com.ozgur_kilic.ozgur_kilic_staj_projesi.api.repository;

import com.ozgur_kilic.ozgur_kilic_staj_projesi.api.entity.User;
import com.ozgur_kilic.ozgur_kilic_staj_projesi.api.entity.enums.Role;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface IUserRepository extends JpaRepository<User, Integer> {

    boolean existsByName(String name);

    List<User> findByRole(Role role);

    Page<User> findAll(Pageable pageable);



    boolean existsByIdentityNo(String identityNo);
}
