package com.example.be4healthynutrium.service;

import com.example.be4healthynutrium.domain.Category;
import com.example.be4healthynutrium.exception.CustomException;
import com.example.be4healthynutrium.repository.CategoryRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class CategoryService {

    @Autowired
    CategoryRepo categoryRepo;

    public Category add(Category category) {

        category.setId(null);
        category.setCategoryStatus(true);

        if(categoryRepo.getByName(category.getCategoryName())!=null){
            throw new CustomException("Tên của category bị trùng lập");
        }

        Category result = categoryRepo.save(category);
        if(result == null){
            throw new CustomException("Thêm mới category bị lỗi");
        }
        return result;
    }
    public Category update(Category category) {
        if(!categoryRepo.findById(category.getId()).isPresent()){
            throw new CustomException("Không tìm thấy category");
        }
        if(categoryRepo.getDuplicateName(category.getCategoryName(), category.getId()) != null){
            throw new CustomException("Tên của category bị trùng lập");
        }

        category.setCategoryStatus(true);
        Category result = categoryRepo.save(category);
        if(result==null){
            throw new CustomException("Thay đổi category bị lỗi");
        }
        return result;
    }

    public Category deactive(long categoryID) {
    Optional<Category> optionalCategory = categoryRepo.findById(categoryID);
    if(!optionalCategory.isPresent()){
        throw new CustomException("Không tim thấy category");
    }
    Category category = optionalCategory.get();
    category.setCategoryStatus(false);

    Category result = categoryRepo.save(category);
    if(result == null){
        throw new CustomException("Hủy kích hoạt category không thành công");
    }
    return result;
}

    public Category active(long categoryID) {
        Optional<Category> optionalCategory = categoryRepo.findById(categoryID);
        if(!optionalCategory.isPresent()){
            throw new CustomException("Không tìm thấy category");
        }
        Category category = optionalCategory.get();
        category.setCategoryStatus(true);

        Category result = categoryRepo.save(category);
        if(result == null){
            throw new CustomException("Kích hoạt category không thành công");
        }
        return result;
    }

    public List<Category> getAll() {
        log.info("Lấy tất cả category");
        return categoryRepo.getAllCategory();
    }

    public Page<Category> getAllCategory(Pageable pageable){
        log.info("Lấy tất cả category bằng phân trang (paging)");
        return categoryRepo.findAll(pageable);
    }

    public List<Category> listAll(String keyword) {
        if (keyword != null) {
            return categoryRepo.searchCategory(keyword);
        }
        return categoryRepo.findAll();
    }

    public Category getByID(long id) {
        Optional<Category> optionalCategory= categoryRepo.findById(id);
        if (!optionalCategory.isPresent())
            throw new CustomException("Không tìm thấy category");
        return optionalCategory.get();
    }

    public List<Category> getActive() {
        return categoryRepo.getActive();
    }
}
