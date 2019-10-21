"use strict";

import { ItemCtrl } from "./itemController";

export const UiCtrl = (function() {
    
    const UiSelectors = {
      itemList: '#item-list',
      listItems: '#item-list li',
      addBtn: '.add-btn',
      updateBtn: '.update-btn',
      deleteBtn: '.delete-btn',
      backBtn: '.back-btn',
      clearAllBtn: '.clear-btn',
      itemNameInput: '#item-name',
      itemCaloriesInput: '#item-calories',
      totalCalories: '.total-calories',      
    }

    return {

      getItemInput: function() {
        return {
          name: document.querySelector(UiSelectors.itemNameInput).value,
          calories: document.querySelector(UiSelectors.itemCaloriesInput).value,
        }
      },
      populateItemList: function(items) {
        let output = '';  
        items.forEach(item => {
          output += `
            <li class="collection-item" id="item-${item.id}">
                <strong> ${item.name}: </strong> <em> ${item.calories} Calories</em>
                <a href="#" class="secondary-content"><i class="fas fa-pen"></i></a>
            </li>
          `; 
        });
        document.querySelector(UiSelectors.itemList).innerHTML = output;
      },
      showEditStateButtons: function() {
        document.querySelector(UiSelectors.updateBtn).style.display='inline';
        document.querySelector(UiSelectors.deleteBtn).style.display='inline';
        document.querySelector(UiSelectors.backBtn).style.display='inline';
        document.querySelector(UiSelectors.addBtn).style.display='none';
      },
      showEditItem: function() {        
        document.querySelector(UiSelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
        document.querySelector(UiSelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
        UiCtrl.showEditStateButtons();
      },
      addListItem: function(item) {
        document.querySelector(UiSelectors.itemList).style.display='block';
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.id = `item-${item.id}`;
        li.innerHTML = `
          <strong> ${item.name}: </strong> <em> ${item.calories} Calories</em>
          <a href="#" class="secondary-content"><i class="fas fa-pen"></i></a>
        `
        document.querySelector(UiSelectors.itemList).insertAdjacentElement('beforeend', li);
      },
      updateListItem: function(updatedItem) {        
        const listItems = Array.from(document.querySelectorAll(UiSelectors.listItems));
        let currentItem = listItems.find(item => item.id === `item-${updatedItem.id}`);      
        currentItem.innerHTML = `
          <strong> ${updatedItem.name}: </strong> <em> ${updatedItem.calories} Calories</em>
          <a href="#" class="secondary-content"><i class="fas fa-pen"></i></a>
        `;
      },
      clearEditState: function() {
        UiCtrl.clearInput();
        document.querySelector(UiSelectors.updateBtn).style.display='none';
        document.querySelector(UiSelectors.deleteBtn).style.display='none';
        document.querySelector(UiSelectors.backBtn).style.display='none';
        document.querySelector(UiSelectors.addBtn).style.display='inline';
      },
      deleteItemFromUi: function(currentItemId) {
        const itemId = `#item-${currentItemId}`;
        const item = document.querySelector(itemId);
        item.remove();
        // const listItems = Array.from(document.querySelectorAll(UiSelectors.listItems));
        // let currentItem = listItems.find(item => item.id === `item-${currentItemId}`);       
        // currentItem.remove();
      },
      clearAllItems: function() {
        const listItems = Array.from(document.querySelectorAll(UiSelectors.listItems));
        listItems.forEach(item => item.remove());        
      },
      getSelectors: function() {
        return UiSelectors;  
      },
      clearInput: function() {
        document.querySelector(UiSelectors.itemNameInput).value = '';
        document.querySelector(UiSelectors.itemCaloriesInput).value = '';
      },
      hideList: function() {
        document.querySelector(UiSelectors.itemList).style.display='none';
      },
      showTotalCalories: function(newCalories) {
        document.querySelector(UiSelectors.totalCalories).textContent=newCalories; 
      },      
    }
})();