package com.example.WebShop.models.requests;

import com.example.WebShop.models.entities.ProductEntity;
import com.example.WebShop.models.entities.UserEntity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NonNull;

@Data
public class CommentRequest {
    @NotBlank
    private String content;
    @NonNull
    private Integer productId;
    @NonNull
    private Integer userId;
}
