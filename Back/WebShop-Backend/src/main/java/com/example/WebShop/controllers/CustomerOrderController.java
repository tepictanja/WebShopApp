package com.example.WebShop.controllers;

import com.example.WebShop.services.CustomerOrderService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/orders")
public class CustomerOrderController {

    private final CustomerOrderService orderService;

    public CustomerOrderController(CustomerOrderService orderService){
        this.orderService = orderService;
    }

    @PostMapping("/{address}")
    @ResponseStatus(HttpStatus.CREATED)
    public void insert(@PathVariable @Valid String address){
        orderService.insert(address);
    }
}
