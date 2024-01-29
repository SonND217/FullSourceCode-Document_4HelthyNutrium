package com.example.be4healthynutrium.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class FailLoginResponse {

    private String message;

    private String status;
}

