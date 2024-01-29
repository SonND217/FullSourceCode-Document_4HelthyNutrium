package com.example.be4healthynutrium.dto;

import com.example.be4healthynutrium.domain.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuizDTO {

    private User user;
    private Double height;
    private Double weight;
    private Job job;
    private List<Category> categories;
    private List<Integer> counts;

}
