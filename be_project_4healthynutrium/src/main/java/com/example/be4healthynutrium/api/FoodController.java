package com.example.be4healthynutrium.api;

import com.example.be4healthynutrium.domain.Food;
import com.example.be4healthynutrium.dto.FoodDTO;
import com.example.be4healthynutrium.dto.SearchFoodDTO;
import com.example.be4healthynutrium.exception.CustomException;
import com.example.be4healthynutrium.service.FoodDetailService;
import com.example.be4healthynutrium.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Controller
@RequestMapping("/food")
public class FoodController {
    @Autowired
    FoodService foodService;

    @Autowired
    FoodDetailService foodDetailService;

    @GetMapping(value = "")
    public ResponseEntity<?> getAll() {
        return new ResponseEntity(foodService.getAll(), HttpStatus.OK);
    }

    @GetMapping(value = "/active")
    public ResponseEntity<?> getActive() {
        return new ResponseEntity(foodService.getActive(), HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<?> getByID(@PathVariable("id") String idParam) {
        long id = Long.parseLong(idParam);
        return new ResponseEntity(foodService.getFoodDTOByID(id), HttpStatus.OK);
    }

    @GetMapping(value = "/page")
    public ResponseEntity<?> getAllByPage(@RequestParam int index, @RequestParam int perPage) {
        Pageable pageable = PageRequest.of(index, perPage);
        Page<Food> a = foodService.getAllFood(pageable);
        return new ResponseEntity(a.getContent(), HttpStatus.OK);

    }

    @PostMapping(value = "/search")
    public ResponseEntity<?> searchFood( @RequestBody SearchFoodDTO searchData) {
        return new ResponseEntity(foodService.searchFoods(searchData), HttpStatus.OK);
    }

    @PostMapping(value = "/search-active")
    public ResponseEntity<?> searchActiveFood( @RequestBody SearchFoodDTO searchData) {
        return new ResponseEntity(foodService.searchActiveFoods(searchData), HttpStatus.OK);
    }

    @GetMapping(value = "/category/{id}")
    public ResponseEntity<?> selectByCategoryId(@PathVariable("id") String idParam) {
        long id = Long.parseLong(idParam);
        return new ResponseEntity(foodService.listFoodByCategoryId(id), HttpStatus.OK);
    }

    @GetMapping(value = "/ingredient/{id}")
    public ResponseEntity<?> selectByIngredientId(@PathVariable("id") String idParam) {
        long id = Long.parseLong(idParam);
        return new ResponseEntity(foodService.listFoodByIngredientId(id), HttpStatus.OK);
    }

    @GetMapping(value = "/season/{id}")
    public ResponseEntity<?> selectBySeasonId(@PathVariable("id") String idParam) {
        long id = Long.parseLong(idParam);
        return new ResponseEntity(foodService.listFoodBySeasonId(id), HttpStatus.OK);
    }

    @GetMapping(value = "/meal/{id}")
    public ResponseEntity<?> selectByMealId(@PathVariable("id") String idParam) {
        long id = Long.parseLong(idParam);
        return new ResponseEntity(foodService.listFoodByMealId(id), HttpStatus.OK);
    }

    @PostMapping(value = "")
    public ResponseEntity<?> add(@RequestBody FoodDTO dto) throws Exception {
        return new ResponseEntity(foodService.add(dto), HttpStatus.OK);
    }

    @PostMapping(value = "/{id}")
    public ResponseEntity<?> update(@PathVariable("id") String idParam, @RequestBody FoodDTO dto) throws IOException {
        long id = Long.parseLong(idParam);
        dto.setId(id);
        return new ResponseEntity(foodService.update(dto), HttpStatus.OK);
    }

    @PostMapping(value = "/{id}/changeStatus")
    public ResponseEntity<?> changeStatus(@PathVariable("id") String idParam) {
        long id = Long.parseLong(idParam);
        foodService.changeStatus(id);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping(value = "/{id}/image")
    public ResponseEntity updateFoodImage(@RequestParam("file") MultipartFile clientFile, @PathVariable("id") String idParam) throws IOException {

        long id = Long.parseLong(idParam);
        Food food = foodService.getByID(id);
        if (food == null) {
            throw new CustomException("Food not found");
        }

        String fileName = food.getId() + ".jpg";
        String fileDirectory = new File("./src/main/resources/food-image").getCanonicalPath() + "\\" + fileName;

        // replace server file with client file (image)
        Files.copy(clientFile.getInputStream(), Paths.get(fileDirectory), StandardCopyOption.REPLACE_EXISTING);
        clientFile.getInputStream().close();

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{id}/image")
    public ResponseEntity<?> getFoodImage(@PathVariable("id") String idParam) throws IOException {

        long id = Long.parseLong(idParam);
        Food food = foodService.getByID(id);

        if (food == null) {
            throw new CustomException("Food not found");
        }

        String path = new File("./src/main/resources/food-image").getCanonicalPath() + "\\" + food.getImg();
        File imageFile = new File(path);
        BufferedImage bImage = ImageIO.read(imageFile);
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        ImageIO.write(bImage, "jpg", bos);
        byte[] data = bos.toByteArray();

        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(data);
    }

}
