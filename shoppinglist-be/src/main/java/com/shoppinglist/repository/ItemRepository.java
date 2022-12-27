package com.shoppinglist.repository;

import com.shoppinglist.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Integer> {

    List<Item> getItemsByUserId(int userId);

    void deleteByNameAndUserId(String name, int userId);

    Item findById(int id);
}
