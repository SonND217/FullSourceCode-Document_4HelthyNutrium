package com.example.be4healthynutrium.dto;

import com.example.be4healthynutrium.domain.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {

    private Long id;

    private String email;

    private String name;

    private String password;

    private String phone;

    private String address;

    private String dob;

    private Boolean gender;

    private Boolean status;

    private Role role;

}

