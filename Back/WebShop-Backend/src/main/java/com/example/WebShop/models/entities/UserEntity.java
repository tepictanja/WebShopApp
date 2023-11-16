package com.example.WebShop.models.entities;

import com.example.WebShop.models.enums.UserStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.Hibernate;

import java.util.List;
import java.util.Objects;
@Data
@Entity
@Table(name = "user")
public class UserEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id", nullable = false)
    private Integer id;
    @Basic
    @Column(name = "first_name", nullable = false, length = 45)
    private String firstName;
    @Basic
    @Column(name = "last_name", nullable = false, length = 45)
    private String lastName;
    @Basic
    @Column(name = "username", nullable = false, length = 45)
    private String username;
    @Basic
    @Column(name = "password", nullable = false, length = 45)
    private String password;
    @Basic
    @Column(name = "email", nullable = false, length = 45)
    private String email;
    @Basic
    @Column(name = "phone_number", nullable = false, length = 13)
    private String phoneNumber;
    @Basic
    @Column(name = "city", nullable = false, length = 45)
    private String city;
    @Basic
    @Column(name = "avatar_uri", nullable = false, length = 255)
    private String avatarUri;
    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "ENUM('REQUESTED', 'ACTIVE', 'INACTIVE')")
    private UserStatus status;
    @OneToMany(mappedBy = "user")
    private List<CommentEntity> comments;
    @OneToMany(mappedBy = "user")
    private List<MessageEntity> messages;
    @OneToMany(mappedBy = "saller")
    private List<ProductEntity> products;
    @OneToMany(mappedBy = "buyer")
    private List<ProductEntity> purchasedProducts;
}
