package com.example.WebShop.exceptions;

import org.springframework.http.HttpStatus;

public class ForbiddenException extends HttpException{
    public ForbiddenException() {
        super(HttpStatus.FORBIDDEN, null);
    }

    public ForbiddenException(Object data) {
        super(HttpStatus.FORBIDDEN, data);
    }
}
