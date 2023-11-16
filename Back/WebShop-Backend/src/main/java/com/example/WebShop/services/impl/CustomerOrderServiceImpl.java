package com.example.WebShop.services.impl;

import com.example.WebShop.models.entities.CustomerOrderEntity;
import com.example.WebShop.models.enums.OrderStatus;
import com.example.WebShop.repositories.CustomerOrderEntityRepository;
import com.example.WebShop.services.CustomerOrderService;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
public class CustomerOrderServiceImpl implements CustomerOrderService {

    private final CustomerOrderEntityRepository orderRepository;
    private final ModelMapper modelMapper;

    private static final Logger logger = LogManager.getLogger(ProductServiceImpl.class);

    public void logAction(String message) {
        logger.info(message);
    }

    public CustomerOrderServiceImpl(CustomerOrderEntityRepository orderRepository, ModelMapper modelMapper){
        this.orderRepository = orderRepository;
        this.modelMapper = modelMapper;
    }
    @Override
    public void insert(String address) {
        CustomerOrderEntity entity = new CustomerOrderEntity();
        entity.setAddress(address);
        entity.setStatus(OrderStatus.ORDERED);
        logAction("INSERT ORDER");
        orderRepository.saveAndFlush(entity);
    }
}
