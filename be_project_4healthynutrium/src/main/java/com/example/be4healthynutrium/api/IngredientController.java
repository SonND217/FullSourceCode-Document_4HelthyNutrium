package com.example.be4healthynutrium.api;

import com.example.be4healthynutrium.domain.Ingredient;
import com.example.be4healthynutrium.dto.SearchIngredientDTO;
import com.example.be4healthynutrium.exception.CustomException;
import com.example.be4healthynutrium.service.IngredientService;
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
@RequestMapping("/ingredient")
public class IngredientController {
    @Autowired
    IngredientService ingredientService;

    @GetMapping(value = "")
    public ResponseEntity<?> getAll() {
            return new ResponseEntity(ingredientService.getAll(), HttpStatus.OK);
    }

    @GetMapping(value = "/active")
    public ResponseEntity<?> getActive() {
        return new ResponseEntity(ingredientService.getActive(), HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<?> getById(@PathVariable("id") String idParam) {
        long id = Long.parseLong(idParam);
        return new ResponseEntity(ingredientService.getByID(id), HttpStatus.OK);
    }

    @GetMapping(value = "/season/{id}")
    public ResponseEntity<?> selectBySeasonId(@PathVariable("id") String idParam) {
        long id = Long.parseLong(idParam);
        return new ResponseEntity(ingredientService.listIngredientBySeasonId(id), HttpStatus.OK);
    }

    @GetMapping(value = "/page")
    public ResponseEntity<?> getAllByPage(@RequestParam int index, @RequestParam int perPage) {
        Pageable pageable = PageRequest.of(index, perPage);
        Page<Ingredient> a = ingredientService.getAllIngredient(pageable);
        return new ResponseEntity(a.getContent(), HttpStatus.OK);
    }

    @PostMapping(value = "")
    public ResponseEntity<?> add(@RequestBody Ingredient ingredient) throws Exception {
        return new ResponseEntity(ingredientService.add(ingredient), HttpStatus.OK);
    }

    @PostMapping(value = "/search-active")
    public ResponseEntity<?> searchIngredient(@RequestBody SearchIngredientDTO searchData) {
        return new ResponseEntity(ingredientService.searchActive(searchData), HttpStatus.OK);
    }

    @PostMapping(value = "/{id}")
    public ResponseEntity<?> update(@PathVariable("id") String idParam,@RequestBody Ingredient ingredient) throws IOException {
        long id = Long.parseLong(idParam);
        ingredient.setId(id);
        return new ResponseEntity(ingredientService.update(ingredient), HttpStatus.OK);
    }

    @PostMapping(value = "/{id}/changeStatus")
    public ResponseEntity<?> changeStatus(@PathVariable("id") String id) {
        long ingredientId = Long.parseLong(id);
        ingredientService.changeStatus(ingredientId);
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/{id}/image")
    public ResponseEntity<?> getIngredientImage(@PathVariable("id") String idParam) throws IOException {

        long id = Long.parseLong(idParam);
        Ingredient ingredient = ingredientService.getByID(id);

        if (ingredient == null) {
            throw new CustomException( "Ingredient not found");
        }

        String path = new File("./src/main/resources/ingredient-image").getCanonicalPath() + "\\" + ingredient.getImg();
        File imageFile = new File(path);
        BufferedImage bImage = ImageIO.read(imageFile);
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        ImageIO.write(bImage, "jpg", bos);
        byte[] data = bos.toByteArray();

        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(data);
    }

    @PostMapping(value = "/{id}/image")
    public ResponseEntity updateIngredientImage(@RequestParam("file") MultipartFile clientFile, @PathVariable("id") String idParam) throws IOException {

        long id = Long.parseLong(idParam);
        Ingredient ingredient = ingredientService.getByID(id);

        if (ingredient == null) {
            throw new CustomException( "Ingredient not found");
        }

        String fileName = ingredient.getId() + ".jpg";
        String fileDirectory = new File("./src/main/resources/ingredient-image").getCanonicalPath() + "\\" + fileName;

        // replace server file with client file (image)
        Files.copy(clientFile.getInputStream(), Paths.get(fileDirectory), StandardCopyOption.REPLACE_EXISTING);
        clientFile.getInputStream().close();

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
