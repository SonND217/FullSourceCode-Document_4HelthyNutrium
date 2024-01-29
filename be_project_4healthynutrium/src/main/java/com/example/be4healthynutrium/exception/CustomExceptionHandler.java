package com.example.be4healthynutrium.exception;

import com.example.be4healthynutrium.dto.ExceptionResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
@ResponseBody
public class CustomExceptionHandler {

    @org.springframework.web.bind.annotation.ExceptionHandler(CustomException.class)
    public ExceptionResponse customException(CustomException ex, WebRequest request) {
        return new ExceptionResponse(ex.getMessage(), ex.getMessage());
    }

    @org.springframework.web.bind.annotation.ExceptionHandler(Exception.class)
    public ExceptionResponse Exception(Exception ex, WebRequest request) {
        return new ExceptionResponse("Lỗi nội bộ", ex.getMessage());
    }

}
