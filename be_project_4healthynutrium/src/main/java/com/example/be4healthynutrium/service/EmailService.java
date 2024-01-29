package com.example.be4healthynutrium.service;

import com.example.be4healthynutrium.domain.EmailDetail;
import com.example.be4healthynutrium.domain.User;
import com.example.be4healthynutrium.exception.CustomException;
import com.example.be4healthynutrium.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Date;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    UserRepo userRepo;

    @Value("${spring.mail.username}") private String sender;

    public boolean checkEmailSent(EmailDetail emailDetail)
    {
        try {
            SimpleMailMessage mailMessage
                    = new SimpleMailMessage();
            mailMessage.setFrom(sender);
            mailMessage.setTo(emailDetail.getRecipient());
            mailMessage.setText(emailDetail.getMsgBody());
            mailMessage.setSubject(emailDetail.getSubject());

            javaMailSender.send(mailMessage);
            return true;
        }
        catch (Exception e) {
            return false;
        }
    }

    public boolean sendMailWithAttachment(EmailDetail details)
    {
        // Creating a mime message
        MimeMessage mimeMessage
                = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper;

        try {
            // Setting multipart as true for attachments to
            // be send
            mimeMessageHelper
                    = new MimeMessageHelper(mimeMessage, true);
            mimeMessageHelper.setFrom(sender);
            mimeMessageHelper.setTo(details.getRecipient());
            mimeMessageHelper.setText(details.getMsgBody());
            mimeMessageHelper.setSubject(
                    details.getSubject());

            // Adding the attachment
            FileSystemResource file
                    = new FileSystemResource(
                    new File(details.getAttachment()));

            mimeMessageHelper.addAttachment(
                    file.getFilename(), file);
            // Sending the mail
            javaMailSender.send(mimeMessage);
            return true;
        }

        // Catch block to handle MessagingException
        catch (MessagingException e) {

            // Display message when exception occurred
            return false;
        }
    }

    public String getEncryptedString(String str) {
        Base64.Encoder encoder = Base64.getEncoder();
        return encoder.encodeToString(str.getBytes());
    }

    public User getForgotUser(String encryptedStr) {
        try{
            SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
            Base64.Decoder decoder = Base64.getDecoder();

            // Decoding string
            String str = new String(decoder.decode(encryptedStr));

            if(str.contains("-")){
                String[] splittedStrs = str.split("-");
                String forGotText =  splittedStrs[0];
                String email = splittedStrs[1];
                String endTimeStr = splittedStrs[2];
                Date endTime = sdf.parse(endTimeStr);
                Date now = new Date();

                if(now.after(endTime) || !forGotText.equals("forgot")) {
                    throw new CustomException("Mã đăng kí không hợp lệ");
                }
                else{
                    return userRepo.getByEmail(email);
                }
            }
            throw new CustomException("Mã đăng kí không hợp lệ");
        }catch(Exception e){
            throw new CustomException("Mã đăng kí không hợp lệ");
        }
    }

    public String getRegisterUser(String encryptedStr) {
        try{
            SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
            Base64.Decoder decoder = Base64.getDecoder();

            // Decoding string
            String str = new String(decoder.decode(encryptedStr));

            if(str.contains("-")){
                String[] splittedStrs = str.split("-");
                String forGotText =  splittedStrs[0];
                String email = splittedStrs[1];
                String endTimeStr = splittedStrs[2];
                Date endTime = sdf.parse(endTimeStr);
                Date now = new Date();

                if(now.after(endTime) || !forGotText.equals("register")) {
                    throw new CustomException("Mã đăng kí không hợp lệ");
                }
                else{
                    return email;
                }

            }
            throw new CustomException("Mã đăng kí không hợp lệ");
        }catch(Exception e){
            throw new CustomException("Mã đăng kí không hợp lệ");
        }

    }


}
