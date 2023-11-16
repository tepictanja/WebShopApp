package com.example.WebShop.services;

import com.example.WebShop.models.dto.LoginResponse;
import com.example.WebShop.models.requests.ActivateAccountRequest;
import com.example.WebShop.models.requests.LoginRequest;
import com.example.WebShop.models.requests.SignUpRequest;

public interface AuthService {
    void signUp(SignUpRequest request);
    LoginResponse login(LoginRequest request);
    void sendPinByEmail(String email, String pin);
    boolean activateAccount(ActivateAccountRequest request);
}
