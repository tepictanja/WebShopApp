package com.example.WebShop.models.dto;

import lombok.Data;

@Data
public class Message {
    private Integer Id;
    private String title;
    private String content;
    private Boolean isRead;
    private Integer userId;
}
