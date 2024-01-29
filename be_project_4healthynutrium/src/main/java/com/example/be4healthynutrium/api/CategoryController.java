package com.example.be4healthynutrium.api;

import com.example.be4healthynutrium.domain.Category;
import com.example.be4healthynutrium.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/category")
public class CategoryController {
    @Autowired
    CategoryService categoryService;

    @GetMapping(value = "")
    public ResponseEntity<?> getAll() {
        return new ResponseEntity(categoryService.getAll(), HttpStatus.OK);
    }

    @GetMapping(value = "/active")
    public ResponseEntity<?> getActive() {
        return new ResponseEntity(categoryService.getActive(), HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<?> getByID(@PathVariable("id") String idParam) {
        long id = Long.parseLong(idParam);
        return new ResponseEntity(categoryService.getByID(id), HttpStatus.OK);
    }

    @GetMapping(value = "/page")
    public ResponseEntity<?> getAllByPage(@RequestParam int index, @RequestParam int perPage) {
        Pageable pageable = PageRequest.of(index, perPage);
        Page<Category> a = categoryService.getAllCategory(pageable);
        return new ResponseEntity(a.getContent(), HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchCategory(@RequestParam String keyword) {
        return new ResponseEntity(categoryService.listAll(keyword), HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<?> createCategory(@RequestBody Category category) {
        return new ResponseEntity(categoryService.add(category), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCategory(@PathVariable("id") String idParam,@RequestBody Category category) {
        long id = Long.parseLong(idParam);
        category.setId(id);
        return new ResponseEntity(categoryService.update(category), HttpStatus.OK);

    }

    @DeleteMapping("/{categoryID}")
    public ResponseEntity<?> deactiveCategory(@PathVariable("categoryID") String categoryIDParam) {
        long categoryID = Long.parseLong(categoryIDParam);
        return new ResponseEntity(categoryService.deactive(categoryID), HttpStatus.OK);
    }

    @PostMapping("/active/{categoryID}")
    public ResponseEntity<?> activeCategory(@PathVariable("categoryID") String categoryIDParam) {
        long categoryID = Long.parseLong(categoryIDParam);
        return new ResponseEntity(categoryService.active(categoryID), HttpStatus.OK);
    }
}
