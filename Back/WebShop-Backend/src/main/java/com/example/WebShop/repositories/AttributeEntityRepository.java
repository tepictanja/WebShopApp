package com.example.WebShop.repositories;

import com.example.WebShop.models.entities.AttributeEntity;
import com.example.WebShop.models.entities.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttributeEntityRepository extends JpaRepository<AttributeEntity, Integer> {
}
