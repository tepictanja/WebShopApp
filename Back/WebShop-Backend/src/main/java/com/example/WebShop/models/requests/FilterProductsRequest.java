package com.example.WebShop.models.requests;

import com.example.WebShop.models.dto.ProductAttribute;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;
@Data
public class FilterProductsRequest {
    private String category;
    private List<ProductAttribute> productAttributes;
    private String location;
    private Integer priceFrom;
    private Integer priceTo;

}
