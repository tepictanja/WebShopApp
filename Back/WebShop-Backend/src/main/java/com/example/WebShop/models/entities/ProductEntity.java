package com.example.WebShop.models.entities;

import com.example.WebShop.base.BaseEntity;
import com.example.WebShop.models.enums.ProductStatus;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "product")
public class ProductEntity{
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id", nullable = false)
    private Integer id;
    @Basic
    @Column(name = "name", nullable = false, length = 45)
    private String name;
    @Basic
    @Column(name = "description", nullable = false, length = 500)
    private String description;
    @Basic
    @Column(name = "price", nullable = false, precision = 0)
    private Integer price;
    @Basic
    @Column(name = "is_new", nullable = false)
    private boolean isNew;
    @Basic
    @Column(name = "location", nullable = false, length = 100)
    private String location;
    @Basic
    @Column(name = "create_date", nullable = false)
    private Date createDate;
    @Basic
    @Column(name = "quantity", nullable = false)
    private Integer quantity;
    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "ENUM('ACTIVE', 'SOLD', 'INACTIVE')")
    private ProductStatus status;
    @OneToMany(mappedBy = "product")
    private List<CommentEntity> comments;
    @OneToMany(mappedBy = "product")
    private List<ImageEntity> images;
    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "id", nullable = false)
    private CategoryEntity category;
    @ManyToOne
    @JoinColumn(name = "saller_id", referencedColumnName = "id", nullable = false)
    private UserEntity saller;
    @ManyToOne
    @JoinColumn(name = "buyer_id", referencedColumnName = "id")
    private UserEntity buyer;
    @OneToMany(mappedBy = "product")
    private List<ProductAttributeEntity> productAttributes;
}
