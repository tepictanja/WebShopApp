package com.example.WebShop.repositories;

import com.example.WebShop.models.entities.AttributeEntity;
import com.example.WebShop.models.entities.ProductAttributeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductAttributeEntityRepository extends JpaRepository<ProductAttributeEntity, Integer> {
}
