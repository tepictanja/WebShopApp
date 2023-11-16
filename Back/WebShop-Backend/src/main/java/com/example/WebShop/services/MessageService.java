package com.example.WebShop.services;

import com.example.WebShop.models.dto.Message;
import com.example.WebShop.models.requests.MessageRequest;

public interface MessageService {
    void insert(MessageRequest request);
}
