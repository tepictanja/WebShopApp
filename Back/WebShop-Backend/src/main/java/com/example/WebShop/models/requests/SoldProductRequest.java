package com.example.WebShop.models.requests;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SoldProductRequest {
    @NotNull
    private Integer productId;
    @NotNull
    private Integer customerId;
}
