package com.example.WebShop.services.impl;

import com.example.WebShop.models.dto.Category;
import com.example.WebShop.models.entities.CategoryEntity;
import com.example.WebShop.repositories.CategoryEntityRepository;
import com.example.WebShop.services.CategoryService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
public class CategoryServiceImpl implements CategoryService {

    private  final CategoryEntityRepository repository;
    private final ModelMapper modelMapper;

    public CategoryServiceImpl(CategoryEntityRepository repository, ModelMapper modelMapper){
        this.repository = repository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<Category> getAll() {
        return repository.findAllRoot().stream().map(c -> modelMapper.map(c, Category.class)).toList();
    }

    @Override
    public List<Category> getAllSub(String root) {
        Integer categoryId = repository.findCategoryIdByName(root);
        return repository.getAllSub(categoryId).stream().map(c -> modelMapper.map(c, Category.class)).toList();
    }
}
