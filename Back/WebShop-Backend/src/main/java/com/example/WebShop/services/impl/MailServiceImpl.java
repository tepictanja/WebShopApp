package com.example.WebShop.services.impl;

import com.example.WebShop.services.MailService;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailServiceImpl implements MailService {
    private final JavaMailSender emailSender;

    public MailServiceImpl(JavaMailSender emailSender) {
        this.emailSender = emailSender;
    }

    @Override
    public void sendMail(String mail, String pin){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(mail);
        message.setSubject("PIN for account activation");
        message.setText("Your PIN is " + pin + ". Enter this PIN to activate your account.");
        emailSender.send(message);
    }
}
