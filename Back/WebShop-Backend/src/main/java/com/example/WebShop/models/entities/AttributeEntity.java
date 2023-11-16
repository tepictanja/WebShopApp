package com.example.WebShop.models.entities;

import com.example.WebShop.models.enums.Type;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "attribute")
public class AttributeEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id", nullable = false)
    private Integer id;
    @Basic
    @Column(name = "name", nullable = false, length = 45)
    private String name;
    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "ENUM('INT', 'STRING', 'DOUBLE')")
    private Type type;;
    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "id", nullable = false)
    private CategoryEntity category;
    @OneToMany(mappedBy = "attribute")
    private List<ProductAttributeEntity> productAttributes;
}
