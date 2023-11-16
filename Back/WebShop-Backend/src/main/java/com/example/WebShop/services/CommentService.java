package com.example.WebShop.services;

import com.example.WebShop.models.requests.CommentRequest;


public interface CommentService {
    void insert(CommentRequest request);
}
