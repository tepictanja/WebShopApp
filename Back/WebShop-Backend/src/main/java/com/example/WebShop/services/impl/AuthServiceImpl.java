package com.example.WebShop.services.impl;

import com.example.WebShop.exceptions.ConflictException;
import com.example.WebShop.exceptions.UnauthorizedException;
import com.example.WebShop.exceptions.NotFoundException;
import com.example.WebShop.models.requests.ActivateAccountRequest;
import com.example.WebShop.models.requests.SignUpRequest;
import com.example.WebShop.services.MailService;
import com.example.WebShop.util.LoggingUtil;
import com.example.WebShop.models.dto.LoginResponse;
import com.example.WebShop.models.entities.UserEntity;
import com.example.WebShop.models.enums.UserStatus;
import com.example.WebShop.models.requests.LoginRequest;
import com.example.WebShop.repositories.UserEntityRepository;
import com.example.WebShop.services.AuthService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {
    @Value("${authorization.token.expiration-time}")
    private String tokenExpirationTime;
    @Value("${authorization.token.secret}")
    private String tokenSecret;
    private final AuthenticationManager authenticationManager;
    private final ModelMapper modelMapper;
    private final UserEntityRepository userEntityRepository;
    private final MailService mailService;
    private final Map<String, String> pins = new HashMap<>();
    private final PasswordEncoder passwordEncoder;

    private static final Logger logger = LogManager.getLogger(ProductServiceImpl.class);

    public void logAction(String message){
        logger.info(message);
    }

    public AuthServiceImpl(AuthenticationManager authenticationManager, UserEntityRepository userEntityRepository, ModelMapper modelMapper, MailService mailService, PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.userEntityRepository = userEntityRepository;
        this.modelMapper = modelMapper;
        this.mailService = mailService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void signUp(SignUpRequest request){
        if (userEntityRepository.existsByUsername(request.getUsername()))
            throw new ConflictException();
        UserEntity entity = modelMapper.map(request, UserEntity.class);
        entity.setPassword(passwordEncoder.encode(entity.getPassword()));
        entity.setStatus(UserStatus.REQUESTED);
        userEntityRepository.saveAndFlush(entity);
        sendPinByEmail(entity.getUsername(), entity.getEmail());
        logAction("SIGNUP USER " + entity.getId());
    }

    @Override
    public LoginResponse login(LoginRequest request) {
        boolean isHashed = true;
        try {
            UserEntity userEntity = userEntityRepository.findByUsername(request.getUsername()).orElseThrow(NotFoundException::new);
            if(request.getPassword().equals(userEntity.getPassword())){
                isHashed = false;
            }

            if(isHashed) {
                Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
            }
            //UserEntity userEntity = userEntityRepository.findByUsername(request.getUsername()).orElseThrow(NotFoundException::new);
            if (userEntity.getStatus().equals(UserStatus.ACTIVE)) {
                LoginResponse response = modelMapper.map(userEntity, LoginResponse.class);
                response.setToken(generateJwt(userEntity));
                logAction("LOGIN USER " + userEntity.getId());
                return response;
            } else {
                sendPinByEmail(userEntity.getUsername(), userEntity.getEmail());
                logAction("LOGIN USER " + userEntity.getId() + " SEND PIN");
                return null;
            }
        } catch (Exception e) {
            LoggingUtil.logException(e, getClass());
            throw new UnauthorizedException();
        }
    }

    private String generateJwt(UserEntity user) {
        return Jwts.builder()
                .setId(user.getId().toString())
                .setSubject(user.getUsername())
                .claim("role", user.getStatus().name())
                .setExpiration(new Date(System.currentTimeMillis() + Long.parseLong(tokenExpirationTime)))
                .signWith(SignatureAlgorithm.HS512, tokenSecret)
                .compact();
    }

    @Override
    public void sendPinByEmail(String username, String email){
        int pin;
        SecureRandom random = new SecureRandom();
        do {
            pin = random.nextInt(9999 + 1);
        } while (pins.containsValue(pin));

        pins.put(username, String.valueOf(pin));
        mailService.sendMail(email, String.valueOf(pin));
    }

    @Override
    public boolean activateAccount(ActivateAccountRequest request){
        return pins.containsKey(request.getUsername()) && pins.get(request.getUsername()).equals(request.getPin());
    }

    private Claims parseJWT(String token) {
        return Jwts.parser()
                .setSigningKey(tokenSecret)
                .parseClaimsJws(token).getBody();
    }
}
