package com.shoppinglist.service;

import com.shoppinglist.model.Item;
import com.shoppinglist.repository.ItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {

    private final ItemRepository itemRepository;

    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    public List<Item> getItemsByUserId(int userId) {
        return itemRepository.getItemsByUserId(userId);
    }

    public void addToItemList(Item item) {
        itemRepository.save(item);
    }

    public Item findById(int id) {
        return itemRepository.findById(id);
    }

    public void deleteById(int id) {
        itemRepository.deleteById(id);
    }
}
