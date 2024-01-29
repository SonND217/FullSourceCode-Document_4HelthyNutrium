package com.example.be4healthynutrium.service;

import com.example.be4healthynutrium.domain.Role;
import com.example.be4healthynutrium.domain.User;
import com.example.be4healthynutrium.dto.UserDTO;
import com.example.be4healthynutrium.repository.RoleRepo;
import com.example.be4healthynutrium.repository.UserRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class RoleService {
    @Autowired
    RoleRepo roleRepo;

    public List<Role> getRegisterRoles(){
        return roleRepo.getRegisterRoles();
    }

}
