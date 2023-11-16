package com.example.WebShop.services.impl;

import com.example.WebShop.models.entities.CommentEntity;
import com.example.WebShop.models.requests.CommentRequest;
import com.example.WebShop.repositories.CommentEntityRepository;
import com.example.WebShop.services.CommentService;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
public class CommentServiceImpl implements CommentService {
    private final CommentEntityRepository commentRepository;
    private final ModelMapper modelMapper;

    private static final Logger logger = LogManager.getLogger(ProductServiceImpl.class);

    public void logAction(String message) {
        logger.info(message);
    }

    public CommentServiceImpl(CommentEntityRepository commentRepository, ModelMapper modelMapper){
        this.commentRepository = commentRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public void insert(CommentRequest request) {
        CommentEntity entity = modelMapper.map(request, CommentEntity.class);
        logAction("COMMENT PRODUCT " + entity.getProduct().getId() + " by user(id) " + entity.getUser().getId());
        commentRepository.saveAndFlush(entity);
    }
}
