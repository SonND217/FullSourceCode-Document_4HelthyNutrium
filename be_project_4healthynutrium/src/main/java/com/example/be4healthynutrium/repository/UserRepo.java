package com.example.be4healthynutrium.repository;

import com.example.be4healthynutrium.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepo extends JpaRepository<User, Long>, PagingAndSortingRepository<User, Long> {

    @Query(value = "select * from user where email = ?", nativeQuery = true)
    User getByEmail(String email);

    @Query(value = "select * from user where id = ?", nativeQuery = true)
    User getById(Long id);

    @Query(value = "SELECT * FROM user where role_id != 2 order by id desc", nativeQuery = true)
    List<User> getAllUser();

    @Query(value = "select * from user where phone = ?", nativeQuery = true)
    User getByPhone(String phone);

    @Query(value = "select * from user where phone = ? and id != ?", nativeQuery = true)
    User checkDublicatePhone(String phone,long id);

    @Query(value = "SELECT * FROM user WHERE " +
            "upper(name) LIKE upper('%',:keyword, '%')" +
            "or upper(email) LIKE upper('%', :keyword, '%')", nativeQuery = true)
    List<User> searchUser(String keyword);

    @Query(value = "select * from user where email = ? and id != ?", nativeQuery = true)
    User checkDublicateEmail(String email, long id);


}
