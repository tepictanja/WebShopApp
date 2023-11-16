package com.example.WebShop.services.impl;

import com.example.WebShop.exceptions.BadRequestException;
import com.example.WebShop.exceptions.ConflictException;
import com.example.WebShop.exceptions.NotFoundException;
import com.example.WebShop.models.dto.*;
import com.example.WebShop.models.entities.*;
import com.example.WebShop.models.enums.ProductStatus;
import com.example.WebShop.models.requests.FilterProductsRequest;
import com.example.WebShop.models.requests.ProductRequest;
import com.example.WebShop.models.requests.SoldProductRequest;
import com.example.WebShop.repositories.*;
import com.example.WebShop.services.CategoryService;
import com.example.WebShop.services.ProductService;
import com.example.WebShop.services.UserService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductEntityRepository repository;
    private final ModelMapper modelMapper;
    private final CategoryService categoryService;
    private final UserService userService;
    private final CategoryEntityRepository categoryRepository;
    private final AttributeEntityRepository attributeEntityRepository;
    private final ImageEntityRespository imageEntityRespository;
    private final ProductAttributeEntityRepository paRepository;

    private final UserEntityRepository userRepository;

    @PersistenceContext
    private EntityManager entityManager;

    private final String PHOTO_PATH = System.getProperty("user.dir") + "/src/main/resources/productPhotos";

    private static final Logger logger = LogManager.getLogger(ProductServiceImpl.class);
    private static final String LOG_TEMPLATE = "%s %d by user(id) %d";

    public void logAction(String action, long productId, long userId) {
        String logMessage = String.format(LOG_TEMPLATE, action, productId, userId);
        logger.info(logMessage);
    }

    public ProductServiceImpl(ProductEntityRepository repository, ModelMapper modelMapper, CategoryService categoryService, UserService userService, CategoryEntityRepository categoryRepository, AttributeEntityRepository attributeEntityRepository, ImageEntityRespository imageEntityRespository, ProductAttributeEntityRepository paRepository, UserEntityRepository userRepository){
        this.repository = repository;
        this.modelMapper = modelMapper;
        this.categoryService = categoryService;
        this.userService = userService;
        this.categoryRepository = categoryRepository;
        this.attributeEntityRepository = attributeEntityRepository;
        this.imageEntityRespository = imageEntityRespository;
        this.paRepository = paRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Product insert(ProductRequest request, Authentication auth){
        CategoryEntity category = categoryRepository.getById(request.getCategoryId());
        ProductEntity product = modelMapper.map(request, ProductEntity.class);
        product.setCategory(category);
        java.util.Date date = new Date();
        product.setCreateDate(new Date(date.getTime()));
        product.setStatus(ProductStatus.ACTIVE);

        product = repository.saveAndFlush(product);
        for (Image image : request.getImages()) {
            ImageEntity imageEntity = modelMapper.map(image, ImageEntity.class);
            imageEntity.setProduct(product);
            imageEntityRespository.saveAndFlush(imageEntity);
        }

        for (ProductAttribute attribute : request.getAttributes()) {
            ProductAttributeEntity productAttributeEntity = modelMapper.map(attribute, ProductAttributeEntity.class);
            productAttributeEntity.setProduct(product);
            AttributeEntity attributeEntity = modelMapper.map(attribute.getAttribute(), AttributeEntity.class);
            productAttributeEntity.setAttribute(attributeEntity);
            paRepository.saveAndFlush(productAttributeEntity);
        }
        JwtUser jwtUser = (JwtUser) auth.getPrincipal();
        logAction("INSERT PRODUCT", product.getId(), jwtUser.getId());
        return modelMapper.map(product, Product.class);
    }

    @Override
    public Product deleteById(Integer id, Authentication auth) throws NotFoundException{
        ProductEntity productEntity = repository.findById(id).orElseThrow(NotFoundException::new);

        productEntity.setStatus(ProductStatus.INACTIVE);
        JwtUser jwtUser = (JwtUser) auth.getPrincipal();
        logAction("DELETE PRODUCT", productEntity.getId(), jwtUser.getId());
        return modelMapper.map(repository.saveAndFlush(productEntity), Product.class);
    }

    @Override
    public Page<Product> getAll(Pageable pageable) {
        Page<ProductEntity> productEntities = repository.findAll(pageable);
        return productEntities.map(productEntity -> modelMapper.map(productEntity, Product.class));
    }

    @Override
    public Page<Product> getProductsByCategory(String categoryName, Pageable pageable) {
        Page<ProductEntity> productEntities = repository.findByCategoryName(categoryName, pageable);
        return productEntities.map(productEntity -> modelMapper.map(productEntity, Product.class));
    }

    @Override
    public Page<Product> getProductsByStatus(ProductStatus status, Pageable pageable) {
        Page<ProductEntity> productEntities = repository.findByStatus(status, pageable);
        return productEntities.map(productEntity -> modelMapper.map(productEntity, Product.class));
    }

    @Override
    public Product markProductAsSold(SoldProductRequest request, Authentication auth) {
        ProductEntity productEntity = repository.findById(request.getProductId()).orElseThrow(NotFoundException::new);
        UserEntity userEntity = userRepository.findById(request.getCustomerId()).orElseThrow(NotFoundException::new);
        if(productEntity.getBuyer()!=null || productEntity.getStatus()!=ProductStatus.ACTIVE)
            throw new BadRequestException();
        productEntity.setStatus(ProductStatus.SOLD);
        productEntity.setBuyer(userEntity);
        JwtUser jwtUser = (JwtUser) auth.getPrincipal();
        logAction("SOLD PRODUCT", productEntity.getId(), jwtUser.getId());
        return modelMapper.map(repository.saveAndFlush(productEntity), Product.class);
    }

    public Product getById(Integer id){
        ProductEntity productEntity = repository.findById(id).orElseThrow(NotFoundException::new);
        return modelMapper.map(productEntity, Product.class);
    }

    public Page<Product> getProductsBySellerAndStatus(Integer sellerId, ProductStatus status, Pageable pageable) {
        Page<ProductEntity> productEntities = repository.findBySallerIdAndStatus(sellerId, status, pageable);
        return productEntities.map(productEntity -> modelMapper.map(productEntity, Product.class));
    }

    public Page<Product> getProductsByBuyer(Integer buyerId, Pageable pageable){
        Page<ProductEntity> productEntities = repository.findByBuyerId(buyerId, pageable);
        return productEntities.map(productEntity -> modelMapper.map(productEntity, Product.class));
    }

    public Page<Product> filterProducts(FilterProductsRequest request, Pageable pageable) {
        List<Attribute> attributes = request.getProductAttributes().stream()
                .map(ProductAttribute::getAttribute)
                .collect(Collectors.toList());

        List<AttributeEntity> attributesEntity = new ArrayList<>();
        for(Attribute attribute:attributes) {
            attributesEntity.add(modelMapper.map(attribute, AttributeEntity.class));
        }

        List<String> attributeValues = request.getProductAttributes().stream()
                .map(ProductAttribute::getValue)
                .collect(Collectors.toList());

        int attributeCount = attributes.size();

        Page<ProductEntity> productEntities = repository.findAllByCategoryAndLocationAndPriceRangeAndAttributes(
                request.getCategory(), request.getLocation(), request.getPriceFrom(), request.getPriceTo(),
                attributesEntity, attributeValues, attributeCount, pageable
        );
        return productEntities.map(productEntity -> modelMapper.map(productEntity, Product.class));

    }

    public Page<Product> searchProductsByNameAndStatus(String name, ProductStatus status, Pageable pageable) {
        Page<ProductEntity> productEntities = repository.findByNameContainingIgnoreCaseAndStatus(name, status, pageable);
        return productEntities.map(productEntity -> modelMapper.map(productEntity, Product.class));
    }

}
