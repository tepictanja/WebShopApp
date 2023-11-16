package com.example.WebShop.services.impl;

import com.example.WebShop.models.dto.Message;
import com.example.WebShop.models.entities.MessageEntity;
import com.example.WebShop.models.entities.UserEntity;
import com.example.WebShop.models.enums.UserStatus;
import com.example.WebShop.models.requests.MessageRequest;
import com.example.WebShop.repositories.MessageEntityRepository;
import com.example.WebShop.services.MessageService;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
public class MessageServiceImpl implements MessageService {

    private final MessageEntityRepository repository;
    private final ModelMapper modelMapper;
    private static final Logger logger = LogManager.getLogger(ProductServiceImpl.class);

    public void logAction(String message) {
        logger.info(message);
    }

    public MessageServiceImpl(MessageEntityRepository repository, ModelMapper modelMapper){
        this.repository = repository;
        this.modelMapper = modelMapper;
    }

    public void insert(MessageRequest request){
        MessageEntity entity = modelMapper.map(request, MessageEntity.class);
        entity.setIsRead(false);
        logAction("SEND MESSAGE by user(id)" + entity.getUser().getId());
        repository.saveAndFlush(entity);
    }
}
