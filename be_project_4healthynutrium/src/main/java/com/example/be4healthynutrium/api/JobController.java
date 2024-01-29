package com.example.be4healthynutrium.api;

import com.example.be4healthynutrium.domain.Category;
import com.example.be4healthynutrium.service.CategoryService;
import com.example.be4healthynutrium.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/job")
public class JobController {
    @Autowired
    JobService jobService;

    @GetMapping(value = "")
    public ResponseEntity<?> getAll() {
        return new ResponseEntity(jobService.getAll(), HttpStatus.OK);
    }

}
