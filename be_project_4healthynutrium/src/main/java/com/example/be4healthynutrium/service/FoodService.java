package com.example.be4healthynutrium.service;

import com.example.be4healthynutrium.domain.*;
import com.example.be4healthynutrium.dto.*;
import com.example.be4healthynutrium.exception.CustomException;
import com.example.be4healthynutrium.repository.*;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.*;

@Service
@Slf4j
public class FoodService {
    @Autowired
    FoodRepo foodRepo;

    @Autowired
    FoodDetailRepo foodDetailRepo;

    @Autowired
    UserRepo userRepo;

    @Autowired
    CategoryRepo categoryRepo;

    @Autowired
    MealRepo mealRepo;

    @Autowired
    SeasonRepo seasonRepo;

    public List<FoodDTO> getAll() {

        List<FoodDTO> foods = new ArrayList<>();
        ModelMapper modelMapper = new ModelMapper();
        FoodDTO food = new FoodDTO();

        // lấy tca record trong food detail mà food status = 1
        List<FoodDetail> foodDetails = foodDetailRepo.getAllFoodDetail();

        if (foodDetails.isEmpty()) {
            return foods;
        }
        // dùng để check đang duyệt đến foodID nào
        long foodID = 0;

        int size = foodDetails.size();

        for (int i = 0; i < size; i++) {
            FoodDetail fd = foodDetails.get(i);
            // duyệt record đầu
            if (i == 0) {
                // init
                foodID = fd.getFood().getId();
                food = modelMapper.map(fd.getFood(), FoodDTO.class);
                food.setIngredientMasses(new ArrayList<>());
            }
            // foodID mới
            if (fd.getFood().getId() != foodID) {
                // update foodID
                foodID = fd.getFood().getId();
                // add food duyệt từ trước
                foods.add(food);
                food = modelMapper.map(fd.getFood(), FoodDTO.class);
                food.setIngredientMasses(new ArrayList<>());
                food.getIngredientMasses().add(new IngredientMass(
                        fd.getIngredient(),
                        fd.getMass()
                ));
            }
            // foodID cũ hoặc đang duyệt record đầu
            else {
                // chỉ thêm ingredient
                food.getIngredientMasses().add(new IngredientMass(
                        fd.getIngredient(),
                        fd.getMass()
                ));
            }
            // sau khi duyệt record cuối thì add food
            if (i == size - 1) {
                foods.add(food);
            }
        }
        return foods;
    }

    public Page<Food> getAllFood(Pageable pageable) {
        log.info("get all food by paging");
        return foodRepo.findAll(pageable);
    }

