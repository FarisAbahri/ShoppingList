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

    // "user/login"
    @CrossOrigin
    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestBody User user) throws Exception {
        String tempUsername = user.getUsername();
        String tempPassword = user.getPassword();

        User userObj = null;

        if (tempUsername != null && tempPassword != null) {
            userObj = userService.findUserByUsernameAndPassword(tempUsername, tempPassword);
        }
        //If user doesn't exist
        if (userObj == null) {
            throw new Exception("Invalid credentials");
        }

        return ResponseEntity.ok(userObj);
    }

}
