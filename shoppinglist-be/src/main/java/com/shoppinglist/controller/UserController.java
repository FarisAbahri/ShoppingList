package com.shoppinglist.controller;

import com.shoppinglist.model.User;
import com.shoppinglist.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("user")
public class UserController {

    @Autowired
    private UserService userService;

    @CrossOrigin
    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestBody User user) throws Exception {
        String username = user.getUsername();
        String password = user.getPassword();

        User userObj = userService.findUserByUsernameAndPassword(username, password);

        if (userObj == null) {
            throw new Exception("Invalid credentials");
        }

        return ResponseEntity.ok(userObj);
    }

}
