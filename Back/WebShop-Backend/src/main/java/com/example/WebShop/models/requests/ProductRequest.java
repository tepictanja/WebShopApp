package com.example.WebShop.models.requests;

import com.example.WebShop.models.dto.Image;
import com.example.WebShop.models.dto.ProductAttribute;
import com.example.WebShop.models.entities.ImageEntity;
import com.example.WebShop.models.entities.ProductAttributeEntity;
import com.example.WebShop.models.enums.ProductStatus;
import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.sql.Timestamp;
import java.util.List;

@Data
public class ProductRequest {
    @NotBlank
    private String name;
    @NotBlank
    private String description;
    @NotNull
    private Integer price;
    @NotNull
    private Boolean isNew;
    @NotBlank
    private String location;
    /*@NotNull
    private Timestamp createDate;*/
    @NotNull
    private Integer quantity;
    @NotNull
    private Integer sallerId;
    private List<Image> images;
    private List<@NotNull ProductAttribute> attributes;
    @NotNull
    private Integer categoryId;

}
