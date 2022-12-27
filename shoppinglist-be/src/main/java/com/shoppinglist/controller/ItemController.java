package com.shoppinglist.controller;

import com.shoppinglist.model.Item;
import com.shoppinglist.model.User;
import com.shoppinglist.repository.UserRepository;
import com.shoppinglist.service.ItemService;
import com.shoppinglist.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("items")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @Autowired
    private UserService userService;

    @CrossOrigin
    @GetMapping(value = "/{userId}")
    public ResponseEntity<List<Item>> getItemsByUserId(@PathVariable int userId) throws Exception {
        User user = userService.findById(userId);
        if (user == null) throw new Exception("User does not exist");

        List<Item> items = itemService.getItemsByUserId(userId);
        return ResponseEntity.ok(items);
    }

    @CrossOrigin
    @PostMapping("/add/{userId}")
    public Item addtoItemList(@RequestBody Item item, @PathVariable int userId) throws Exception {
        User user = userService.findById(userId);
        if (user == null) throw new Exception("User does not exist");
        //Sets user value for the item
        item.setUserId(userId);

        //Adds item to shopping list
        itemService.addToItemList(item);
        return item;
    }

    @CrossOrigin
    @DeleteMapping("/delete/{id}")
    public boolean deleteItem(@PathVariable int id) {
        if (itemService.findById(id) == null) return false;
        itemService.deleteById(id);
        return true;
    }
}
