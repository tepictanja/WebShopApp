package com.example.WebShop.repositories;

import com.example.WebShop.models.entities.CustomerOrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerOrderEntityRepository extends JpaRepository<CustomerOrderEntity, Integer> {
}
