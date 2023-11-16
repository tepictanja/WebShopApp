package com.example.WebShop.models.requests;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ActivateAccountRequest {
    @NotBlank
    private String username;
    @NotBlank
    private String pin;
}
