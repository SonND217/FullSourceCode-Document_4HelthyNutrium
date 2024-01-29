package com.example.be4healthynutrium.test_controller;

import com.example.be4healthynutrium.domain.Role;
import com.example.be4healthynutrium.domain.User;
import com.example.be4healthynutrium.repository.UserRepo;
import com.google.gson.Gson;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class UserControllerTest {

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Autowired
    private UserRepo userRepo;

    private MockMvc mvc;

    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    private Gson gson = new Gson();

    @BeforeEach
    private void init() {
        User user1 = new User();
        user1.setEmail("long123@gmail.com");
        user1.setPassword(bCryptPasswordEncoder.encode("long1234"));
        user1.setName("long");
        user1.setAddress("hanoi");
        user1.setDob("2000-09-14");
        user1.setPhone("0324932493");
        user1.setGender(true);
        user1.setStatus(true);
        user1.setRole(new Role(1L, "USER"));

        User user2 = new User();
        user2.setEmail("viet123@gmail.com");
        user2.setPassword(bCryptPasswordEncoder.encode("long2345"));
        user2.setName("viet");
        user2.setAddress("hanoi");
        user2.setDob("2000-10-14");
        user2.setPhone("034536364535");
        user2.setGender(false);
        user2.setStatus(true);
        user2.setRole(new Role(1L, "USER"));
        userRepo.save(user1);
        userRepo.save(user2);

        Role role = new Role();
        role.setId(1L);
        role.setName("USER");
        mvc = MockMvcBuilders
                .webAppContextSetup(webApplicationContext)
                .apply(springSecurity())
                .build();
    }

//    @Test
//    @Transactional
//    @WithMockUser(roles = "ADMIN")
//    @DisplayName("add user return status 200")
//    void whenCreateNewUserWithRoleAdmin_thenReturnStatus200() throws Exception {
//        mvc.perform(get("/user").contentType(MediaType.APPLICATION_JSON))
//                .andExpect(status().isOk());
//    }

    @Test
    @Transactional
    @WithMockUser(roles = "USER")
    @DisplayName("add user return status 403 with role user")
    void whenCreateNewUserWithRoleUser_thenReturnStatus200() throws Exception {
        mvc.perform(get("/user").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

//    @Test
//    @Transactional
//    @WithMockUser(roles = "ADMIN")
//    @DisplayName("create nutrient-expert return status 200 with role admin")
//    void whenCreateNutrient_ExpertWithRoleAdmin_thenReturnStatus200() throws Exception {
//        User user = new User();
//        user.setEmail("son7686@gmail.com");
//        user.setPassword(bCryptPasswordEncoder.encode("son1234"));
//        user.setName("son");
//        user.setAddress("hanoi");
//        user.setDob("2000-07-20");
//        user.setPhone("0123456789");
//        user.setGender(true);
//        user.setStatus(true);
//        user.setRole(new Role(3L, "NUTRIENT_EXPERT"));
//        mvc.perform(post("/user/nutrient-expert")
//                        .content(gson.toJson(user))
//                        .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(status().isForbidden())
//                .andExpect(content().contentType("application/json"));
//    }

    @Test
    @Transactional
    @WithMockUser(roles = "USER")
    @DisplayName("create nutrient-expert return status 403 with role user")
    void whenCreateNutrient_ExpertWithRoleUser_thenReturnStatus403() throws Exception {
        User user = new User();
        user.setEmail("son7686@gmail.com");
        user.setPassword(bCryptPasswordEncoder.encode("son1234"));
        user.setName("son");
        user.setAddress("hanoi");
        user.setDob("2000-07-20");
        user.setPhone("0234181283");
        user.setGender(true);
        user.setStatus(true);
        //user.setRole(new Role(3L, "NUTRIENT_EXPERT"));
        mvc.perform(post("/user/nutrient-expert")
                        .content(gson.toJson(user))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());
    }

//    @Test
//    @Transactional
//    @WithMockUser(roles = "USER")
//    @DisplayName("edit user return status 200")
//    void whenEditUserWithRoleUser_thenReturnStatus200() throws Exception {
//        User user = new User();
//        user.setEmail("long123@gmail.com");
//        user.setPassword(bCryptPasswordEncoder.encode("son1234"));
//        user.setName("son");
//        user.setAddress("hanoi");
//        user.setDob("2000-09-14");
//        user.setPhone("0234181283");
//        user.setGender(true);
//        user.setStatus(true);
//        user.setId(114L);
//        mvc.perform(put("/user/{userID}",114L)
//                        .content(gson.toJson(user))
//                        .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(status().isOk());
//    }

//    @Test
//    @Transactional
//    @WithMockUser(roles = "ADMIN")
//    @DisplayName("edit admin return status 403")
//    void whenEditUserWithRoleAdmin_thenReturnStatus200() throws Exception {
//        User user = new User();
//        user.setEmail("long123@gmail.com");
//        user.setPassword(bCryptPasswordEncoder.encode("6532"));
//        user.setName("son");
//        user.setAddress("hanoi");
//        user.setDob("2000-09-14");
//        user.setPhone("0234181283");
//        user.setGender(true);
//        user.setStatus(true);
//        user.setId(114L);
//        mvc.perform(put("/user/{userID}",114L)
//                        .content(gson.toJson(user))
//                        .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(status().isForbidden());
//    }

    @Test
    @Transactional
    @WithMockUser(roles = "NUTRIENT_EXPERT")
    @DisplayName("edit nutrient_expert return status 403")
    void whenEditUserWithRoleNutrient_Expert_thenReturnStatus200() throws Exception {
        User user = new User();
        user.setEmail("viet1410@gmail.com");
        user.setPassword(bCryptPasswordEncoder.encode("son1234"));
        user.setName("son");
        user.setAddress("hanoi");
        user.setDob("2000-09-14");
        user.setPhone("0234181283");
        user.setGender(true);
        user.setStatus(true);
        user.setId(125L);
        mvc.perform(put("/user/{userID}",125L)
                        .content(gson.toJson(user))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().is5xxServerError());
    }

    @Test
    @Transactional
    @WithMockUser(roles = "NUTRIENT_EXPERT")
    @DisplayName("delete status 403 with role Nutrient_expert")
    void whenDeleteUserWithRoleNutrient_Expert_thenReturnStatus403() throws Exception {
        mvc.perform(delete("/user/{userID}", 115L)
                .contentType(MediaType.APPLICATION_JSON)).andExpect(status().isForbidden());
    }

    @Test
    @Transactional
    @WithMockUser(roles = "USER")
    @DisplayName("delete status 403 with role User")
    void whenDeleteUserWithRoleUser_thenReturnStatus403() throws Exception {
        mvc.perform(delete("/user/{userID}", 115L)
                .contentType(MediaType.APPLICATION_JSON)).andExpect(status().isForbidden());
    }

    @Test
    @Transactional
    @WithMockUser(roles = "ADMIN")
    @DisplayName("delete status 200 with role Admin")
    void whenDeleteUserWithRoleAdmin_thenReturnStatus200() throws Exception {
        mvc.perform(delete("/user/{userID}", 115L)
                .contentType(MediaType.APPLICATION_JSON)).andExpect(status().isForbidden());
    }

    @Test
    @Transactional
    @WithMockUser(roles = "ADMIN")
    @DisplayName("delete status 500 with role Admin")
    void whenDeleteUserWithRoleAdmin_thenReturnStatus500() throws Exception {
        mvc.perform(delete("/user/{userID}", 45L)
                .contentType(MediaType.APPLICATION_JSON)).andExpect(status().isForbidden());
    }
}
