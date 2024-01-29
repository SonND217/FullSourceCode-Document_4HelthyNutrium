package com.example.be4healthynutrium.service;

import com.example.be4healthynutrium.domain.Role;
import com.example.be4healthynutrium.domain.User;
import com.example.be4healthynutrium.dto.UserDTO;
import com.example.be4healthynutrium.exception.CustomException;
import com.example.be4healthynutrium.repository.RoleRepo;
import com.example.be4healthynutrium.repository.UserRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class UserService implements UserDetailsService {
    @Autowired
    UserRepo userRepo;

    @Autowired
    RoleRepo roleRepo;

    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepo.getByEmail(email);
        if (user == null) {
            return null;
        } else {
            log.info("Email được tìm thấy trong cơ sở dữ liệu: {}", email);
            if (!user.getStatus())
                return null;
        }
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(user.getRole().getName()));
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), authorities);
    }

    public User getDataFromClient(UserDTO userDTO) {

        Role userRole = roleRepo.getByName("USER");

        User user = new User(
                userDTO.getId(),
                userDTO.getEmail(),
                userDTO.getPassword(),
                userDTO.getName(),
                userDTO.getAddress(),
                userDTO.getDob(),
                userDTO.getPhone(),
                userDTO.getGender(),
                true,
                userRole
        );
        return user;
    }

    public User add(UserDTO userDTO) {

        if (userDTO.getId() != null) {
            throw new CustomException("Lỗi gửi dữ liệu đến server");
        }

        // Get data from client
        User newUser = getDataFromClient(userDTO);

        // encrypt password
        newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));

        if (userRepo.getByEmail(newUser.getEmail()) != null) {
            throw new CustomException("Đã có tài khoản đăng kí bằng email này");
        }
        if (userRepo.getByPhone(newUser.getPhone()) != null) {
            throw new CustomException("Đã có tài khoản đăng kí bằng số điện thoại này");
        }

        //------------------ Save -------------------
        User result = userRepo.save(newUser);
        if (result == null) {
            throw new CustomException("Lỗi đăng kí tài khoản");
        } else {
            return newUser;
        }
    }

    public User update(UserDTO userDTO) {
        User oldUser = userRepo.findById(userDTO.getId()).isPresent() ? userRepo.findById(userDTO.getId()).get() : null;

        if (oldUser == null) {
            throw new CustomException("Lỗi khi gửi dữ liệu sang server");
        }
        if (!oldUser.getStatus()) {
            throw new CustomException("Tài khoản đã bị vô hiệu hóa, không thể cập nhật");
        }

        // Get data from client
        User updateUser = new User(
                userDTO.getId(),
                userDTO.getEmail(),
                userDTO.getPassword(),
                userDTO.getName(),
                userDTO.getAddress(),
                userDTO.getDob(),
                userDTO.getPhone(),
                userDTO.getGender(),
                true,
                userDTO.getRole()
        );

        // if user change password
        if (!oldUser.getPassword().equals(updateUser.getPassword())) {
            // encrypt password
            updateUser.setPassword(bCryptPasswordEncoder.encode(updateUser.getPassword()));
        }

        if (!oldUser.getEmail().equals(updateUser.getEmail())) {
            throw new CustomException("Không thể cập nhật email");
        }

        if (userRepo.checkDublicatePhone(updateUser.getPhone(),updateUser.getId()) != null) {
            throw new CustomException("Số điện thoại đã tồn tại, vui lòng chọn số điện thoại khác");
        }

        //------------------ Save -------------------
        User result = userRepo.save(updateUser);
        if (result == null) {
            throw new CustomException("Lỗi cập nhật tài khoản");
        }
        return result;
    }

    public User forgotPassword(UserDTO userDTO) {
        User oldUser = userRepo.findById(userDTO.getId()).isPresent() ? userRepo.findById(userDTO.getId()).get() : null;
        if (oldUser == null) {
            throw new CustomException("Lỗi khi gửi dữ liệu sang server");
        } else {
            if (!oldUser.getStatus()) {
                throw new CustomException("Tài khoản đã bị vô hiệu hóa, không thể cập nhật");
            }
        }

        Role userRole = roleRepo.getRoleByUserId(oldUser.getId());
        // Get data from client
        User updateUser = new User(
                userDTO.getId(),
                userDTO.getEmail(),
                userDTO.getPassword(),
                userDTO.getName(),
                userDTO.getAddress(),
                userDTO.getDob(),
                userDTO.getPhone(),
                userDTO.getGender(),
                true,
                userRole
        );

        // if user change password
        if (!oldUser.getPassword().equals(updateUser.getPassword())) {
            // encrypt password
            updateUser.setPassword(bCryptPasswordEncoder.encode(updateUser.getPassword()));
        }

        if (!oldUser.getEmail().equals(updateUser.getEmail())) {
            throw new CustomException("Không thể thay đổi email");
        }

        //------------------ Save -------------------
        User result = userRepo.save(updateUser);
        if (result == null) {
            throw new CustomException("Lỗi đổi mật khẩu");
        }
        return result;
    }

    public User addNutrientExpert(UserDTO dto) {

        Role nutrientRole = roleRepo.getByName("NUTRIENT_EXPERT");

        if (nutrientRole == null) {
            throw new CustomException("Không thể tìm role nhà dinh dưỡng");
        }

        // Get data from client
        User user = new User(
                dto.getId(),
                dto.getEmail(),
                dto.getPassword(),
                dto.getName(),
                dto.getAddress(),
                dto.getDob(),
                dto.getPhone(),
                dto.getGender(),
                true,
                nutrientRole
        );

        if (user.getId() != null) {
            throw new CustomException("Lỗi gửi dữ liệu đến server");
        }

        // encrypt password
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));

        if (userRepo.getByEmail(user.getEmail()) != null) {
            throw new CustomException("Đã có tài khoản đăng kí bằng email này");
        }
        if (userRepo.getByPhone(user.getPhone()) != null) {
            throw new CustomException("Đã có tài khoản đăng kí bằng số điện thoại này");
        }

        User result = userRepo.save(user);
        if (result == null) {
            throw new CustomException("Lỗi tạo tài khoản mới");
        }
        // save success
        else {
            return result;
        }
    }

    public User deactive(long userID) {
        User user = userRepo.findById(userID).isPresent() ? userRepo.findById(userID).get() : null;
        if (user == null) {
            throw new CustomException("No user found to deactive");
        } else {

            if (user.getRole().getName().equalsIgnoreCase("ADMIN")) {
                throw new CustomException("Không thể cập nhật trạng thái tài khoản Admin");
            }

            user.setStatus(!user.getStatus());

            User result = userRepo.save(user);
            if (result == null) {
                throw new CustomException("Lỗi cập nhật trạng thái tài khoản");
            } else {
                return result;
            }
        }
    }

    public User active(long userID) {
        User user = userRepo.findById(userID).isPresent() ? userRepo.findById(userID).get() : null;
        if (user == null) {
            throw new CustomException("Không tìm được tài khoản để kích hoạt");
        } else {

            if (user.getRole().getName().equalsIgnoreCase("ADMIN")) {
                throw new CustomException("Không thể kích hoạt tài khoản Admin");
            }

            user.setStatus(true);

            User result = userRepo.save(user);
            if (result == null) {
                throw new CustomException("Lỗi kích hoạt tài khoản");
            } else {
                return result;
            }
        }
    }

    public void checkOldPassword(long userID, String oldPassword) {
        User user = userRepo.findById(userID).isPresent() ? userRepo.findById(userID).get() : null;

        if(!bCryptPasswordEncoder.matches(oldPassword,user.getPassword())){
            throw new CustomException("Mật khẩu cũ không đúng");
        }
    }

    public User getByEmail(String email) {
        return userRepo.getByEmail(email);
    }

    public List<User> getAll() {
        log.info("Lấy tất cả user");
        return userRepo.getAllUser();
    }

    public User getByID(long userID) {
        Optional<User> optionalUser = userRepo.findById(userID);
        if (optionalUser.isPresent()) {
            return optionalUser.get();
        } else {
            throw new CustomException("Không tìm thấy user");
        }
    }

    public Page<User> getAllUser(Pageable pageable) {
        log.info("Lấy tất cả user bằng phân trang (paging)");
        return userRepo.findAll(pageable);
    }

    //search by name and email
    public List<User> getSearchedUsers(String key) {
        List<User> users = userRepo.findAll();
        List<User> result = new ArrayList<>();
        if (key != null && key.trim() != "") {
            for(User u : users){
                if(u.getEmail().toUpperCase().contains(key.toUpperCase()) || u.getName().toUpperCase().contains(key.toUpperCase())){
                    result.add(u);
                }
            }
            return result;
        }
        return users;
    }
}

