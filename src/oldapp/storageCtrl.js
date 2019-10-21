const Storage = (function () {
  return {
    getAllItemsFromLS: function() { 
      let meals =  localStorage.getItem('meals') ? JSON.parse(localStorage.getItem('meals')) : []; 
      return meals;
    },
    storeItemInLS: function(item) {   
      let meals =  localStorage.getItem('meals') ? JSON.parse(localStorage.getItem('meals')) : []; 
      meals.push(item);
      localStorage.setItem('meals', JSON.stringify(meals)); 
    },
    updateItemInLS: function(updatedItem) {
      let meals = JSON.parse(localStorage.getItem('meals'));     
      let index = meals.findIndex(item => item.id === updatedItem.id);
      meals.splice(index, 1, updatedItem);         
      localStorage.setItem('meals', JSON.stringify(meals));
    },
    deleteItemFromLS: function(currentItemId) {
      let meals = JSON.parse(localStorage.getItem('meals')); 
      let index = meals.findIndex(item => item.id === currentItemId);
      meals.splice(index, 1);   
      localStorage.setItem('meals', JSON.stringify(meals)); 
    },
    clearAllItemsFromLS: function() {
      localStorage.removeItem('meals');
    },
  }  
})();

export { Storage } ;

