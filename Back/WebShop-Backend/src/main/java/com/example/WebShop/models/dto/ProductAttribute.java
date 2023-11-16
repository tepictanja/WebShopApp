package com.example.WebShop.models.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ProductAttribute {
    @NotBlank
    private String value;
    private Attribute attribute;
}
