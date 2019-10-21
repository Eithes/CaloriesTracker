class Storage {
  constructor() {
    this.meals = [];
  }

  getAllItemsFromLS() {
    this.meals = localStorage.getItem('meals') ? JSON.parse(localStorage.getItem('meals')) : [];
    return this.meals;
  }

  storeItemInLS(item) {
    this.meals = localStorage.getItem('meals') ? JSON.parse(localStorage.getItem('meals')) : [];
    this.meals.push(item);
    localStorage.setItem('meals', JSON.stringify(this.meals));
  }

  updateItemInLS(updatedItem) {
    this.meals = JSON.parse(localStorage.getItem('meals'));
    const index = this.meals.findIndex(item => item.id === updatedItem.id);
    this.meals.splice(index, 1, updatedItem);
    localStorage.setItem('meals', JSON.stringify(this.meals));
  }

  deleteItemFromLS(currentItemId) {
    this.meals = JSON.parse(localStorage.getItem('meals'));
    const index = this.meals.findIndex(item => item.id === currentItemId);
    this.meals.splice(index, 1);
    localStorage.setItem('meals', JSON.stringify(this.meals));
  }

  clearAllItemsFromLS() {
    localStorage.removeItem('meals');
    this.meals = [];
  }
}

const storage = new Storage();

export default storage;
