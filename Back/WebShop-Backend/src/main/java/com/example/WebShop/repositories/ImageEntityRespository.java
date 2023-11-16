package com.example.WebShop.repositories;

import com.example.WebShop.models.entities.AttributeEntity;
import com.example.WebShop.models.entities.ImageEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageEntityRespository extends JpaRepository<ImageEntity, Integer> {
}
