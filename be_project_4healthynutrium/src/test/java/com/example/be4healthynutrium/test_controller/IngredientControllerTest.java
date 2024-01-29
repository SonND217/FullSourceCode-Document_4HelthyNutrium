package com.example.be4healthynutrium.test_controller;

import com.example.be4healthynutrium.domain.Ingredient;
import com.example.be4healthynutrium.domain.Season;
import com.example.be4healthynutrium.repository.IngredientRepo;
import com.example.be4healthynutrium.repository.SeasonRepo;
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

import java.util.ArrayList;

import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class IngredientControllerTest {
    @Autowired
    private WebApplicationContext webApplicationContext;

    @Autowired
    IngredientRepo ingredientRepo;

    @Autowired
    SeasonRepo seasonRepo;

    private MockMvc mvc;

    private Gson gson = new Gson();

    @BeforeEach
    private void init() {
        Ingredient ingredient = new Ingredient();
        ingredient.setIngredientName("que");
        ingredient.setMinLimit(0);
        ingredient.setMaxLimit(2);
        ingredient.setImg("1");
        ingredient.setCalo(1);
        ingredient.setFat(1);
        ingredient.setProtein(1);
        ingredient.setCarb(1);
        ingredient.setWater(1);
        ingredient.setFiber(1);
        ingredient.setAsh(1);
        ingredient.setCanxi(1);
        ingredient.setIron(1);
        ingredient.setZinc(1);
        ingredient.setVitaminC(1);
        ingredient.setVitaminB1(1);
        ingredient.setVitaminB2(1);
        ingredient.setVitaminB3(1);
        ingredient.setVitaminB6A(1);
        ingredient.setVitaminD(1);
        ingredient.setVitaminB12(1);
        ingredient.setVitaminA(1);
        ingredient.setVitaminARae(1);

        Season season = new Season();
        season.setId(1L);
        season.setSeasonName("Spring");
        seasonRepo.save(season);

        ingredient.setSeasons(new ArrayList<>());
        ingredientRepo.save(ingredient);



        mvc = MockMvcBuilders
                .webAppContextSetup(webApplicationContext)
                .apply(springSecurity())
                .build();
    }

    @Test
    @Transactional
    @WithMockUser(roles = "USER")
    @DisplayName("add ingredient return status 403 with role user")
    void whenAddNewIngredientWithRoleUser_thenReturnStatus403() throws Exception {
        mvc.perform(get("/ingredient").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());
    }

    @Test
    @Transactional
    @WithMockUser(roles = "ADMIN")
    @DisplayName("add ingredient return status 403 with role admin")
    void whenAddNewIngredientWithRoleAdmin_thenReturnStatus403() throws Exception {
        mvc.perform(get("/ingredient").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());
    }

    @Test
    @Transactional
    @WithMockUser(roles = "NUTRIENT_EXPERT")
    @DisplayName("add ingredient return status 200 with role Nutrient_expert")
    void whenAddNewIngredientWithRoleNutrient_Expert_thenReturnStatus200() throws Exception {
        mvc.perform(get("/ingredient").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    @Transactional
    @WithMockUser(roles = "USER")
    @DisplayName("create Ingredient return status 403 with role User")
    void whenCreateIngredientWithRoleUser_thenReturnStatus403() throws Exception {
        Ingredient ingredient = new Ingredient();
        ingredient.setIngredientName("que");
        ingredient.setMinLimit(0);
        ingredient.setMaxLimit(2);
        ingredient.setImg("1");
        ingredient.setCalo(1);
        ingredient.setFat(1);
        ingredient.setProtein(1);
        ingredient.setCarb(1);
        ingredient.setWater(1);
        ingredient.setFiber(1);
        ingredient.setAsh(1);
        ingredient.setCanxi(1);
        ingredient.setIron(1);
        ingredient.setZinc(1);
        ingredient.setVitaminC(1);
        ingredient.setVitaminB1(1);
        ingredient.setVitaminB2(1);
        ingredient.setVitaminB3(1);
        ingredient.setVitaminB6A(1);
        ingredient.setVitaminD(1);
        ingredient.setVitaminB12(1);
        ingredient.setVitaminA(1);
        ingredient.setVitaminARae(1);
        ingredient.setSeasons(new ArrayList<>());
        mvc.perform(post("/ingredient")
                        .content(gson.toJson(ingredient))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());
    }

    @Test
    @Transactional
    @WithMockUser(roles = "ADMIN")
    @DisplayName("create Ingredient return status 403 with role Admin")
    void whenCreateIngredientWithRoleAdmin_thenReturnStatus403() throws Exception {
        Ingredient ingredient = new Ingredient();
        ingredient.setIngredientName("que");
        ingredient.setMinLimit(0);
        ingredient.setMaxLimit(2);
        ingredient.setImg("1");
        ingredient.setCalo(1);
        ingredient.setFat(1);
        ingredient.setProtein(1);
        ingredient.setCarb(1);
        ingredient.setWater(1);
        ingredient.setFiber(1);
        ingredient.setAsh(1);
        ingredient.setCanxi(1);
        ingredient.setIron(1);
        ingredient.setZinc(1);
        ingredient.setVitaminC(1);
        ingredient.setVitaminB1(1);
        ingredient.setVitaminB2(1);
        ingredient.setVitaminB3(1);
        ingredient.setVitaminB6A(1);
        ingredient.setVitaminD(1);
        ingredient.setVitaminB12(1);
        ingredient.setVitaminA(1);
        ingredient.setVitaminARae(1);
        ingredient.setSeasons(new ArrayList<>());
        mvc.perform(post("/ingredient")
                        .content(gson.toJson(ingredient))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());
    }

    @Test
    @Transactional
    @WithMockUser(roles = "NUTRIENT_EXPERT")
    @DisplayName("create Ingredient return status 200 with role Nutrient_Expert")
    void whenCreateIngredientWithRoleNutrient_Expert_thenReturnStatus200() throws Exception {
        Ingredient ingredient = new Ingredient();
        ingredient.setIngredientName("que");
        ingredient.setMinLimit(0);
        ingredient.setMaxLimit(2);
        ingredient.setImg("1");
        ingredient.setCalo(1);
        ingredient.setFat(1);
        ingredient.setProtein(1);
        ingredient.setCarb(1);
        ingredient.setWater(1);
        ingredient.setFiber(1);
        ingredient.setAsh(1);
        ingredient.setCanxi(1);
        ingredient.setIron(1);
        ingredient.setZinc(1);
        ingredient.setVitaminC(1);
        ingredient.setVitaminB1(1);
        ingredient.setVitaminB2(1);
        ingredient.setVitaminB3(1);
        ingredient.setVitaminB6A(1);
        ingredient.setVitaminD(1);
        ingredient.setVitaminB12(1);
        ingredient.setVitaminA(1);
        ingredient.setVitaminARae(1);
        Season season = new Season();
        season.setId(1L);
        season.setSeasonName("Spring");
        ingredient.setSeasons(new ArrayList<>());
        mvc.perform(post("/ingredient")
                        .content(gson.toJson(ingredient))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json"));
    }

    @Test
    @Transactional
    @WithMockUser(roles = "USER")
    @DisplayName("edit ingredient return status 403 with role User")
    void whenEditIngredientWithRoleUser_thenReturnStatus403() throws Exception {
        Ingredient ingredient = new Ingredient();
        ingredient.setIngredientName("cui");
        ingredient.setMinLimit(0);
        ingredient.setMaxLimit(2);
        ingredient.setImg("1");
        ingredient.setCalo(2);
        ingredient.setFat(2);
        ingredient.setProtein(2);
        ingredient.setCarb(2);
        ingredient.setWater(2);
        ingredient.setFiber(2);
        ingredient.setAsh(2);
        ingredient.setCanxi(2);
        ingredient.setIron(2);
        ingredient.setZinc(2);
        ingredient.setVitaminC(2);
        ingredient.setVitaminB1(2);
        ingredient.setVitaminB2(2);
        ingredient.setVitaminB3(2);
        ingredient.setVitaminB6A(2);
        ingredient.setVitaminD(2);
        ingredient.setVitaminB12(2);
        ingredient.setVitaminA(2);
        ingredient.setVitaminARae(2);
        Season season = new Season();
        season.setId(2L);
        season.setSeasonName("Summer");
        ingredient.setId(225L);
        mvc.perform(put("/ingredient/{id}", 225L)
                        .content(gson.toJson(ingredient))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());
    }

    @Test
    @Transactional
    @WithMockUser(roles = "ADMIN")
    @DisplayName("edit ingredient return status 403 with role Admin")
    void whenEditIngredientWithRoleAdmin_thenReturnStatus403() throws Exception {
        Ingredient ingredient = new Ingredient();
        ingredient.setIngredientName("cui");
        ingredient.setMinLimit(0);
        ingredient.setMaxLimit(2);
        ingredient.setImg("1");
        ingredient.setCalo(2);
        ingredient.setFat(2);
        ingredient.setProtein(2);
        ingredient.setCarb(2);
        ingredient.setWater(2);
        ingredient.setFiber(2);
        ingredient.setAsh(2);
        ingredient.setCanxi(2);
        ingredient.setIron(2);
        ingredient.setZinc(2);
        ingredient.setVitaminC(2);
        ingredient.setVitaminB1(2);
        ingredient.setVitaminB2(2);
        ingredient.setVitaminB3(2);
        ingredient.setVitaminB6A(2);
        ingredient.setVitaminD(2);
        ingredient.setVitaminB12(2);
        ingredient.setVitaminA(2);
        ingredient.setVitaminARae(2);
        Season season = new Season();
        season.setId(2L);
        season.setSeasonName("Summer");
        ingredient.setId(225L);
        mvc.perform(put("/ingredient/{id}", 225L)
                        .content(gson.toJson(ingredient))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());
    }

    @Test
    @Transactional
    @WithMockUser(roles = "NUNTRIENT_EXPERT")
    @DisplayName("edit ingredient return status 200 with role Nutrient_Expert")
    void whenEditIngredientWithRoleNutrient_Expert_thenReturnStatus200() throws Exception {
        Ingredient ingredient = new Ingredient();
        ingredient.setIngredientName("cui");
        ingredient.setMinLimit(0);
        ingredient.setMaxLimit(2);
        ingredient.setImg("1");
        ingredient.setCalo(2);
        ingredient.setFat(2);
        ingredient.setProtein(2);
        ingredient.setCarb(2);
        ingredient.setWater(2);
        ingredient.setFiber(2);
        ingredient.setAsh(2);
        ingredient.setCanxi(2);
        ingredient.setIron(2);
        ingredient.setZinc(2);
        ingredient.setVitaminC(2);
        ingredient.setVitaminB1(2);
        ingredient.setVitaminB2(2);
        ingredient.setVitaminB3(2);
        ingredient.setVitaminB6A(2);
        ingredient.setVitaminD(2);
        ingredient.setVitaminB12(2);
        ingredient.setVitaminA(2);
        ingredient.setVitaminARae(2);
        Season season = new Season();
        season.setId(2L);
        season.setSeasonName("Summer");
        ingredient.setId(224L);
        mvc.perform(put("/ingredient/{id}", 224L)
                        .content(gson.toJson(ingredient))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    @Transactional
    @WithMockUser(roles = "ADMIN")
    @DisplayName("delete ingredient status 403 with role ADMIN")
    void whenDeleteIngredientWithRoleAdmin_thenReturnStatus403() throws Exception {
        mvc.perform(delete("/ingredient/{id}", 224L)
                .contentType(MediaType.APPLICATION_JSON)).andExpect(status().isForbidden());
    }

    @Test
    @Transactional
    @WithMockUser(roles = "USER")
    @DisplayName("delete ingredient status 403 with role USER")
    void whenDeleteIngredientWithRoleUser_thenReturnStatus403() throws Exception {
        mvc.perform(delete("/ingredient/{id}", 224L)
                .contentType(MediaType.APPLICATION_JSON)).andExpect(status().isForbidden());
    }

    @Test
    @Transactional
    @WithMockUser(roles = "NUTRIENT_EXPERT")
    @DisplayName("delete ingredient status 200 with role Nutrient_Expert")
    void whenDeleteIngredientWithRoleNutrient_Expert_thenReturnStatus200() throws Exception {
        mvc.perform(delete("/ingredient/{id}", 224L)
                .contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk());
    }

    @Test
    @Transactional
    @WithMockUser(roles = "NUTRIENT_EXPERT")
    @DisplayName("delete ingredient status 500 with role Nutrient_Expert")
    void whenDeleteIngredientWithRoleNutrient_Expert_thenReturnStatus500() throws Exception {
        mvc.perform(delete("/ingredient/{id}", 225L)
                .contentType(MediaType.APPLICATION_JSON)).andExpect(status().is5xxServerError());
    }
}
