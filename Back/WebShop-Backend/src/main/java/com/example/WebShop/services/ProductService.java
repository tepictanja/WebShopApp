package com.example.WebShop.services;

import com.example.WebShop.models.dto.Product;
import com.example.WebShop.models.entities.ProductEntity;
import com.example.WebShop.models.enums.ProductStatus;
import com.example.WebShop.models.requests.FilterProductsRequest;
import com.example.WebShop.models.requests.ProductRequest;
import com.example.WebShop.models.requests.SoldProductRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.parameters.P;


public interface ProductService {
    Product insert(ProductRequest request, Authentication auth);
    Product deleteById(Integer id, Authentication auth);
    Page<Product> getAll(Pageable pageable);
    Page<Product> getProductsByCategory(String categoryName, Pageable pageable);
    Page<Product> getProductsByStatus(ProductStatus status, Pageable pageable);
    Product markProductAsSold(SoldProductRequest request, Authentication auth);
    Product getById(Integer id);
    Page<Product> getProductsBySellerAndStatus(Integer sellerId, ProductStatus status, Pageable pageable);
    Page<Product> getProductsByBuyer(Integer buyerId, Pageable pageable);

    Page<Product> filterProducts(FilterProductsRequest request, Pageable pageable);
    Page<Product> searchProductsByNameAndStatus(String name, ProductStatus status, Pageable pageable);
}
