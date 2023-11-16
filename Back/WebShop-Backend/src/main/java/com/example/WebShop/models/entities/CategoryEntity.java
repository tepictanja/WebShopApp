package com.example.WebShop.models.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
import java.util.Objects;
@Data
@Entity
@Table(name = "category")
public class CategoryEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id", nullable = false)
    private Integer id;
    @Basic
    @Column(name = "name", nullable = false, length = 45)
    private String name;
    @OneToMany(mappedBy = "category")
    private List<AttributeEntity> attributes;
    @ManyToOne
    @JoinColumn(name = "parent_category_id", referencedColumnName = "id")
    private CategoryEntity parentCategory;
    @OneToMany(mappedBy = "parentCategory")
    private List<CategoryEntity> subcategories;
    @OneToMany(mappedBy = "category")
    private List<ProductEntity> products;
}
