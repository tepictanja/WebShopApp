package com.example.WebShop.repositories;

import com.example.WebShop.models.entities.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CategoryEntityRepository extends JpaRepository<CategoryEntity, Integer> {
    @Query("select category from CategoryEntity category where category.parentCategory=null")
    List<CategoryEntity> findAllRoot();

    @Query("SELECT category FROM CategoryEntity category WHERE category.parentCategory.id = :id")
    List<CategoryEntity> getAllSub(@Param("id") Integer id);

    @Query("SELECT category.id FROM CategoryEntity category WHERE category.name = :categoryName")
    Integer findCategoryIdByName(@Param("categoryName") String categoryName);
}
