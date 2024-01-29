package com.example.be4healthynutrium.api;

import com.example.be4healthynutrium.dto.DietaryInfoDTO;
import com.example.be4healthynutrium.dto.QuizDTO;
import com.example.be4healthynutrium.service.DietaryInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@Controller
@RequestMapping("/diet")
public class DietaryInfoController {
    @Autowired
    DietaryInfoService dietaryInfoService;

    @GetMapping(value = "/{id}")
    public ResponseEntity<?> getLastDiet(@PathVariable("id") String idParam) {
        long id = Long.parseLong(idParam);
        return new ResponseEntity(dietaryInfoService.getByUserID(id), HttpStatus.OK);
    }

    @PostMapping("/options")
    public ResponseEntity<?> getDietOptions(@RequestBody QuizDTO quizDTO) throws IOException {
        return new ResponseEntity<>(dietaryInfoService.getDiet(quizDTO), HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<?> save(@RequestBody DietaryInfoDTO dietaryInfoDTO) throws IOException {
        dietaryInfoService.saveDiet(dietaryInfoDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
