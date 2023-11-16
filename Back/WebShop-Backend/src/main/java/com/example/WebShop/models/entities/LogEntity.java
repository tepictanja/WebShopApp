package com.example.WebShop.models.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;

@Entity
@Data
@Table(name = "log", schema = "webshop")
public class LogEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id", nullable = false)
    private Integer id;
    @Basic
    @Column(name = "message", nullable = false, length = 1000)
    private String message;
    @Basic
    @Column(name = "level", nullable = false, length = 50)
    private String level;
    @Basic
    @Column(name = "date_time", nullable = false)
    private Timestamp dateTime;
    @Basic
    @Column(name = "logger", nullable = false, length = 500)
    private String logger;
}
