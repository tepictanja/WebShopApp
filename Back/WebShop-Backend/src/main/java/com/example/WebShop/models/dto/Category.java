package com.example.WebShop.models.dto;

import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import lombok.Data;

import java.util.List;

@Data
public class Category {
    private Integer id;
    private String name;
    private List<Category> subcategories;
    private List<Attribute> attributes;
}
