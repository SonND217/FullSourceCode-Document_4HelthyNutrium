package com.example.be4healthynutrium.test_controller;

import com.example.be4healthynutrium.domain.Ingredient;
import com.example.be4healthynutrium.domain.TabooFood;
import com.example.be4healthynutrium.repository.IngredientRepo;
import com.example.be4healthynutrium.repository.TabooFoodRepo;
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
public class TabooFoodControllerTest {

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Autowired
    private TabooFoodRepo tabooFoodRepo;

    @Autowired
    private IngredientRepo ingredientRepo;

    private MockMvc mvc;

    private Gson gson = new Gson();

    @BeforeEach
    private void init() {
        TabooFood tabooFood = new TabooFood();

        Ingredient ingredient = new Ingredient();
        ingredient.setId(223L);
        ingredientRepo.save(ingredient);
        tabooFood.setIngredient1(ingredient);

        Ingredient ingredient2 = new Ingredient();
        ingredient2.setId(224L);
        ingredientRepo.save(ingredient);
        tabooFood.setIngredient2(ingredient2);

        tabooFood.setDescription("Doc Hai");

        tabooFoodRepo.save(tabooFood);

        mvc = MockMvcBuilders
                .webAppContextSetup(webApplicationContext)
                .apply(springSecurity())
                .build();
    }

    @Test
    @Transactional
    @WithMockUser(roles = "USER")
    @DisplayName("add taboofood return status 403 with role user")
    void whenAddNewTaboofoodWithRoleUser_thenReturnStatus403() throws Exception {
        mvc.perform(get("/taboofood").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());
    }

    @Test
    @Transactional
    @WithMockUser(roles = "ADMIN")
    @DisplayName("add taboofood return status 403 with role admin")
    void whenAddNewTaboofoodWithRoleAdmin_thenReturnStatus403() throws Exception {
        mvc.perform(get("/taboofood").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());
    }

