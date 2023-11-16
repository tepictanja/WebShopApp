package com.example.WebShop.models.dto;

import com.example.WebShop.models.enums.ProductStatus;
import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;

import java.sql.Timestamp;
import java.util.List;

@Data
public class Product {
    private Integer id;
    private String name;
    private String description;
    private Integer price;
    private boolean isNew;
    private String location;
    private Timestamp createDate;
    private Integer quantity;
    private ProductStatus status;
    //private Integer sallerId;
    private User saller;
    private Integer buyerId;
    private Integer categoryId;
    //private Category category;
    private List<Image> images;
    private List<ProductAttribute> productAttributes;
    private  List<Comment> comments;
}
