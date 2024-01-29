package com.example.be4healthynutrium.api;

import com.example.be4healthynutrium.domain.EmailDetail;
import com.example.be4healthynutrium.domain.User;
import com.example.be4healthynutrium.dto.UserDTO;
import com.example.be4healthynutrium.exception.CustomException;
import com.example.be4healthynutrium.service.EmailService;
import com.example.be4healthynutrium.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
@Controller
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserService userService;
    @Autowired
    EmailService emailService;

    @GetMapping(value = "")

    public ResponseEntity<?> getAll() {
        return new ResponseEntity<>(userService.getAll(), HttpStatus.OK);
    }

    @GetMapping(value = "/page")
    public ResponseEntity<?> getAll(@RequestParam int index, @RequestParam int perPage) {
        Pageable pageable = PageRequest.of(index, perPage);
        Page<User> a = userService.getAllUser(pageable);
        return new ResponseEntity<>(a.getContent(), HttpStatus.OK);
    }

    @GetMapping(value = "/{email}")
    public ResponseEntity<?> getByEmail(@PathVariable("email") String email) {
        return new ResponseEntity<>(userService.getByEmail(email), HttpStatus.OK);
    }

    @GetMapping("/search/{key}")
    public ResponseEntity<?> searchUser(@PathVariable("key") String key) {
        return new ResponseEntity(userService.getSearchedUsers(key), HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<?> addUser(@RequestBody UserDTO userDTO) {
        return new ResponseEntity<>(userService.add(userDTO), HttpStatus.OK);
    }

    @PostMapping("/check-old-password/{userID}")
    public ResponseEntity<?> checkOldPassword(@PathVariable("userID") String userIDParam, @RequestBody String[] oldPasswordDTO) {
        String oldPassword = oldPasswordDTO[0];
        long id = Long.parseLong(userIDParam);
        userService.checkOldPassword(id,oldPassword);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("/{userID}")
    public ResponseEntity<?> updateUser(@PathVariable("userID") String userIDParam, @RequestBody UserDTO userDTO) {
        long id = Long.parseLong(userIDParam);
        userDTO.setId(id);
        return new ResponseEntity<>(userService.update(userDTO), HttpStatus.OK);
    }

    @PostMapping("/{userID}/delete")
    public ResponseEntity<?> deactiveUser(@PathVariable("userID") String userIDParam) {
        long userID = Long.parseLong(userIDParam);
        return new ResponseEntity<>(userService.deactive(userID), HttpStatus.OK);
    }

    @PostMapping("/{userID}/active")
    public ResponseEntity<?> activeUser(@PathVariable("userID") String userIDParam) {
        long userID = Long.parseLong(userIDParam);
        return new ResponseEntity<>(userService.active(userID), HttpStatus.OK);
    }

    @PostMapping("/nutrient-expert")
    public ResponseEntity<?> createNutrientExpert(@RequestBody UserDTO userDTO) {
        return new ResponseEntity<>(userService.addNutrientExpert(userDTO), HttpStatus.OK);
    }

    @PostMapping(value = "/forgot")
    public ResponseEntity<?> forgotPassword(@RequestBody String[] toEmailRequestBody) {

        String toEmail = toEmailRequestBody[0];
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");

        Calendar c = Calendar.getInstance();
        c.setTime(new Date());
        c.add(Calendar.HOUR, 1);
        String endTime = sdf.format(c.getTime());

        User user = userService.getByEmail(toEmail);
        if (user == null) {
            throw new CustomException("Email " + toEmail + " chưa được đăng ký");
        }

        String encryptedStr = emailService.getEncryptedString("forgot" + "-" + toEmail + "-" + endTime);

        String emailBody = "Mã xác thực của bạn: " + encryptedStr + "\nLưu ý, mã chỉ có hiệu lực trong trong vòng 1 giờ";
        String emailSubject = "4HealthyNutrium - Khôi phục mật khẩu";

        EmailDetail email = new EmailDetail(toEmail, emailBody, emailSubject, null);
        boolean isEmailSent = emailService.checkEmailSent(email);
        if (isEmailSent) {
            return new ResponseEntity<>("Vui lòng kiểm tra email " + toEmail + " để lấy mã xác thực", HttpStatus.OK);
        } else {
            throw new CustomException("Lỗi gửi email");
        }

    }

    @GetMapping(value = "/forgot/{encryptedString}")
    public ResponseEntity<?> getForgotUser(@PathVariable("encryptedString") String encryptedStr) {

        User user = emailService.getForgotUser(encryptedStr);
        if (user == null) {
            throw new CustomException("Sai mã xác thực");
        } else {
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
    }

    @PostMapping(value = "/email-register")
    public ResponseEntity<?> sendEmailRegisterCode(@RequestBody String[] toEmailRequestBody) {

        String toEmail = toEmailRequestBody[0];
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");

        Calendar c = Calendar.getInstance();
        c.setTime(new Date());
        c.add(Calendar.HOUR, 1);
        String endTime = sdf.format(c.getTime());

        User user = userService.getByEmail(toEmail);
        if (user != null) {
            throw new CustomException("Email " + toEmail + " đã được đăng kí");
        }

        String encryptedStr = emailService.getEncryptedString("register" + "-" + toEmail + "-" + endTime);

        String emailBody = "Mã xác thực email của bạn: " + encryptedStr + "\nLưu ý, mã chỉ có hiệu lực trong vòng 1 giờ";
        String emailSubject = "4HealthyNutrium - Đăng kí tài khoản";

        EmailDetail email = new EmailDetail(toEmail, emailBody, emailSubject, null);
        boolean isEmailSent = emailService.checkEmailSent(email);
        if (isEmailSent) {
            return new ResponseEntity<>("Vui lòng kiểm tra email " + toEmail + " để lấy mã xác thực", HttpStatus.OK);
        } else {
            throw new CustomException("Lỗi gửi mail");
        }
    }

    @GetMapping(value = "/email-register/{encryptedString}")
    public ResponseEntity<?> checkRegisterUser(@PathVariable("encryptedString") String encryptedStr) {
        return new ResponseEntity<>(emailService.getRegisterUser(encryptedStr), HttpStatus.OK);
    }

}
