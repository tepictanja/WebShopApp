package com.example.WebShop.repositories;

import com.example.WebShop.models.dto.Attribute;
import com.example.WebShop.models.dto.ProductAttribute;
import com.example.WebShop.models.entities.*;
import com.example.WebShop.models.enums.ProductStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductEntityRepository extends JpaRepository<ProductEntity, Integer> {
    @Query("SELECT p FROM ProductEntity p WHERE p.category.name = :categoryName")
    Page<ProductEntity> findByCategoryName(String categoryName, Pageable pageable);

    Page<ProductEntity> findByStatus(ProductStatus status, Pageable pageable);
    long countByStatus(ProductStatus status);
    Page<ProductEntity> findByNameContaining(String keyword, Pageable pageable);
    Page<ProductEntity> findBySallerIdAndStatus(Integer sellerId, ProductStatus status, Pageable pageable);
    Page<ProductEntity> findByBuyerId(Integer buyerId, Pageable pageable);
    @Query("SELECT p FROM ProductEntity p " +
            "JOIN p.productAttributes pa " +
            "WHERE p.category.name = :category " +
            "AND p.location = :location " +
            "AND p.price >= :priceFrom " +
            "AND p.price <= :priceTo " +
            "AND (:attributeCount = 0 OR " +
            "      pa.attribute IN :attributes AND pa.value IN :attributeValues)")
    Page<ProductEntity> findAllByCategoryAndLocationAndPriceRangeAndAttributes(
            String category, String location, Integer priceFrom, Integer priceTo,
            List<AttributeEntity> attributes, List<String> attributeValues, int attributeCount, Pageable pageable
    );

    Page<ProductEntity> findByNameContainingIgnoreCaseAndStatus(String name, ProductStatus status, Pageable pageable);
}
