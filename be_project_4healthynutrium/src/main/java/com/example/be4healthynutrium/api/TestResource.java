package com.example.be4healthynutrium.api;

import com.example.be4healthynutrium.domain.EmailDetail;
import com.example.be4healthynutrium.domain.User;
import com.example.be4healthynutrium.exception.CustomException;
import com.example.be4healthynutrium.service.EmailService;
import com.example.be4healthynutrium.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class TestResource {

    @Autowired
    UserService userService;
    @Autowired
    EmailService emailService;

    @PostMapping(value = "/account/forgot")
    public ResponseEntity<?> forgotPassword(@RequestBody String[] toEmail) {
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");

            Calendar c = Calendar.getInstance();
            c.setTime(new Date());
            c.add(Calendar.HOUR, 1);
            String endTime = sdf.format(c.getTime());
            // 1 là id của user quên mật khẩu, hiện tại đang fix cứng
            String encryptedStr = getEncryptedString("forgot" + "-" + 1 + "-" + endTime);
            final String url = "http://localhost:3000/api/account/forgot/" + encryptedStr;
            String emailBody = "Please click this link to change your password: " + url;
            String emailSubject = "Change your password";

            EmailDetail email = new EmailDetail(toEmail[0],emailBody,emailSubject,null);
            boolean isEmailSent = emailService.checkEmailSent(email);
            if(isEmailSent){
                return new ResponseEntity<>("Please check email "+toEmail[0]+" to recover your password", HttpStatus.OK);
            }
            else{
                return new ResponseEntity<>("Send mail fail", HttpStatus.EXPECTATION_FAILED);
            }
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(value = "/account/email-register-attachment")
    public ResponseEntity<?> sendEmailRegisterCodeWithAttachment(@RequestBody String[] toEmailRequestBody) {

        String toEmail = toEmailRequestBody[0];
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");

        Calendar c = Calendar.getInstance();
        c.setTime(new Date());
        c.add(Calendar.HOUR, 1);
        String endTime = sdf.format(c.getTime());

        User user = userService.getByEmail(toEmail);
        if (user != null) {
            throw new CustomException("Another account registered with the email " + toEmail);
        }

        String encryptedStr = emailService.getEncryptedString("register" + "-" + toEmail + "-" + endTime);

        String emailBody = "Your email-verification code: " + encryptedStr;
        String emailSubject = "Register account - Get email-verification code";
        String attachment = "C:/Users/LONG VA PHUONG/Desktop/be_project_4healthynutrium/src/main/resources/food-image/default.jpg";

        EmailDetail email = new EmailDetail(toEmail, emailBody, emailSubject, attachment);
        boolean isEmailSent = emailService.sendMailWithAttachment(email);
        if (isEmailSent) {
            return new ResponseEntity<>("Please check email: " + toEmail + " to get email-verification code", HttpStatus.OK);
        } else {
            throw new CustomException("Send email fail");
        }

    }

    @GetMapping(value = "/account/forgot/{encryptedString}")
    public ResponseEntity<?> getForgotAccount(@PathVariable("encryptedString") String encryptedStr) {
        try {
            String id = getForgotAccountStr(encryptedStr);
            if (id == null) {
                return new ResponseEntity("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
            } else {
                return new ResponseEntity<>(id, HttpStatus.OK);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public String getEncryptedString(String str) {
        Base64.Encoder encoder = Base64.getEncoder();
        return encoder.encodeToString(str.getBytes());
    }

    public String getForgotAccountStr(String encryptedStr) {
        try{
            SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
            Base64.Decoder decoder = Base64.getDecoder();

            // Decoding string
            String str = new String(decoder.decode(encryptedStr));

            if(str.contains("-")){
                String[] splittedStrs = str.split("-");
                String forGotText =  splittedStrs[0];
                int id = Integer.parseInt(splittedStrs[1]);
                String endTimeStr = splittedStrs[2];
                Date endTime = sdf.parse(endTimeStr);
                Date now = new Date();

                if(now.after(endTime) || !forGotText.equals("forgot") || id!=1) {
                    return null;
                }
                else{
                    return "1";
                }

            }
            return null;

        }catch(Exception e){
            return null;
        }

    }

}
