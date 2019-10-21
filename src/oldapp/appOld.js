// Storage controller

const StorageCtrl = (function
    (){

        return {
            storeItem: function(item) {
                let items;
                if(localStorage.getItem('items') === null) {
                    items = [];
                    items.push(item);
                    localStorage.setItem('items', JSON.stringify(items));
                } else {
                    items = JSON.parse(localStorage.getItem('items'));

                    items.push(item);
                    localStorage.setItem('items', JSON.stringify(items));
                }
                
            },
            getItemsFromStorage: function() {
                let items;
                if(localStorage.getItem('items') === null) {
                    items = [];
                } else {
                    items = JSON.parse(localStorage.getItem('items'));
                }
                return items;
            },
            updateItemInStorage: function(updatedItem) {
                let items = JSON.parse(localStorage.getItem('items'));
                items.forEach( (item, index) => {
                    if(updatedItem.id === item.id) {
                        items.splice(index, 1, updatedItem);
                    }
                } );
                localStorage.setItem('items', JSON.stringify(items));
            },
            deleteItemFromStorage: function(id) {
                let items = JSON.parse(localStorage.getItem('items'));
                items.forEach( (item, index) => {
                    if(id === item.id) {
                        items.splice(index, 1);
                    }
                } );
                localStorage.setItem('items', JSON.stringify(items));
            },
            deleteAllItemsFromStorage: function() {
                localStorage.removeItem('items');
            },
        }



    })();


//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Item controller

const ItemCtrl = (function () {
     // Item constructor
     const Item = function(id, name, calories) {
        this.id = id;
        this.name = name
        this.calories = calories;
     }

     // Data structure / State
    const data = {
        //items: [
            // { id: 0, name: 'Steak Dinner', calories: 1200 },
            // { id: 1, name: 'Cookie', calories: 400 },
            // { id: 2, name: 'Eggs', calories: 300 },
       // ],
        items: StorageCtrl.getItemsFromStorage(),
        currentItem: null,
        totalCalories: 0,
    }

    
    return {
        getItems: function() {
            return data.items;
        },
        logData: function() {
            return data;
        },
        addItem: function(name, calories) {
            let id;
            // Create ID
            if(data.items.length > 0) {
                id = data.items[data.items.length - 1].id + 1;
            } else {
                id = 0;
            }
            // Calories to number
            calories = parseInt(calories);
            // Create new item
            newItem = new Item(id, name, calories);
            data.items.push(newItem);

            return newItem;
        },
        getItemById: function(id) {
            let found = null;
            data.items.forEach(item => {
                if(item.id === id) {
                    found = item;
                }
            })
           return found;
        },
        
        updateItem: function(name, calories) {
            calories = parseInt(calories);
            let found = null;
            data.items.forEach(item => {
                if(item.id === data.currentItem.id) {
                    item.name = name;
                    item.calories = calories;
                    found = item;
                }               
            })
            return found;
        },
        deleteItem: function(id) {
            const ids = data.items.map(function(item) {
                return item.id;
            });
            // get index
            const index = ids.indexOf(id);
            // remove from array
            data.items.splice(index, 1);
        },
        clearAllItems: function() {
            data.items = [];
        },
        getTotalCalories: function() {
           let total = 0;
           data.items.forEach(item => {
             total += item.calories;
           });
           data.totalCalories = total;

           return data.totalCalories;
        },
        setCurrentItem: function(item) {
            data.currentItem = item;
        },
        getCurrentItem: function() {
            return data.currentItem;
        }
    }

})();

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Ui Controller 

const UICtrl = (function () {

    const UISelectors = {
        itemList: '#item-list',
        clearAllBtn:'.clear-btn',
        addBtn: '.add-btn',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        totalCalories: '.total-calories',
        listItems: '#item-list li',
    }

    return {
        populateItemList: function(items) {
            let output = '';
            items.forEach(item => {
                output += `<li id="item-${item.id}" class="collection-item">
                            <strong> ${item.name}: </strong> <em> ${item.calories} Calories</em>
                            <a href="#" class="secondary-content"><i class="edit-item fas fa-pen"></i></a>
                            </li>`;               
            });
            document.querySelector(UISelectors.itemList).innerHTML = output;
        },
        getItemInput: function() {
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value,
            }
        },
        addListItem: function(item) {
            // Show the list 
            document.querySelector(UISelectors.itemList).style.display='block';
            // Create element
            const li = document.createElement('li');
            li.className = 'collection-item';
            li.id=`item-${item.id}`;
            li.innerHTML=`<strong> ${item.name}: </strong> <em> ${item.calories} Calories</em>
            <a href="#" class="secondary-content"><i class="edit-item fas fa-pen"></i></a>`;            
            // Insert item
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);   
           
        },
        updateListItem: function(item) {
            let listItems = document.querySelectorAll(UISelectors.listItems);    
            // turn node list into array
            listItems = Array.from(listItems);             
            listItems.forEach(function(listItem) {
                const itemId = listItem.getAttribute('id');
                if(itemId === `item-${item.id}`) {
                    
                    document.querySelector(`#${itemId}`).innerHTML=`<strong> ${item.name}: </strong> <em> ${item.calories} Calories</em>
                    <a href="#" class="secondary-content"><i class="edit-item fas fa-pen"></i></a>`;
                }
            });            
        },   
        deleteListItem: function(id) {
            const itemId = `#item-${id}`;
            const item = document.querySelector(itemId);
            item.remove();
        },     
        removeAllItems: function() {
            let listItems = document.querySelectorAll(UISelectors.listItems);
            listItems = Array.from(listItems);
            listItems.forEach(item => item.remove());
        },
        showTotalCalories: function(totalCalories) {
            document.querySelector(UISelectors.totalCalories).textContent=totalCalories;
        },
        clearInput: function() {
            document.querySelector(UISelectors.itemNameInput).value='';
            document.querySelector(UISelectors.itemCaloriesInput).value='';
        },
        clearEditState: function(){
            UICtrl.clearInput();
            document.querySelector(UISelectors.updateBtn).style.display='none';
            document.querySelector(UISelectors.deleteBtn).style.display='none';
            document.querySelector(UISelectors.backBtn).style.display='none';
            document.querySelector(UISelectors.addBtn).style.display='inline';
            
        },
        showEditState: function(){
            document.querySelector(UISelectors.updateBtn).style.display='inline';
            document.querySelector(UISelectors.deleteBtn).style.display='inline';
            document.querySelector(UISelectors.backBtn).style.display='inline';
            document.querySelector(UISelectors.addBtn).style.display='none';
        },
        addItemToForm: function() {
            document.querySelector(UISelectors.itemNameInput).value=ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.itemCaloriesInput).value=ItemCtrl.getCurrentItem().calories;
            UICtrl.showEditState();
        },
        getSelectors: function() {
            return UISelectors;
        },
        hideList: function() {
            document.querySelector(UISelectors.itemList).style.display='none';
        },
    }
    
})();

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// App controller

