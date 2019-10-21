"use strict";
import { Storage } from './storageCtrl';

export const ItemCtrl = (function() {
      const Item = function(id, name, calories) {
      this.id = id;
      this.name = name;
      this.calories = calories;
    }

    const state = {
      items: Storage.getAllItemsFromLS(),
      // [          
      //   { id: 0, name: 'Steak Dinner', calories: 1200 },
      //   { id: 1, name: 'Cookie', calories: 400 },
      //   { id: 2, name: 'Eggs', calories: 300 },
      // ],
      currentItem: null,
      totalCalories: 0
    }

    return {
      addItem: function(name, calories) {
        let id;       
        if(state.items.length > 0) {
          id = state.items[state.items.length - 1].id + 1;
        } else {
          id = 0;
        }
        calories = parseInt(calories); 
        const newItem = new Item(id, name, calories);
        state.items.push(newItem);        
        return newItem;
      },
      getItems: function() {        
        return state.items;
      },
      getTotalCalories: function() {
        const total = state.items.reduce((sum, item) => {
          return sum += item.calories;
        }, 0);
        state.totalCalories = total;       
        return state.totalCalories;
      },
      getCurrentItem: function() {
        return state.currentItem;
      },
      findCurrentItem: function(id) {   
        const currentItem = state.items.find(item => item.id === id);
        return currentItem || null;             
      },
      setCurrentItem: function(itemToEdit) {
        state.currentItem = itemToEdit;
      },
      updateItem: function(name, calories) {
        calories = parseInt(calories);
        let found = state.items.find(item => item.id === state.currentItem.id);
        if(found) {
          found.name = name;
          found.calories = calories;
        }       
        return found;        
      },
      deleteItem: function(currentItemId) {
        const index = state.items.findIndex(item => item.id === currentItemId);
        state.items.splice(index, 1);
        state.currentItem = null;
      },
      deleteAllItems: function() {
        state.items = [];
      },
      logData: function() {
        return state;
      }
    }
})();