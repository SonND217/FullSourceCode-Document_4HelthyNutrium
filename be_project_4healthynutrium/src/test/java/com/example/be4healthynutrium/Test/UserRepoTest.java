package com.example.be4healthynutrium.Test;
import com.example.be4healthynutrium.domain.User;
import com.example.be4healthynutrium.repository.UserRepo;
import com.example.be4healthynutrium.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.annotation.Rollback;


import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace.ANY;
import static org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace.AUTO_CONFIGURED;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AUTO_CONFIGURED)
@Rollback(value = false)
public class UserRepoTest {

    @Autowired
    UserRepo userRepo;

    @Autowired
    UserService userService;

    @Autowired
    TestEntityManager entityManager;

    @Test
    public void createNewUser(){
        User user = new User();
        user.setEmail("kiritokami15@gmail.com");
        user.setPassword("1234");
        user.setName("Long");
        user.setAddress("Ha Noi");
        user.setDob("2000-14-09");;
        user.setPhone("1231241");
        user.setGender(true);
        user.setStatus(true);

        User user1 = userRepo.save(user);

        User exist = entityManager.find(User.class, user1.getId());

        assertThat(user.getEmail()).isEqualTo(exist.getEmail());

    }
}
