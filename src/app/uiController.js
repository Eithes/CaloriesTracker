import ItemCtrl from './itemController';

class UiCtrl {
  constructor() {
    this.itemList = '#item-list';
    this.listItems = '#item-list li';
    this.updateBtn = '.update-btn';
    this.addBtn = '.add-btn';
    this.deleteBtn = '.delete-btn';
    this.backBtn = '.back-btn';
    this.clearAllBtn = '.clear-btn';
    this.itemNameInput = '#item-name';
    this.itemCaloriesInput = '#item-calories';
    this.totalCalories = '.total-calories';
    this.message = '#message';

    this.input = {
      name: '',
      calories: '',
    };
  }

  validateFields() {
    const reName = /^([a-zA-Z]{2,10})([ ][a-zA-Z]{2,10})?([ ][a-zA-Z]{2,10})?$/;
    const reCalories = /^[0-9]{1,4}$/;
    let name = document.querySelector(this.itemNameInput).value;
    name = name.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    let calories = document.querySelector(this.itemCaloriesInput).value;
    calories = calories.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    if (reName.test(name) && reCalories.test(calories)) {
      this.input.name = name;
      this.input.calories = calories;
      return true;
    }
    this.showMessage();
    return false;
  }

  showMessage() {
    const message = document.querySelector(this.message);
    message.classList.remove('hide');
    setTimeout(() => message.classList.add('hide'), 3000);
  }

  getItemInput() {
    const isValid = this.validateFields();
    if (isValid) return this.input;
    return null;
  }

  populateItemList(items) {
    let output = '';
    items.forEach((item) => {
      output += `
            <li class="collection-item" id="item-${item.id}">
                <strong> ${item.name}: </strong> <em> ${item.calories} Calories</em>
                <a href="#" class="secondary-content"><i class="fas fa-pen"></i></a>
            </li>
          `;
    });
    document.querySelector(this.itemList).innerHTML = output;
  }

  showEditStateButtons() {
    document.querySelector(this.updateBtn).style.display = 'inline';
    document.querySelector(this.deleteBtn).style.display = 'inline';
    document.querySelector(this.backBtn).style.display = 'inline';
    document.querySelector(this.addBtn).style.display = 'none';
  }

  showEditItem() {
    document.querySelector(this.itemNameInput).value = ItemCtrl.getCurrentItem().name;
    document.querySelector(this.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
    this.showEditStateButtons();
  }

  addListItem(item) {
    document.querySelector(this.itemList).style.display = 'block';
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.id = `item-${item.id}`;
    li.innerHTML = `
          <strong> ${item.name}: </strong> <em> ${item.calories} Calories</em>
          <a href="#" class="secondary-content"><i class="fas fa-pen"></i></a>
        `;
    document.querySelector(this.itemList).insertAdjacentElement('beforeend', li);
  }

  updateListItem(updatedItem) {
    const listItems = Array.from(document.querySelectorAll(this.listItems));
    const currentItem = listItems.find(item => item.id === `item-${updatedItem.id}`);
    currentItem.innerHTML = `
          <strong> ${updatedItem.name}: </strong> <em> ${updatedItem.calories} Calories</em>
          <a href="#" class="secondary-content"><i class="fas fa-pen"></i></a>
        `;
  }

  clearEditState() {
    this.clearInput();
    document.querySelector(this.updateBtn).style.display = 'none';
    document.querySelector(this.deleteBtn).style.display = 'none';
    document.querySelector(this.backBtn).style.display = 'none';
    document.querySelector(this.addBtn).style.display = 'inline';
  }

  deleteItemFromUi(currentItemId) {
    const itemId = `#item-${currentItemId}`;
    const item = document.querySelector(itemId);
    item.remove();
    return this.item;
  }

  clearAllItems() {
    const listItems = Array.from(document.querySelectorAll(this.listItems));
    listItems.forEach(item => item.remove());
  }

  clearInput() {
    document.querySelector(this.itemNameInput).value = '';
    document.querySelector(this.itemCaloriesInput).value = '';
  }

  hideList() {
    document.querySelector(this.itemList).style.display = 'none';
  }

  showTotalCalories(newCalories) {
    document.querySelector(this.totalCalories).textContent = newCalories;
  }
}

const uiCtrl = new UiCtrl();
export default uiCtrl;
