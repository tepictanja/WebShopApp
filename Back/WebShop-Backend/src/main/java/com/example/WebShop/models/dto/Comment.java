package com.example.WebShop.models.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class Comment {
    @NotBlank
    private String content;
    @NotNull
    private User user;

}
