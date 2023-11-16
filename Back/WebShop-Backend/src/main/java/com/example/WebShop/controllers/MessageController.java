package com.example.WebShop.controllers;

import com.example.WebShop.models.dto.Message;
import com.example.WebShop.models.requests.MessageRequest;
import com.example.WebShop.services.MessageService;
import com.example.WebShop.services.impl.ProductServiceImpl;
import jakarta.validation.Valid;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/messages")
public class MessageController {

    private final MessageService messageService;

    public MessageController(MessageService messageService){
        this.messageService = messageService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void create(@RequestBody @Valid MessageRequest request){
         messageService.insert(request);
    }
}