const App = (function (ItemCtrl, UICtrl, StorageCtrl) {
    
    // Load event listeners

    const loadEventListeners = function() {
        // Get UI Selectors
        const UISelectors = UICtrl.getSelectors();

        // Add item event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

        // Disable submit on enter
        document.addEventListener('keypress', function(e) {
            if(e.keyCode === 13 || e.which === 13) {
                e.preventDefault();
                return false;
            }
        });

        // Edit icon event
        document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

        // Update edit item        
        document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);  
       
        // Back icon event        
        document.querySelector(UISelectors.backBtn).addEventListener('click', function(e) {
            UICtrl.clearEditState();
            e.preventDefault();
        });  
        
        // Delete icon event        
         document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);   

         // Clear all event
         document.querySelector(UISelectors.clearAllBtn).addEventListener('click', clearAllItemsClick);          

    }

    //Add item submit
    const itemAddSubmit = function(e) {                
        // Get form input from UI controller
        const input = UICtrl.getItemInput();
       
        //Check for name and calories input
        if(input.name !== '' && input.calories !== '') {
            // Add item 
            const newItem = ItemCtrl.addItem(input.name, input.calories);
            // Add item to UI
            UICtrl.addListItem(newItem); 
            
            // Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();
            // Add total calories to UI
            UICtrl.showTotalCalories(totalCalories);

            // Store in localStorage

            StorageCtrl.storeItem(newItem);

            // Clear input fields
            UICtrl.clearInput();              
        } 

        e.preventDefault();
    }

    // Click edit item
    const itemEditClick  = function(e) {
        if(e.target.classList.contains('edit-item')) {
            // Get list item id
            const listId = e.target.parentNode.parentNode.id;
            // Break into array and get actual id
            const listIdArray = listId.split('-');
            const id = parseInt(listIdArray[1]);

            // Get item
            const itemToEdit = ItemCtrl.getItemById(id);
           // Set current item
           ItemCtrl.setCurrentItem(itemToEdit);

           // Add item to form
           UICtrl.addItemToForm();
        }         
        e.preventDefault();
    }

    // Item Update submit 

    const itemUpdateSubmit = function(e) {
        
        const input = UICtrl.getItemInput();
        const updatedItem = ItemCtrl.updateItem(input.name, input.calories);
       // Update UI
       UICtrl.updateListItem(updatedItem);

        // Get total calories
        const totalCalories = ItemCtrl.getTotalCalories();
        // Add total calories to UI
        UICtrl.showTotalCalories(totalCalories);

        StorageCtrl.updateItemInStorage(updatedItem);

        UICtrl.clearEditState();

       e.preventDefault();
    }

    // Item Delete submit 
    const itemDeleteSubmit = function(e) {        
        //Get current item
        const currentItem = ItemCtrl.getCurrentItem();

        //Delete from data structure
        ItemCtrl.deleteItem(currentItem.id);

        // Delete from UI
        UICtrl.deleteListItem(currentItem.id);

        // Delete from Local Storage
        StorageCtrl.deleteItemFromStorage(currentItem.id);
        
        // Get total calories
        const totalCalories = ItemCtrl.getTotalCalories();
        // Add total calories to UI
        UICtrl.showTotalCalories(totalCalories);
  
        UICtrl.clearEditState();

        e.preventDefault();
    }

    const clearAllItemsClick = function() {
        // Delete all items from data structure
        ItemCtrl.clearAllItems();

        // Get total calories
        const totalCalories = ItemCtrl.getTotalCalories();
        // Add total calories to UI
        UICtrl.showTotalCalories(totalCalories);

        // Delete all items from UI
        UICtrl.removeAllItems();

        // Delete all items from Local Storage
        StorageCtrl.deleteAllItemsFromStorage();

        UICtrl.hideList();

    }

    return {
        init: function() {
            console.log('Initialising app...');
            // Set initial state
            UICtrl.clearEditState();

            // Fetch items from data structute
            const items = ItemCtrl.getItems();

            // Check if any items
            if(items.length === 0) {
                UICtrl.hideList();
            } else {
               // Populate list with items
                UICtrl.populateItemList(items); 
            }

            // Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();
            // Add total calories to UI
            UICtrl.showTotalCalories(totalCalories);

            // Load event listeners
            loadEventListeners();
        }
    }
    
})(ItemCtrl, UICtrl, StorageCtrl);


App.init();
// console.log(ItemCtrl.getItems());