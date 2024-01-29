package com.example.be4healthynutrium.api;

import com.example.be4healthynutrium.domain.TabooFood;
import com.example.be4healthynutrium.service.TabooFoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/taboofood")
public class TabooFoodController {
    @Autowired
    TabooFoodService tabooFoodService;

    @GetMapping(value = "")
    public ResponseEntity<?> getAll() {
            return new ResponseEntity(tabooFoodService.getAll(), HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<?> getByID(@PathVariable("id") String idParam) {
        long id = Long.parseLong(idParam);
        return new ResponseEntity(tabooFoodService.getByID(id), HttpStatus.OK);
    }

    @GetMapping(value = "/page")
    public ResponseEntity<?> getAll(@RequestParam int index, @RequestParam int perPage) {
        Pageable pageable = PageRequest.of(index, perPage);
        Page<TabooFood> a = tabooFoodService.getAllTabooFood(pageable);
        return new ResponseEntity<>(a.getContent(), HttpStatus.OK);
    }

    @GetMapping(value = "/select/{id}")
    public ResponseEntity<?> selectTabooFoodByIngredientId(@PathVariable("id") String idParam) {
        long id = Long.parseLong(idParam);
        return new ResponseEntity<>(tabooFoodService.selectTabooFoodByIngredientID(id), HttpStatus.OK);
    }

    @PostMapping(value = "")
    public ResponseEntity<?> add(@RequestBody TabooFood TabooFood) {
        return new ResponseEntity(tabooFoodService.add(TabooFood), HttpStatus.OK);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<?> update(@PathVariable("id") String idParam, @RequestBody TabooFood TabooFood) {
        long id = Long.parseLong(idParam);
        TabooFood.setId(id);
        return new ResponseEntity(tabooFoodService.update(TabooFood), HttpStatus.OK);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") String id) {
        long TabooFoodId = Long.parseLong(id);
        return new ResponseEntity(tabooFoodService.delete(TabooFoodId), HttpStatus.OK);
    }
}
