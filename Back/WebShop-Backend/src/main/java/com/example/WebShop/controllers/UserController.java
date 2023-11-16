package com.example.WebShop.controllers;

import com.example.WebShop.models.dto.User;
import com.example.WebShop.models.requests.UserUpdateRequest;
import com.example.WebShop.services.UserService;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }

    @PutMapping("/{username}")
    public User update(@PathVariable String username, @Valid @RequestBody UserUpdateRequest request, Authentication auth){
        return userService.updateUser(username, request, auth);
    }
}
