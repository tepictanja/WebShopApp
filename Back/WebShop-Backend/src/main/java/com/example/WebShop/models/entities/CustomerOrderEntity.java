package com.example.WebShop.models.entities;

import com.example.WebShop.models.enums.OrderStatus;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "customer_order")
public class CustomerOrderEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id", nullable = false)
    private Integer id;

    @Basic
    @Column(name = "address", nullable = false, length = 45)
    private String address;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "ENUM('DELIVERED', 'ORDERED')")
    private OrderStatus status;
}
