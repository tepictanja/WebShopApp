package com.example.WebShop.models.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Objects;
@Data
@Entity
@Table(name = "productattribute", schema = "webshop", catalog = "")
@IdClass(ProductattributeEntityPK.class)
public class ProductAttributeEntity {
    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", referencedColumnName = "id", nullable = false)
    private ProductEntity product;
    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "attribute_id", referencedColumnName = "id", nullable = false)
    private AttributeEntity attribute;
    @Basic
    @Column(name = "value", nullable = false, length = 45)
    private String value;

}
