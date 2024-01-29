package com.example.be4healthynutrium.repository;

import com.example.be4healthynutrium.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoleRepo extends JpaRepository<Role, Long> {

    @Query(value = "select * from role where role_name = ?", nativeQuery = true)
    Role getByName(String roleName);

    @Query(value = "select r.* from user u inner join role r on r.id = u.role_id where u.id = ?", nativeQuery = true)
    Role getRoleByUserId(long id);

    @Query(value = "select * from role where role_name not like 'NUTRIENT_EXPERT'", nativeQuery = true)
    List<Role> getRegisterRoles();
}
