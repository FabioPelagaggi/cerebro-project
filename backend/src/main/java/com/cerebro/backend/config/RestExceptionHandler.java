package com.cerebro.backend.config;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import com.cerebro.backend.exceptions.AppException;

@ControllerAdvice
public class RestExceptionHandler {

    @ExceptionHandler(AppException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<String> handleAppException(AppException e) {
        return ResponseEntity.status(e.getStatus()).body(e.getMessage());
    }
}