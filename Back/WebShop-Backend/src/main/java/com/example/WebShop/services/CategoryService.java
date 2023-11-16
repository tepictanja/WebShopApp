package com.example.WebShop.services;

import com.example.WebShop.models.dto.Category;

import java.util.List;

public interface CategoryService {

    List<Category> getAll();
    List<Category> getAllSub(String root);
}
