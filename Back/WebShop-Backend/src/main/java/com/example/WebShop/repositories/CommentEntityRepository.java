package com.example.WebShop.repositories;

import com.example.WebShop.models.entities.CategoryEntity;
import com.example.WebShop.models.entities.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentEntityRepository extends JpaRepository<CommentEntity, Integer> {
}