    public Food add(FoodDTO foodDTO) throws Exception {

        if (foodRepo.getByName(foodDTO.getFoodName()) != null) {
            throw new CustomException(foodDTO.getFoodName() + " đã được thêm, vui lòng thêm thức ăn khác");
        }

        // map dto
        ModelMapper modelMapper = new ModelMapper();
        Food food = modelMapper.map(foodDTO, Food.class);
        food.setId(null);

        // check valid mass
        for (IngredientMass im : foodDTO.getIngredientMasses()) {
            float mass = im.getMass();
            Ingredient ingredient = im.getIngredient();
            if (mass<=0 || mass > im.getIngredient().getMaxLimit()) {
                throw new CustomException("Nguyên liệu " + ingredient.getIngredientName() + " có khối lượng lớn hơn 0 và tối đa là " + ingredient.getMaxLimit() + " gram");
            }
        }

        // add
        Food result = foodRepo.save(food);

        // add fail
        if (result == null) {
            throw new CustomException("Lỗi thêm thức ăn");
        }

        // add successfully
        food.setImg(result.getId() + ".jpg");
        result = foodRepo.save(food);

        // update food detail mass
        for (IngredientMass im : foodDTO.getIngredientMasses()) {
            float mass = im.getMass();
            Ingredient ingredient = im.getIngredient();
            FoodDetail foodDetail = new FoodDetail(null, result, ingredient, mass);
            foodDetailRepo.save(foodDetail);
        }

        // add default image file to server
        String defaultImageFileName = new File("./src/main/resources/food-image/default.jpg").getCanonicalPath();
        File defaultImageFile = new File(defaultImageFileName);
        String newFoodImageFileName = new File("./src/main/resources/food-image").getCanonicalPath() + "\\" + result.getId() + ".jpg";
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

    public Food update(FoodDTO foodDTO) throws IOException {

        ModelMapper modelMapper = new ModelMapper();
        Food food = modelMapper.map(foodDTO, Food.class);
        food.setStatus(foodDTO.getStatus());

        if (!foodRepo.findById(food.getId()).isPresent()) {
            throw new CustomException("food not found");
        }

        if (foodRepo.getDuplicateName(foodDTO.getFoodName(), food.getId()) != null) {
            throw new CustomException("Duplicate food name");
        }

        Food savedFood = foodRepo.save(food);

        // add fail
        if (savedFood == null) {
            throw new CustomException("Lỗi chỉnh sửa món ăn");
        }

        if (savedFood != null) {
            for (IngredientMass im : foodDTO.getIngredientMasses()) {
                float mass = im.getMass();
                Ingredient ingredient = im.getIngredient();
                FoodDetail foodDetail = new FoodDetail(null, savedFood, ingredient, mass);
                foodDetailRepo.save(foodDetail);
            }
        }

        return savedFood;
    }

    public void changeStatus(long foodID) {
        Food f = foodRepo.findById(foodID).get();
        int totalUpdatedRow = 0;
        totalUpdatedRow = foodRepo.changeStatus(!f.getStatus(), foodID);
        if (totalUpdatedRow == 0) {
            throw new CustomException("Lỗi cập nhật trạng thái món ăn");
        }
    }

    public Food getByID(long foodID) {
        Optional<Food> optionalFood = foodRepo.findById(foodID);
        if (!optionalFood.isPresent())
            throw new CustomException("Food not found");
        return optionalFood.get();
    }

    public List<Food> searchFoods(SearchFoodDTO searchData) {
        return foodRepo.search(searchData,false);
    }

    public List<Food> searchActiveFoods(SearchFoodDTO searchData) {
        return foodRepo.search(searchData,true);
    }

    public List<Food> listFoodByCategoryId(long id) {
        List<Food> optional = foodRepo.selectFoodByCateID(id);
        if (optional.isEmpty()) {
            log.info("Food does not exist");
            return foodRepo.findAll();
        }
        return foodRepo.selectFoodByCateID(id);
    }

    public List<Food> listFoodByIngredientId(long id) {
        List<Food> optional = foodRepo.selectFoodByIngredientId(id);
        if (optional.isEmpty()) {
            log.info("Food does not exist");
            return foodRepo.findAll();
        }
        return foodRepo.selectFoodByIngredientId(id);
    }

    public List<Food> listFoodBySeasonId(long id) {
        List<Food> optional = foodRepo.selectBySeasonId(id);
        if (optional.isEmpty()) {
            log.info("Food does not exist");
            return foodRepo.findAll();
        }
        return foodRepo.selectBySeasonId(id);
    }

    public List<Food> listFoodByMealId(long id) {
        List<Food> optional = foodRepo.selectByMealId(id);
        if (optional.isEmpty()) {
            log.info("Food does not exist");
            return foodRepo.findAll();
        }
        return foodRepo.selectByMealId(id);
    }

    public FoodDTO getFoodDTOByID(long foodID) {

        if (!foodRepo.findById(foodID).isPresent()) {
            throw new CustomException("Không tìm được thức ăn");
        }

        ModelMapper modelMapper = new ModelMapper();
        FoodDTO food;

        // lấy tca record trong food detail
        List<FoodDetail> foodDetails = foodDetailRepo.getByFoodID(foodID);

        if (foodDetails.isEmpty()) {
            throw new CustomException("Thức ăn chưa có nguyên liệu");
        }

        food = modelMapper.map(foodDetails.get(0).getFood(), FoodDTO.class);
        food.setIngredientMasses(new ArrayList<>());

        for (FoodDetail fd : foodDetails) {
            food.getIngredientMasses().add(new IngredientMass(
                    fd.getIngredient(),
                    fd.getMass()
            ));
        }

        return food;
    }

    public List<Food> getActive() {
        return foodRepo.getActive();
    }
}
