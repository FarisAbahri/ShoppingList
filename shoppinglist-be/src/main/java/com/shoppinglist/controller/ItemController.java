package com.shoppinglist.controller;

import com.shoppinglist.model.Item;
import com.shoppinglist.model.User;
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
    public ResponseEntity<List<Item>> getItemsByUserId(@PathVariable int userId) {
        User user = userService.findById(userId);
        if (user == null) throw new RuntimeException("User does not exist");

        List<Item> items = itemService.getItemsByUserId(userId);
        return ResponseEntity.ok(items);
    }

    @CrossOrigin
    @PostMapping("/add/{userId}")
    public Item addtoItemList(@RequestBody Item item, @PathVariable int userId) throws Exception {
        User user = userService.findById(userId);
        if (user == null) throw new Exception("User does not exist");

        item.setUserId(userId);
        itemService.addToItemList(item);
        return item;
    }

    @CrossOrigin
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable int id) {
        if (itemService.findById(id) == null) {
            return ResponseEntity.notFound().build();
        }
        itemService.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
