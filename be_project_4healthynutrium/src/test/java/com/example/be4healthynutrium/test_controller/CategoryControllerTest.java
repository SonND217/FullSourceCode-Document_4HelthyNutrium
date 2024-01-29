package com.example.be4healthynutrium.test_controller;

import com.example.be4healthynutrium.domain.Category;
import com.example.be4healthynutrium.repository.CategoryRepo;
import com.google.gson.Gson;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class CategoryControllerTest {
    @Autowired
    private WebApplicationContext webApplicationContext;

    @Autowired
    CategoryRepo categoryRepo;

    private MockMvc mvc;

    private Gson gson = new Gson();

    @BeforeEach
    private void init() {
        Category category = new Category();
        category.setCategoryName("cac loai gao");
        category.setCategoryStatus(true);

        Category category1 = new Category();
        category1.setCategoryName("cac loai gia vi");
        category1.setCategoryStatus(true);

        categoryRepo.save(category);
        categoryRepo.save(category1);

        mvc = MockMvcBuilders
                .webAppContextSetup(webApplicationContext)
                .apply(springSecurity())
                .build();
    }

    @Test
    @Transactional
    @WithMockUser(roles = "USER")
    @DisplayName("add category return status 403 with role user")
    void whenAddNewCategoryWithRoleUser_thenReturnStatus403() throws Exception {
        mvc.perform(get("/category").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());
    }

    @Test
    @Transactional
    @WithMockUser(roles = "ADMIN")
    @DisplayName("add category return status 403 with role admin")
    void whenAddNewCategoryWithRoleAdmin_thenReturnStatus403() throws Exception {
        mvc.perform(get("/category").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());
    }

    @Test
    @Transactional
    @WithMockUser(roles = "NUTRIENT_EXPERT")
    @DisplayName("add category return status 200 with role NUTRIENT_EXPERT")
    void whenAddNewCategoryWithRoleNutrient_Expert_thenReturnStatus200() throws Exception {
        mvc.perform(get("/category").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    @Transactional
    @WithMockUser(roles = "USER")
    @DisplayName("create category return status 403 with role User")
    void whenCreateCategoryWithRoleUser_thenReturnStatus403() throws Exception {
        Category category = new Category();
        category.setCategoryName("cac loai rau cu qua");
        category.setCategoryStatus(true);
        mvc.perform(post("/category")
                        .content(gson.toJson(category))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());
    }

    @Test
    @Transactional
    @WithMockUser(roles = "ADMIN")
    @DisplayName("create category return status 403 with role Admin")
    void whenCreateCategoryWithRoleAdmin_thenReturnStatus403() throws Exception {
        Category category = new Category();
        category.setCategoryName("cac loai rau cu qua");
        category.setCategoryStatus(true);
        mvc.perform(post("/category")
                        .content(gson.toJson(category))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());
    }

    @Test
    @Transactional
    @WithMockUser(roles = "NUTRIENT_EXPERT")
    @DisplayName("create category return status 200 with role Nutrient_Expert")
    void whenCreateCategoryWithRoleNutrient_Expert_thenReturnStatus200() throws Exception {
        Category category = new Category();
        category.setCategoryName("cac loai rau cu qua");
        category.setCategoryStatus(true);
        mvc.perform(post("/category")
                        .content(gson.toJson(category))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                        .andExpect(content().contentType("application/json"));
    }

    @Test
    @Transactional
    @WithMockUser(roles = "USER")
    @DisplayName("edit category return status 403 with role User")
    void whenEditCategoryWithRoleUser_thenReturnStatus403() throws Exception {
        Category category = new Category();
        category.setCategoryName("cac loai banh");
        category.setCategoryStatus(true);
        category.setId(25L);
        mvc.perform(put("/category/{id}", 25L)
                        .content(gson.toJson(category))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());
    }

    @Test
    @Transactional
    @WithMockUser(roles = "ADMIN")
    @DisplayName("edit category return status 403 with role Admin")
    void whenEditCategoryWithRoleAdmin_thenReturnStatus403() throws Exception {
        Category category = new Category();
        category.setCategoryName("cac loai banh");
        category.setCategoryStatus(true);
        category.setId(24L);
        mvc.perform(put("/category/{id}", 24L)
                        .content(gson.toJson(category))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());
    }

    @Test
    @Transactional
    @WithMockUser(roles = "NUTRIENT_EXPERT")
    @DisplayName("edit category return status 200 with role Nutrient_Expert")
    void whenEditCategoryWithRoleNutrient_Expert_thenReturnStatus200() throws Exception {
        Category category = new Category();
        category.setCategoryName("cac loai banh");
        category.setCategoryStatus(true);
        category.setId(25L);
        mvc.perform(put("/category/{id}", 25L)
                        .content(gson.toJson(category))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    @Transactional
    @WithMockUser(roles = "NUTRIENT_EXPERT")
    @DisplayName("edit category return status 500 with role Nutrient_Expert")
    void whenEditCategoryWithRoleNutrient_Expert_thenReturnStatus500() throws Exception {
        Category category = new Category();
        category.setCategoryName("cac loai banh");
        category.setCategoryStatus(true);
        category.setId(24L);
        mvc.perform(put("/category/{id}", 24L)
                        .content(gson.toJson(category))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().is5xxServerError());
    }

    @Test
    @Transactional
    @WithMockUser(roles = "ADMIN")
    @DisplayName("delete category status 403 with role ADMIN")
    void whenDeleteCategoryWithRoleAdmin_thenReturnStatus403() throws Exception {
        mvc.perform(delete("/category/{categoryID}", 24L)
                .contentType(MediaType.APPLICATION_JSON)).andExpect(status().isForbidden());
    }

    @Test
    @Transactional
    @WithMockUser(roles = "USER")
    @DisplayName("delete category status 403 with role USER")
    void whenDeleteCategoryWithRoleUSER_thenReturnStatus403() throws Exception {
        mvc.perform(delete("/category/{categoryID}", 24L)
                .contentType(MediaType.APPLICATION_JSON)).andExpect(status().isForbidden());
    }

    @Test
    @Transactional
    @WithMockUser(roles = "NUTRIENT_EXPERT")
    @DisplayName("delete category status 200 with role Nutrient_Expert")
    void whenDeleteCategoryWithRoleNutrient_Expert_thenReturnStatus200() throws Exception {
        mvc.perform(delete("/category/{categoryID}", 53L)
                .contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk());
    }

    @Test
    @Transactional
    @WithMockUser(roles = "NUTRIENT_EXPERT")
    @DisplayName("delete category status 500 with role Nutrient_Expert")
    void whenDeleteCategoryWithRoleNutrient_Expert_thenReturnStatus500() throws Exception {
        mvc.perform(delete("/category/{categoryID}", 53L)
                .contentType(MediaType.APPLICATION_JSON)).andExpect(status().is5xxServerError());
    }

}
