class ItemCtrl {
  constructor(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
    this.state = {
      items: [],
      currentItem: null,
      totalCalories: 0,
    };
  }

  getAllItems(data) {
    this.state.items = data;
  }

  addItem(name, calories) {
    let id;
    if (this.state.items.length > 0) {
      id = this.state.items[this.state.items.length - 1].id + 1;
    } else {
      id = 0;
    }
    this.calories = Number(calories);
    this.id = id;
    this.name = name;
    const newItem = { id: this.id, name: this.name, calories: this.calories };
    this.state.items.push(newItem);
    return newItem;
  }

  getItems() {
    return this.state.items;
  }

  getTotalCalories() {
    const total = this.state.items.reduce((sum, item) => sum + Number(item.calories), 0);
    this.state.totalCalories = total;
    return this.state.totalCalories;
  }

  getCurrentItem() {
    return this.state.currentItem;
  }

  findCurrentItem(id) {
    this.currentItem = this.state.items.find(item => item.id === id);
    return this.currentItem || null;
  }

  setCurrentItem(itemToEdit) {
    this.state.currentItem = itemToEdit;
  }

  updateItem(name, calories) {
    this.calories = Number(calories);
    const found = this.state.items.find(item => item.id === this.state.currentItem.id);
    if (found) {
      found.name = name;
      found.calories = calories;
    }
    return found;
  }

  deleteItem(currentItemId) {
    const index = this.state.items.findIndex(item => item.id === currentItemId);
    this.state.items.splice(index, 1);
    this.state.currentItem = null;
  }

  deleteAllItems() {
    const allItems = this.state.items.map(item => item.id);
    this.state.items = [];
    return allItems;
  }

  logData() {
    return this.state;
  }
}
const itemCtrl = new ItemCtrl();
export default itemCtrl;
