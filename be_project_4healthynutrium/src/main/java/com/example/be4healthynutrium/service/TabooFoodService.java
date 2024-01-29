package com.example.be4healthynutrium.service;

import com.example.be4healthynutrium.domain.TabooFood;
import com.example.be4healthynutrium.exception.CustomException;
import com.example.be4healthynutrium.repository.TabooFoodRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class TabooFoodService {

    @Autowired
    TabooFoodRepo tabooFoodRepo;

    public List<TabooFood> getAll() {
        log.info("Lấy tất cả TabooFood");
        return tabooFoodRepo.findAll();
    }

    public TabooFood getByID(long id) {
        Optional<TabooFood> optionalTabooFood= tabooFoodRepo.findById(id);
        if (!optionalTabooFood.isPresent())
            throw new CustomException("Không tìm thấy TabooFood");
        return optionalTabooFood.get();
    }

    public List<TabooFood> selectTabooFoodByIngredientID(long id) {
        List<TabooFood> optional= tabooFoodRepo.searchTabooFoodByIngredientName1(id);
        List<TabooFood> optional2= tabooFoodRepo.searchTabooFoodByIngredientName2(id);
        if (!optional.isEmpty()) {
            return tabooFoodRepo.searchTabooFoodByIngredientName1(id);
        } else if (!optional2.isEmpty()) {
            return tabooFoodRepo.searchTabooFoodByIngredientName2(id);
        } else {
            log.info("Không tìm thấy Ingredient");
            return tabooFoodRepo.findAll();
        }
    }

    public TabooFood add(TabooFood tabooFood){

        if(tabooFood.getIngredient1().getId() == tabooFood.getIngredient2().getId()){
            throw new CustomException("Xin vui lòng chọn 2 ingredients khác nhau");
        }

        tabooFood.setId(null);

        tabooFood.getDescription();

        TabooFood result = tabooFoodRepo.save(tabooFood);

        if(result == null){
            throw new CustomException("Thêm mới TabooFood bị lỗi");
        }
        return result;
    }

    public TabooFood update(TabooFood tabooFood){

        if(tabooFood.getIngredient1().getId() == tabooFood.getIngredient2().getId()){
            throw new CustomException("Please choose 2 different ingredients");
        }

        TabooFood result = tabooFoodRepo.save(tabooFood);

        if(result == null){
            throw new CustomException("Thay đổi thông tin Taboofood bị lỗi");
        }
        return result;
    }

    public TabooFood delete(long id){
        TabooFood tabooFood = tabooFoodRepo.findById(id).isPresent() ? tabooFoodRepo.findById(id).get() : null;

        if(tabooFood==null){
            throw new CustomException("Không tìm thấy Taboofood");
        }
        tabooFoodRepo.delete(tabooFood);
        return tabooFood;
    }

    public Page<TabooFood> getAllTabooFood(Pageable pageable){
        log.info("Lấy tất cả Taboofood bằng phân trang (paging)");
        return tabooFoodRepo.findAll(pageable);
    }
}
