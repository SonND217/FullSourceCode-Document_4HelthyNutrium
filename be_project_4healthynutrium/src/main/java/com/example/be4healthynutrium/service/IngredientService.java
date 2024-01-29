package com.example.be4healthynutrium.service;

import com.example.be4healthynutrium.domain.Food;
import com.example.be4healthynutrium.domain.Ingredient;
import com.example.be4healthynutrium.dto.SearchIngredientDTO;
import com.example.be4healthynutrium.exception.CustomException;
import com.example.be4healthynutrium.repository.IngredientRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class IngredientService {
    @Autowired
    IngredientRepo ingredientRepo;

    public List<Ingredient> getAll() {
        log.info("Lấy tất cả Ingredient");
        return ingredientRepo.getAll();
    }

    public Ingredient getByID(long id) {
        Optional<Ingredient> optionalIngredient= ingredientRepo.findById(id);
        if (!optionalIngredient.isPresent())
            throw new CustomException("Không tìm thấy nguyên liệu");
        return optionalIngredient.get();
    }

    public List<Ingredient> listIngredientBySeasonId(long id) {
        List<Ingredient> optional= ingredientRepo.selectBySeasonId(id);
        if (optional.isEmpty()) {
            log.info("Ingredient không tồn tại");
            return ingredientRepo.findAll();
        }
        return ingredientRepo.selectBySeasonId(id);
    }

    public List<Ingredient> searchActive(SearchIngredientDTO searchData) {
        return ingredientRepo.searchActive(searchData);
    }

    public Page<Ingredient> getAllIngredient(Pageable pageable){
        log.info("Lấy tất cả ingredient bằng phương pháp phân trang (paging)");
        return ingredientRepo.findAll(pageable);
    }

    public Ingredient add(Ingredient ingredient) throws Exception {

        ingredient.setId(null);

        if(ingredientRepo.getByName(ingredient.getIngredientName())!=null){
            throw new CustomException("Đã có nguyên liệu tên " + ingredient.getIngredientName());
        }

        ingredient.setImg("");
        Ingredient result =  ingredientRepo.save(ingredient);

        // add fail
        if(result == null){
            throw new CustomException("Thêm mới ingredient bị lỗi");
        }

        // add successfully
        ingredient.setImg(result.getId()+".jpg");
        result = ingredientRepo.save(ingredient);

        // add default image file to server
        String defaultImageFileName = new File("./src/main/resources/ingredient-image/default.jpg").getCanonicalPath();
        File defaultImageFile = new File(defaultImageFileName);
        String newFoodImageFileName = new File("./src/main/resources/ingredient-image").getCanonicalPath() + "\\" + ingredient.getId() + ".jpg";
        File newFoodImageFile = new File(newFoodImageFileName);

        InputStream in = new BufferedInputStream(new FileInputStream(defaultImageFile));
        OutputStream out = new BufferedOutputStream(new FileOutputStream(newFoodImageFile));
        byte[] buffer = new byte[1024];
        int lengthRead;
        while ((lengthRead = in.read(buffer)) > 0) {
            out.write(buffer, 0, lengthRead);
            out.flush();
        }
        in.close();
        out.close();

        return result;
    }

    public Ingredient update(Ingredient ingredient) throws IOException {

        if(!ingredientRepo.findById(ingredient.getId()).isPresent()){
            throw new CustomException("Không tìm được nguyên liệu");
        }

        if(ingredientRepo.getDuplicateName(ingredient.getIngredientName(),ingredient.getId())!=null){
            throw new CustomException("Đã có nguyên liệu khác tên " + ingredient.getIngredientName());
        }

        Ingredient result =  ingredientRepo.save(ingredient);

        if(result == null){
            throw new CustomException("Lỗi cập nhật nguyên liệu");
        }

        return result;

    }

    public void changeStatus(long ingredientID){
        Ingredient i = ingredientRepo.findById(ingredientID).get();
        int totalUpdatedRow = 0;
        totalUpdatedRow = ingredientRepo.changeStatus(!i.getStatus(),ingredientID);
        if(totalUpdatedRow==0){
            throw new CustomException("Lỗi cập nhật trạng thái nguyên liệu");
        }
    }

    public List<Ingredient> getActive() {
        return ingredientRepo.getActive();
    }
}
