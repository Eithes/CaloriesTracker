"use strict";
import { Storage } from './storageCtrl';
import { ItemCtrl } from './itemController';
import { UiCtrl } from './uiController';


export const App = (function(ItemCtrl, UiCtrl, Storage) {

    const loadEventListeners = function() {
      const UiSelectors = UiCtrl.getSelectors();
      document.querySelector(UiSelectors.addBtn).addEventListener('click', itemAddSubmit);
      document.querySelector(UiSelectors.itemList).addEventListener('click', openEditState);
      document.querySelector(UiSelectors.updateBtn).addEventListener('click', itemEditSubmit);
      document.querySelector(UiSelectors.backBtn).addEventListener('click', clearEditState);
      document.querySelector(UiSelectors.deleteBtn).addEventListener('click', deleteItemSubmit);
      document.querySelector(UiSelectors.clearAllBtn).addEventListener('click', clearAllItemsSubmit);
    }
    const itemAddSubmit = function(e) {
      const {name, calories} = UiCtrl.getItemInput(); 
      if (name !== '' && calories !== '') {
        const newItem = ItemCtrl.addItem(name, calories); 
        UiCtrl.addListItem(newItem);
        const newCalories = ItemCtrl.getTotalCalories();
        UiCtrl.showTotalCalories(newCalories);  
        Storage.storeItemInLS(newItem);
        UiCtrl.clearInput();
        console.log(ItemCtrl.logData()); 
      }
      e.preventDefault();
    }

    document.addEventListener('keypress', function(e) {
      if(e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    });

    const openEditState = function(e) {
      if(e.target.classList.contains('fa-pen')) {
        const listId = e.target.parentElement.parentElement.id;
        const id = parseInt(listId.split('-')[1]);
        const itemToEdit = ItemCtrl.findCurrentItem(id); 
        ItemCtrl.setCurrentItem(itemToEdit);
        UiCtrl.showEditItem();       
      }      
      e.preventDefault();
    }
    
    const itemEditSubmit = function(e) {      
      const input = UiCtrl.getItemInput();
      const updatedItem = ItemCtrl.updateItem(input.name, input.calories); 
      UiCtrl.updateListItem(updatedItem);
      const newCalories = ItemCtrl.getTotalCalories();
      UiCtrl.showTotalCalories(newCalories);     

      Storage.updateItemInLS(updatedItem); 

      UiCtrl.clearEditState();
      e.preventDefault();
    }
    const deleteItemSubmit = function(e) {
      const currentItemId = ItemCtrl.getCurrentItem().id;     
      ItemCtrl.deleteItem(currentItemId);      
      UiCtrl.deleteItemFromUi(currentItemId);
      const newCalories = ItemCtrl.getTotalCalories();
      UiCtrl.showTotalCalories(newCalories);

      Storage.deleteItemFromLS(currentItemId);

      UiCtrl.clearEditState();
      e.preventDefault();
    }
    const clearAllItemsSubmit = function(e) {
      ItemCtrl.deleteAllItems();
      const newCalories = ItemCtrl.getTotalCalories();
      UiCtrl.showTotalCalories(newCalories);
      UiCtrl.clearAllItems();

      Storage.clearAllItemsFromLS();

      UiCtrl.hideList(); 
      UiCtrl.clearEditState();
      e.preventDefault();
    }
    const clearEditState = function(e) {
      UiCtrl.clearEditState();
      e.preventDefault();
    }
    return {
      init: function() {
        const items = ItemCtrl.getItems();
        UiCtrl.clearEditState();
        if(items.length === 0) {
          UiCtrl.hideList();         
        } else {     
          UiCtrl.populateItemList(items);
          const newCalories = ItemCtrl.getTotalCalories();
          UiCtrl.showTotalCalories(newCalories);
        }       
        loadEventListeners();          
      }      
    }
})(ItemCtrl, UiCtrl, Storage);