import itemCtrl from './itemController';
import uiCtrl from './uiController';
import Http from './httpLib';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';


function init() {
  // option:
  // function* createIds() {
  //   let index = 10;
  //   while (true) {
  //     yield index += 1;
  //   }
  // }
  // const gen = createIds();

  function itemAddSubmit(e) {
    const input = uiCtrl.getItemInput();
    if (input !== null) {
      const { name, calories } = { ...input };
      if (name !== '' && calories !== '') {
        // const id = gen.next().value;
        const newItem = itemCtrl.addItem(name, calories);
        uiCtrl.addListItem(newItem);
        Http.post('http://localhost:3000/meals', newItem);
        const newCalories = itemCtrl.getTotalCalories();
        uiCtrl.showTotalCalories(newCalories);
        uiCtrl.clearInput();
      }
    } else {
      uiCtrl.clearInput();
    }
    e.preventDefault();
  }

  function openEditState(e) {
    if (e.target.classList.contains('fa-pen')) {
      const listId = e.target.parentElement.parentElement.id;
      const id = parseInt(listId.split('-')[1], 10);
      const itemToEdit = itemCtrl.findCurrentItem(id);
      itemCtrl.setCurrentItem(itemToEdit);
      uiCtrl.showEditItem();
    }
    e.preventDefault();
  }

  function itemEditSubmit(e) {
    const input = uiCtrl.getItemInput();
    const updatedItem = itemCtrl.updateItem(input.name, input.calories);
    uiCtrl.updateListItem(updatedItem);
    const newCalories = itemCtrl.getTotalCalories();
    uiCtrl.showTotalCalories(newCalories);
    Http.put(`http://localhost:3000/meals/${updatedItem.id}`, updatedItem);
    uiCtrl.clearEditState();
    e.preventDefault();
  }

  function deleteItemSubmit(e) {
    const currentItemId = itemCtrl.getCurrentItem().id;
    itemCtrl.deleteItem(currentItemId);
    uiCtrl.deleteItemFromUi(currentItemId);
    const newCalories = itemCtrl.getTotalCalories();
    uiCtrl.showTotalCalories(newCalories);
    Http.delete(`http://localhost:3000/meals/${currentItemId}`);
    uiCtrl.clearEditState();
    e.preventDefault();
  }

  function clearAllItemsSubmit(e) {
    if (confirm('Are you sure?')) {
      const allItemsIds = itemCtrl.deleteAllItems();
      const newCalories = itemCtrl.getTotalCalories();
      uiCtrl.showTotalCalories(newCalories);
      uiCtrl.clearAllItems();
      allItemsIds.forEach(id => Http.delete(`http://localhost:3000/meals/${id}`));
      uiCtrl.hideList();
      uiCtrl.clearEditState();
    }
    e.preventDefault();
  }

  function loadEventListeners() {
    document.querySelector(uiCtrl.addBtn).addEventListener('click', itemAddSubmit);
    document.querySelector(uiCtrl.itemList).addEventListener('click', openEditState);
    document.querySelector(uiCtrl.updateBtn).addEventListener('click', itemEditSubmit);
    document.querySelector(uiCtrl.backBtn).addEventListener('click', uiCtrl.clearEditState);
    document.querySelector(uiCtrl.deleteBtn).addEventListener('click', deleteItemSubmit);
    document.querySelector(uiCtrl.clearAllBtn).addEventListener('click', clearAllItemsSubmit);
  }

  function fetchItems() {
    Http.get('http://localhost:3000/meals').then((data) => {
      if (data.length === 0) {
        uiCtrl.hideList();
      } else {
        itemCtrl.getAllItems(data);
        uiCtrl.populateItemList(data);
        const newCalories = itemCtrl.getTotalCalories();
        uiCtrl.showTotalCalories(newCalories);
      }
    }).catch(err => err);
  }
  document.addEventListener('keypress', (e) => {
    if (e.keyCode === 13 || e.which === 13) {
      e.preventDefault();
    }
    return false;
  });

  uiCtrl.clearEditState();
  fetchItems();
  loadEventListeners();
}


export default init;
