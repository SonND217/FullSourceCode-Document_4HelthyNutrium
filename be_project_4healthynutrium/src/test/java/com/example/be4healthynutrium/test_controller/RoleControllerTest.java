package com.example.be4healthynutrium.test_controller;

import com.example.be4healthynutrium.domain.Role;
import com.example.be4healthynutrium.repository.RoleRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class RoleControllerTest {
    @Autowired
    private WebApplicationContext webApplicationContext;

    @Autowired
    private RoleRepo roleRepo;

    private MockMvc mvc;

    @BeforeEach
    private void init() {
        Role role = new Role();
        role.setName("1");
        Role role1 = new Role();
        role1.setName("2");
        roleRepo.save(role);
        roleRepo.save(role1);
        mvc = MockMvcBuilders
                .webAppContextSetup(webApplicationContext)
                .apply(springSecurity())
                .build();
    }

    @Test
    @Transactional
    @DisplayName("view all role status 200")
    void viewAllRole_thenReturnStatus200() throws Exception {
        mvc.perform(get("/role").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
}
