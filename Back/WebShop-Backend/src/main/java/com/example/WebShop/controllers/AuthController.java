package com.example.WebShop.controllers;

import com.example.WebShop.models.dto.LoginResponse;
import com.example.WebShop.models.dto.User;
import com.example.WebShop.models.requests.ActivateAccountRequest;
import com.example.WebShop.models.requests.LoginRequest;
import com.example.WebShop.models.requests.SignUpRequest;
import com.example.WebShop.services.AuthService;
import com.example.WebShop.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {
    private final AuthService authService;
    private final UserService userService;

    public AuthController(AuthService authService, UserService userService){
        this.authService = authService;
        this.userService = userService;
    }

    @PostMapping("sign-up")
    public void signUp(@RequestBody @Valid SignUpRequest request){

        //userService.signUp(request);
        authService.signUp(request);
    }

    @PostMapping("login")
    public LoginResponse login(@RequestBody @Valid LoginRequest request){
        return authService.login(request);
    }

    @PostMapping("activate")
    public User activateAccount(@RequestBody @Valid ActivateAccountRequest request){
        if(authService.activateAccount(request))
            return userService.activateAccount(request.getUsername());
        return null;
    }
}
