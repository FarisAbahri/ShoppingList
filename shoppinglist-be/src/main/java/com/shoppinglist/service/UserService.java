package com.shoppinglist.service;

import com.shoppinglist.model.User;
import com.shoppinglist.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.sql.SQLException;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) throws SQLException {
        this.userRepository = userRepository;
    }

    public User findUserByUsernameAndPassword(String username, String password) {
        return userRepository.findByUsernameAndPassword(username, password);
    }

    public User findById(int id) {
        return userRepository.findById(id);
    }

}
