package com.example.be4healthynutrium.api;

import com.example.be4healthynutrium.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
@RequestMapping("/role")
public class RoleController {

    @Autowired
    RoleService roleService;

    @GetMapping(value = "")
    public ResponseEntity<?> getRegisterRoles() {
            return new ResponseEntity(roleService.getRegisterRoles(), HttpStatus.OK);
    }

}
