package com.example.be4healthynutrium.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ExceptionResponse {

    boolean isSuccess = false;
    String message;
    String errorDetail;

    public ExceptionResponse(String message, String detail){
        this.message = message;
        this.errorDetail = detail;
    }

}
