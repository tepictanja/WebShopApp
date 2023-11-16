package com.example.WebShop.services.impl;

import com.example.WebShop.exceptions.ConflictException;
import com.example.WebShop.exceptions.ForbiddenException;
import com.example.WebShop.exceptions.NotFoundException;
import com.example.WebShop.exceptions.UnauthorizedException;
import com.example.WebShop.models.dto.JwtUser;
import com.example.WebShop.models.dto.User;
import com.example.WebShop.models.entities.UserEntity;
import com.example.WebShop.models.enums.UserStatus;
import com.example.WebShop.models.requests.ActivateAccountRequest;
import com.example.WebShop.models.requests.SignUpRequest;
import com.example.WebShop.models.requests.UserUpdateRequest;
import com.example.WebShop.repositories.UserEntityRepository;
import com.example.WebShop.services.UserService;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserEntityRepository userRepository;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;

    private static final Logger logger = LogManager.getLogger(ProductServiceImpl.class);

    public void logAction(String message) {
        logger.info(message);
    }


    public UserServiceImpl(UserEntityRepository userRepository, ModelMapper modelMapper, PasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void signUp(SignUpRequest request){
        if (userRepository.existsByUsername(request.getUsername()))
            throw new ConflictException();
        UserEntity entity = modelMapper.map(request, UserEntity.class);
        entity.setPassword(passwordEncoder.encode(entity.getPassword()));
        entity.setStatus(UserStatus.REQUESTED);
        userRepository.saveAndFlush(entity);
    }

    @Override
    public User activateAccount(String username){
        UserEntity userEntity = userRepository.findByUsername(username).orElseThrow(NotFoundException::new);
        userEntity.setStatus(UserStatus.ACTIVE);
        logAction("ACTIVATE USER ACCOUNT " + userEntity.getId());
        return modelMapper.map(userRepository.saveAndFlush(userEntity), User.class);
    }

    @Override
    public User findById(Integer id){
        return  modelMapper.map(userRepository.findById(id), User.class);
    }

    @Override
    public User updateUser(String username, UserUpdateRequest user, Authentication auth){
        UserEntity userEntity = userRepository.findByUsername(username).orElseThrow(NotFoundException::new);
        JwtUser jwtUser = (JwtUser) auth.getPrincipal();
        if (!jwtUser.getId().equals(userEntity.getId()))
            throw new ForbiddenException();
        if (passwordEncoder.matches(user.getCurrentPassword(), userEntity.getPassword())) {
            userEntity.setFirstName(user.getFirstName());
            userEntity.setLastName(user.getLastName());
            userEntity.setPassword(passwordEncoder.encode(user.getNewPassword()));
            userEntity.setEmail(user.getEmail());
            userEntity.setPhoneNumber(user.getPhoneNumber());
            userEntity.setAvatarUri(user.getAvatarUri());
            userEntity.setCity(user.getCity());
            logAction("UPDATE USER " + userEntity.getId());
            return modelMapper.map(userRepository.saveAndFlush(userEntity), User.class);
        }else
            throw new UnauthorizedException("Wrong current password");
    }
}
