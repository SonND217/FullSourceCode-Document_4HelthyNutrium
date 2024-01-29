package com.example.be4healthynutrium.test_controller;

import com.example.be4healthynutrium.domain.*;
import com.example.be4healthynutrium.dto.IngredientMass;
import com.example.be4healthynutrium.repository.*;
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
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class FoodControllerTest {
    @Autowired
    private WebApplicationContext webApplicationContext;

    @Autowired
    private FoodRepo foodRepo;

    @Autowired
    private FoodDetailRepo detailRepo;

    @Autowired
    private IngredientRepo ingredientRepo;

    @Autowired
    private MealRepo mealRepo;

    @Autowired
    private SeasonRepo seasonRepo;

    private MockMvc mvc;

    private Gson gson = new Gson();

    @BeforeEach
    private void init() {
        Food food = new Food();
        food.setId(1L);
        food.setFoodName("com thit soi");
        food.setImg("333");
        food.setCategory(new Category(1L,"com",true));
        food.setRecipe("Ngon");
        food.setFat(34);
        food.setProtein(3);
        food.setCarb(2);
        food.setCalo(3);

        IngredientMass ingredientMass = new IngredientMass();
        ingredientMass.setIngredient(new Ingredient(1L, "que", 0, 2, "1", 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, new ArrayList<>()));
        ingredientMass.setMass(1);

        FoodDetail foodDetail = new FoodDetail();
        foodDetail.setFood(food);
        foodDetail.setIngredient(ingredientMass.getIngredient());
        foodDetail.setMass(ingredientMass.getMass());
        detailRepo.save(foodDetail);

        Meal meal = new Meal();
        meal.setId(1L);
        meal.setMealName("Bua sang");
        mealRepo.save(meal);
        food.setMeals(new ArrayList<>());

        Season season = new Season();
        season.setId(1L);
        season.setSeasonName("Spring");
        seasonRepo.save(season);
        food.setSeasons(new ArrayList<>());

        foodRepo.save(food);

        mvc = MockMvcBuilders
                .webAppContextSetup(webApplicationContext)
                .apply(springSecurity())
                .build();
    }

    @Test
    @Transactional
    @WithMockUser(roles = "USER")
    @DisplayName("add food return status 403 with role user")
    void whenAddNewFoodWithRoleUser_thenReturnStatus403() throws Exception {
        mvc.perform(get("/food").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());
    }

    @Test
    @Transactional
    @WithMockUser(roles = "ADMIN")
    @DisplayName("add food return status 403 with role admin")
    void whenAddNewFoodWithRoleAdmin_thenReturnStatus403() throws Exception {
        mvc.perform(get("/food").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());
    }

    @Test
    @Transactional
    @WithMockUser(roles = "NUTRIENT_EXPERT")
    @DisplayName("add food return status 200 with role Nutrient_Expert")
    void whenAddNewFoodWithRoleNutrient_Expert_thenReturnStatus200() throws Exception {
        mvc.perform(get("/food").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    @Transactional
    @WithMockUser(roles = "USER")
    @DisplayName("create Food return return status 403 with role User")
    void whenCreateFoodWithRoleUser_thenReturnStatus403() throws Exception {
        Food food = new Food();
        food.setFoodName("com hai san");
        food.setImg("333.jpg");
        food.setCategory(new Category(1L,"com",true));
        food.setRecipe("Ngon");
        food.setFat(34);
        food.setProtein(3);
        food.setCarb(2);
        food.setCalo(3);
        mvc.perform(post("/food")
                        .content(gson.toJson(food))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());
    }

    @Test
    @Transactional
    @WithMockUser(roles = "ADMIN")
    @DisplayName("create Food return return status 403 with role Admin")
    void whenCreateFoodWithRoleAdmin_thenReturnStatus403() throws Exception {
        Food food = new Food();
        food.setFoodName("com hai san");
        food.setImg("333.jpg");
        food.setCategory(new Category(1L,"com",true));
        food.setRecipe("Ngon");
        food.setFat(34);
        food.setProtein(3);
        food.setCarb(2);
        food.setCalo(3);
        mvc.perform(post("/food")
                        .content(gson.toJson(food))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());
    }

    @Test
    @Transactional
    @WithMockUser(roles = "NUTRIENT_EXPERT")
    @DisplayName("create Food return return status 500 with role Nutrient_Expert")
    void whenCreateFoodWithRoleNutrient_Expert_thenReturnStatus500() throws Exception {
        Food food = new Food();
        food.setFoodName("chả lá lốt");
        food.setCategory(new Category(1L,"com",true));
        food.setImg("333");
        food.setRecipe("Ngon");
        food.setFat(34);
        food.setProtein(3);
        food.setCarb(2);
        food.setCalo(3);

        FoodDetail foodDetail = new FoodDetail();
        IngredientMass ingredientMass = new IngredientMass();
        ingredientMass.setIngredient(new Ingredient(1L, "que", 0, 2, "1", 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, new ArrayList<>()));
        ingredientMass.setMass(1);
        foodDetail.setFood(food);
        foodDetail.setIngredient(ingredientMass.getIngredient());
        foodDetail.setMass(ingredientMass.getMass());


        Meal meal = new Meal();
        meal.setId(1L);
        meal.setMealName("Bữa sáng");
        food.setMeals(new ArrayList<>());

        Season season = new Season();
        season.setId(1L);
        season.setSeasonName("Spring");
        food.setSeasons(new ArrayList<>());

        mvc.perform(post("/food")
                        .content(gson.toJson(food))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().is5xxServerError());
    }

    @Test
    @Transactional
    @WithMockUser(roles = "USER")
    @DisplayName("edit food return status 403 with role User")
    void whenEditFoodWithRoleUser_thenReturnStatus403() throws Exception {
        Food food = new Food();
        food.setFoodName("chả lá lốt");
        food.setCategory(new Category(1L,"com",true));
        food.setImg("333");
        food.setRecipe("Ngon");
        food.setFat(34);
        food.setProtein(3);
        food.setCarb(2);
        food.setCalo(3);

        FoodDetail foodDetail = new FoodDetail();
        IngredientMass ingredientMass = new IngredientMass();
        ingredientMass.setIngredient(new Ingredient(1L, "que", 0, 2, "1", 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, new ArrayList<>()));
        ingredientMass.setMass(1);
        foodDetail.setFood(food);
        foodDetail.setIngredient(ingredientMass.getIngredient());
        foodDetail.setMass(ingredientMass.getMass());


        Meal meal = new Meal();
        meal.setId(1L);
        meal.setMealName("Bữa sáng");
        food.setMeals(new ArrayList<>());

        Season season = new Season();
        season.setId(1L);
        season.setSeasonName("Spring");
        food.setSeasons(new ArrayList<>());

        mvc.perform(put("/food/{id}", 100L)
                        .content(gson.toJson(food))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());
    }

    @Test
    @Transactional
    @WithMockUser(roles = "ADMIN")
    @DisplayName("edit food return status 403 with role Admin")
    void whenEditFoodWithRoleAdmin_thenReturnStatus403() throws Exception {
        Food food = new Food();
        food.setFoodName("chả lá lốt");
        food.setCategory(new Category(1L,"com",true));
        food.setImg("333");
        food.setRecipe("Ngon");
        food.setFat(34);
        food.setProtein(3);
        food.setCarb(2);
        food.setCalo(3);

        FoodDetail foodDetail = new FoodDetail();
        IngredientMass ingredientMass = new IngredientMass();
        ingredientMass.setIngredient(new Ingredient(1L, "que", 0, 2, "1", 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, new ArrayList<>()));
        ingredientMass.setMass(1);
        foodDetail.setFood(food);
        foodDetail.setIngredient(ingredientMass.getIngredient());
        foodDetail.setMass(ingredientMass.getMass());


        Meal meal = new Meal();
        meal.setId(1L);
        meal.setMealName("Bữa sáng");
        food.setMeals(new ArrayList<>());

        Season season = new Season();
        season.setId(1L);
        season.setSeasonName("Spring");
        food.setSeasons(new ArrayList<>());
        mvc.perform(put("/food/{id}", 100L)
                        .content(gson.toJson(food))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());
    }

    @Test
    @Transactional
    @WithMockUser(roles = "NUTRIENT_EXPERT")
    @DisplayName("edit food return status 500 with role Nutrient_Expert")
    void whenEditFoodWithRoleNutrient_Expert_thenReturnStatus500() throws Exception {
        Food food = new Food();
        food.setFoodName("chả lá lốt");
        food.setCategory(new Category(1L,"com",true));
        food.setImg("333");
        food.setRecipe("Ngon");
        food.setFat(34);
        food.setProtein(3);
        food.setCarb(2);
        food.setCalo(3);

        FoodDetail foodDetail = new FoodDetail();
        IngredientMass ingredientMass = new IngredientMass();
        ingredientMass.setIngredient(new Ingredient(1L, "que", 0, 2, "1", 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, new ArrayList<>()));
        ingredientMass.setMass(1);
        foodDetail.setFood(food);
        foodDetail.setIngredient(ingredientMass.getIngredient());
        foodDetail.setMass(ingredientMass.getMass());


        Meal meal = new Meal();
        meal.setId(1L);
        meal.setMealName("Bữa sáng");
        food.setMeals(new ArrayList<>());

        Season season = new Season();
        season.setId(1L);
        season.setSeasonName("Spring");
        food.setSeasons(new ArrayList<>());
        mvc.perform(put("/food/{id}", 100L)
                        .content(gson.toJson(food))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().is5xxServerError());
    }

    @Test
    @Transactional
    @WithMockUser(roles = "ADMIN")
    @DisplayName("delete food status 403 with role ADMIN")
    void whenDeleteFoodWithRoleAdmin_thenReturnStatus403() throws Exception {
        mvc.perform(delete("/food/{id}", 100L)
                .contentType(MediaType.APPLICATION_JSON)).andExpect(status().isForbidden());
    }

    @Test
    @Transactional
    @WithMockUser(roles = "USER")
    @DisplayName("delete food status 403 with role User")
    void whenDeleteFoodWithRoleUser_thenReturnStatus403() throws Exception {
        mvc.perform(delete("/food/{id}", 100L)
                .contentType(MediaType.APPLICATION_JSON)).andExpect(status().isForbidden());
    }

    @Test
    @Transactional
    @WithMockUser(roles = "NUTRIENT_EXPERT")
    @DisplayName("delete food status 200 with role Nutrient_Expert")
    void whenDeleteFoodWithRoleNutrient_Expert_thenReturnStatus200() throws Exception {
        mvc.perform(delete("/food/{id}", 100L)
                .contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk());
    }

    @Test
    @Transactional
    @WithMockUser(roles = "NUTRIENT_EXPERT")
    @DisplayName("delete food status 201 with role Nutrient_Expert")
    void whenDeleteFoodWithRoleNutrient_Expert_thenReturnStatus201() throws Exception {
        mvc.perform(delete("/ingredient/{id}", 101L)
                .contentType(MediaType.APPLICATION_JSON)).andExpect(status().is2xxSuccessful());
    }
}
