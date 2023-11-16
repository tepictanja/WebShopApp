package com.example.WebShop.services;

import com.example.WebShop.models.dto.User;
import com.example.WebShop.models.requests.ActivateAccountRequest;
import com.example.WebShop.models.requests.SignUpRequest;
import com.example.WebShop.models.requests.UserUpdateRequest;
import org.springframework.security.core.Authentication;

public interface UserService {
    User updateUser(String username, UserUpdateRequest user, Authentication auth);
    User findById(Integer id);
    void signUp(SignUpRequest request);
    User activateAccount(String username);
}
