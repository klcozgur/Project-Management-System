package com.ozgur_kilic.ozgur_kilic_staj_projesi.api.controller;


import com.ozgur_kilic.ozgur_kilic_staj_projesi.api.entity.User;
import com.ozgur_kilic.ozgur_kilic_staj_projesi.api.entity.enums.Role;
import com.ozgur_kilic.ozgur_kilic_staj_projesi.api.repository.IUserRepository;
import com.ozgur_kilic.ozgur_kilic_staj_projesi.api.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private IUserRepository IUserRepository;

    private final IUserService userService;

    public UserController(IUserService userService) {
        this.userService = userService;
    }

    @GetMapping
     ResponseEntity<?> getUsers(@RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "10") Integer pageSize){
        Pageable pageable = PageRequest.of(page, pageSize, Sort.by("id"));

        Page<User> userPage= userService.getAll(pageable);
        return ResponseEntity.ok(userPage);
    }
    @PatchMapping("/{id}/role")
    public ResponseEntity<User> updateUserRole(@PathVariable Integer id, @RequestBody Map<String, String> request) {
        String roleStr = request.get("role");
        Role newRole = Role.valueOf(roleStr); // enum çevir
        User updatedUser = userService.updateRole(id, newRole);
        return ResponseEntity.ok(updatedUser);
    }

    @GetMapping("/by-role")
    public ResponseEntity<List<User>> getUsersByRole(@RequestParam String role) {
        Role enumRole = Role.valueOf(role);  // Eğer geçersiz rolse burası IllegalArgumentException atar
        List<User> users = userService.getByRole(enumRole);
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    ResponseEntity<User> getUsers(@PathVariable Integer id){
        return ResponseEntity.ok(userService.getById(id));
    }

    @PostMapping
    ResponseEntity<User> createUser(@RequestBody User user){
        return ResponseEntity.ok(userService.save(user));
    }




    @DeleteMapping("/{id}")
    ResponseEntity<Void> deleteUser(@PathVariable Integer id){
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }
    @DeleteMapping("/{id}/full-delete")
    public ResponseEntity<Void> deleteUserCompletely(@PathVariable Integer id) {
        userService.deleteUserCompletely(id);
        return ResponseEntity.ok().build();
    }



}