    @Test
    @Transactional
    @WithMockUser(roles = "NUTRIENT_EXPERT")
    @DisplayName("add taboofood return status 200 with role Nutrient_Expert")
    void whenAddNewTaboofoodWithRoleNutrient_Expert_thenReturnStatus200() throws Exception {
        mvc.perform(get("/taboofood").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    @Transactional
    @WithMockUser(roles = "USER")
    @DisplayName("create TabooFood return return status 403 with role User")
    void whenCreateTabooFoodWithRoleUser_thenReturnStatus403() throws Exception {
        TabooFood tabooFood = new TabooFood();
        Ingredient ingredient = new Ingredient();
        ingredient.setId(223L);
        tabooFood.setIngredient1(ingredient);
        Ingredient ingredient2 = new Ingredient();
        ingredient2.setId(224L);
        tabooFood.setIngredient2(ingredient2);
        tabooFood.setDescription("Doc Hai");
        mvc.perform(post("/taboofood")
                        .content(gson.toJson(tabooFood))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());
    }

    @Test
    @Transactional
    @WithMockUser(roles = "ADMIN")
    @DisplayName("create TabooFood return return status 403 with role Admin")
    void whenCreateTabooFoodWithRoleAdmin_thenReturnStatus403() throws Exception {
        TabooFood tabooFood = new TabooFood();
        Ingredient ingredient = new Ingredient();
        ingredient.setId(223L);
        tabooFood.setIngredient1(ingredient);
        Ingredient ingredient2 = new Ingredient();
        ingredient2.setId(224L);
        tabooFood.setIngredient2(ingredient2);
        tabooFood.setDescription("Doc Hai");
        mvc.perform(post("/taboofood")
                        .content(gson.toJson(tabooFood))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());
    }

    @Test
    @Transactional
    @WithMockUser(roles = "NUTRIENT_EXPERT")
    @DisplayName("create TabooFood return return status 500 with role Nutrient_Expert")
    void whenCreateTabooFoodWithRoleNutrient_Expert_thenReturnStatus500() throws Exception {
        TabooFood tabooFood = new TabooFood();
        tabooFood.setId(225L);
        Ingredient ingredient = new Ingredient();
        ingredient.setId(226L);
        tabooFood.setIngredient1(ingredient);
        Ingredient ingredient2 = new Ingredient();
        ingredient2.setId(227L);
        tabooFood.setIngredient2(ingredient2);
        tabooFood.setDescription("Doc Hai");
        mvc.perform(post("/taboofood")
                        .content(gson.toJson(tabooFood))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().is5xxServerError());
    }

    @Test
    @Transactional
    @WithMockUser(roles = "NUTRIENT_EXPERT")
    @DisplayName("create TabooFood return return status 200 with role Nutrient_Expert")
    void whenCreateTabooFoodWithRoleNutrient_Expert_thenReturnStatus200() throws Exception {
        TabooFood tabooFood = new TabooFood();
        Ingredient ingredient = new Ingredient();
        ingredient.setId(222L);
        tabooFood.setIngredient1(ingredient);
        Ingredient ingredient2 = new Ingredient();
        ingredient2.setId(223L);
        tabooFood.setIngredient2(ingredient2);
        tabooFood.setDescription("Doc Hai");
        mvc.perform(post("/taboofood")
                        .content(gson.toJson(tabooFood))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json"));;
    }

    @Test
    @Transactional
    @WithMockUser(roles = "USER")
    @DisplayName("edit taboofood return status 403 with role User")
    void whenEditTabooFoodWithRoleUser_thenReturnStatus403() throws Exception {
        TabooFood tabooFood = new TabooFood();
        Ingredient ingredient = new Ingredient();
        ingredient.setId(224L);
        tabooFood.setIngredient1(ingredient);
        Ingredient ingredient2 = new Ingredient();
        ingredient2.setId(116L);
        tabooFood.setIngredient2(ingredient2);
        tabooFood.setDescription("Doc Hai");
        mvc.perform(put("/taboofood/{id}", 18L)
                        .content(gson.toJson(tabooFood))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());
    }

    @Test
    @Transactional
    @WithMockUser(roles = "ADMIN")
    @DisplayName("edit taboofood return status 403 with role Admin")
    void whenEditTabooFoodWithRoleAdmin_thenReturnStatus403() throws Exception {
        TabooFood tabooFood = new TabooFood();
        Ingredient ingredient = new Ingredient();
        ingredient.setId(224L);
        tabooFood.setIngredient1(ingredient);
        Ingredient ingredient2 = new Ingredient();
        ingredient2.setId(116L);
        tabooFood.setIngredient2(ingredient2);
        tabooFood.setDescription("Doc Hai");
        mvc.perform(put("/taboofood/{id}", 18L)
                        .content(gson.toJson(tabooFood))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());
    }

    @Test
    @Transactional
    @WithMockUser(roles = "NUTRIENT_EXPERT")
    @DisplayName("edit taboofood return status 200 with role Nutrient_Expert")
    void whenEditTabooFoodWithRoleNutrient_Expert_thenReturnStatus200() throws Exception {
        TabooFood tabooFood = new TabooFood();
        Ingredient ingredient = new Ingredient();
        ingredient.setId(224L);
        tabooFood.setIngredient1(ingredient);
        Ingredient ingredient2 = new Ingredient();
        ingredient2.setId(116L);
        tabooFood.setIngredient2(ingredient2);
        tabooFood.setDescription("Doc Hai");
        mvc.perform(put("/taboofood/{id}", 18L)
                        .content(gson.toJson(tabooFood))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    @Transactional
    @WithMockUser(roles = "ADMIN")
    @DisplayName("delete taboofood status 403 with role ADMIN")
    void whenDeleteTabooFoodWithRoleAdmin_thenReturnStatus403() throws Exception {
        mvc.perform(delete("/taboofood/{id}", 18L)
                .contentType(MediaType.APPLICATION_JSON)).andExpect(status().isForbidden());
    }

    @Test
    @Transactional
    @WithMockUser(roles = "USER")
    @DisplayName("delete taboofood status 403 with role User")
    void whenDeleteTabooFoodWithRoleUser_thenReturnStatus403() throws Exception {
        mvc.perform(delete("/taboofood/{id}", 18L)
                .contentType(MediaType.APPLICATION_JSON)).andExpect(status().isForbidden());
    }

    @Test
    @Transactional
    @WithMockUser(roles = "NUTRIENT_EXPERT")
    @DisplayName("delete taboofood status 200 with role Nutrient_Expert")
    void whenDeleteTabooFoodWithRoleNutrient_Expert_thenReturnStatus200() throws Exception {
        mvc.perform(delete("/taboofood/{id}", 18L)
                .contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk());
    }

    @Test
    @Transactional
    @WithMockUser(roles = "NUTRIENT_EXPERT")
    @DisplayName("delete taboofood status 201 with role Nutrient_Expert")
    void whenDeleteTabooFoodWithRoleNutrient_Expert_thenReturnStatus500() throws Exception {
        mvc.perform(delete("/ingredient/{id}", 19L)
                .contentType(MediaType.APPLICATION_JSON)).andExpect(status().is2xxSuccessful());
    }
}
