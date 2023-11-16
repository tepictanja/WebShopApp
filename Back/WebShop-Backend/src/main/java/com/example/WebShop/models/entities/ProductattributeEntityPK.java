package com.example.WebShop.models.entities;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.io.Serializable;
import java.util.Objects;
@Data
public class ProductattributeEntityPK implements Serializable {
    private Integer product;
    private Integer attribute;
}
