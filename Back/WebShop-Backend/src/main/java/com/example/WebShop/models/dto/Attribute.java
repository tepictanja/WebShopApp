package com.example.WebShop.models.dto;

import com.example.WebShop.models.enums.Type;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class Attribute {
    private Integer id;
    @NotBlank
    private String name;
    @NotNull
    private Type type;
}
