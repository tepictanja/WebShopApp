package com.example.WebShop.controllers;

import com.example.WebShop.models.dto.Category;
import com.example.WebShop.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    private final CategoryService service;

    @Autowired
    public CategoryController(CategoryService service) {
        this.service = service;
    }
    @GetMapping
    public List<Category> gatAll() {
        return service.getAll();
    }

    @GetMapping("/{root}")
    public List<Category> gatAllSub(@PathVariable String root) {
        return service.getAllSub(root);
    }

}
