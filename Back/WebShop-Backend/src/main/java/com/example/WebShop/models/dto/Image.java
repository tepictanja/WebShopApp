package com.example.WebShop.models.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class Image {
    @NotBlank
    private String imageUri;
}
