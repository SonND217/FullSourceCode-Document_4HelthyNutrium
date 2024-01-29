package com.example.be4healthynutrium.api;

import com.example.be4healthynutrium.service.CoefficientMotionService;
import com.example.be4healthynutrium.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("/coefficientMotion")
public class CoefficientMotionController {

    @Autowired
    CoefficientMotionService coefficientMotionService;

    @GetMapping(value = "")
    public ResponseEntity<?> getAll() {
            return new ResponseEntity(coefficientMotionService.getAll(), HttpStatus.OK);
    }

}
