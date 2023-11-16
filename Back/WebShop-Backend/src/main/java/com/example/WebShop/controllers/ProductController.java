package com.example.WebShop.controllers;

import com.example.WebShop.exceptions.NotFoundException;
import com.example.WebShop.models.dto.Product;
import com.example.WebShop.models.enums.ProductStatus;
import com.example.WebShop.models.requests.FilterProductsRequest;
import com.example.WebShop.models.requests.ProductRequest;
import com.example.WebShop.models.requests.SoldProductRequest;
import com.example.WebShop.services.ProductService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


@RestController
@RequestMapping("/products")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService){
        this.productService = productService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Product create(@RequestBody @Valid ProductRequest request, Authentication auth){
        return productService.insert(request, auth);
    }

    @GetMapping("/{category}")
    public Page<Product> getProductsByCategory(@PathVariable String category, @RequestParam int page, @RequestParam int size){
        Pageable pageable = PageRequest.of(page, size);
        return productService.getProductsByCategory(category, pageable);
    }

    @GetMapping("/getActive")
    public Page<Product> getProductsByStatus(@RequestParam int page, @RequestParam int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productService.getProductsByStatus(ProductStatus.ACTIVE, pageable);
    }

    @GetMapping("/getById/{id}")
    public Product getProductById(@PathVariable Integer id) {
        return productService.getById(id);
    }


    @DeleteMapping("/setInactive/{productId}")
    public Product setProductInactive(@PathVariable Integer productId, Authentication auth) throws NotFoundException {
        return productService.deleteById(productId, auth);
    }

    @PostMapping("/sold")
    public Product soldProduct(@RequestBody @Valid SoldProductRequest request, Authentication auth){
        return  productService.markProductAsSold(request, auth);
    }

    @GetMapping("/active/{id}")
    public Page<Product> getActiveProductsBySellerId(@PathVariable Integer id, @RequestParam int page, @RequestParam int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productService.getProductsBySellerAndStatus(id, ProductStatus.ACTIVE, pageable);
    }

    @GetMapping("/sold/{id}")
    public Page<Product> getSoldProductsBySellerId(@PathVariable Integer id, @RequestParam int page, @RequestParam int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productService.getProductsBySellerAndStatus(id, ProductStatus.SOLD, pageable);
    }

    @GetMapping("/getByCustomer/{id}")
    public Page<Product> getPurchasedProducts(@PathVariable Integer id, @RequestParam int page, @RequestParam int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productService.getProductsByBuyer(id, pageable);
    }

    @PostMapping("/filteredProducts")
    public Page<Product> filterProductsByAttributes(@RequestBody @Valid FilterProductsRequest request, @RequestParam int page, @RequestParam int size){
        Pageable pageable = PageRequest.of(page, size);
        return  productService.filterProducts(request, pageable);
    }

    @GetMapping("/search/{name}")
    public Page<Product> searchProducts(@PathVariable String name, @RequestParam int page, @RequestParam int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productService.searchProductsByNameAndStatus(name, ProductStatus.ACTIVE, pageable);
    }
}
