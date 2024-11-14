import { menuArray } from './data.js';

// Create menu items
const items = menuArray.map(item => {
    const { name, ingredients,id,  price, emoji } = item;
    return `
       
            <div class="flex-col">
                <p id="emoji">${emoji}</p>
                <div> 
                    <h3 class="align-name-icon">${name}</h3>
                    <p>${ingredients}</p>
                    <p>$${price}</p> 
                </div>
                <img  data-id="${id}" class="add-item " src="plus.png" alt="plus" />
              
            </div>
              <hr>
        
    `;
}).join('');



// Insert menu items into the DOM
document.getElementById("container").innerHTML = items;

let sum=0;
// Function to get added items and generate order HTML
const getAddedItems =  menuArray.map(item => {
   sum =  sum+ item.price;
        return `
           
            <div class="items-flex-row">
                <p>${item.name}</p>
                <p>remove</p>
                <p id="price">${item.price}</p> 
            </div>
           
        `;
    }).join('');

    const addedItems = [];
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('add-item')) {
            const itemId = event.target.getAttribute('data-id');
            addedItems.push(menuArray[itemId]);
            console.log(addedItems)
            displayAddedItems(addedItems)
        }
    });

    function displayAddedItems(items) {
        const itemsContainer = document.getElementById('ur-order-wrapper');
        itemsContainer.innerHTML = ''; // Clear previous items
       
        // Add "Your Order" title
    const orderTitle = document.createElement('h2');
    orderTitle.id = 'your-order-title';
    orderTitle.textContent = 'Your Order';
    itemsContainer.appendChild(orderTitle);

   
 

    items.forEach(item => {
        const itemElement = document.createElement('div');
       // Add a class to the div
        itemElement.innerHTML = `<p>${item.name}</p> <p>remove</p>  <p id="item-price">$${item.price}</p>`;
        itemsContainer.appendChild(itemElement);
        itemElement.classList.add('order-item'); 
    });

     // Calculate total price
     const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

     // Add total price section
     const totalPriceContainer = document.createElement('div');
     totalPriceContainer.id = 'total-price';
     totalPriceContainer.innerHTML = `
         <p>Total Price</p>
         <p id="total-price-value">$${totalPrice}</p>
     `;
     totalPriceContainer.classList.add('order-item'); 
     itemsContainer.appendChild(totalPriceContainer);


        // Add complete order button
    const completeOrderButton = document.createElement('button');
    completeOrderButton.id = 'complete-order';
    completeOrderButton.className = 'btn';
    completeOrderButton.classList.add('complete-order'); 
    completeOrderButton.textContent = 'Complete Order';
    itemsContainer.appendChild(completeOrderButton);
    }

    // Add event listener to complete order button
    document.addEventListener('click', function(event) {
        console.log("btn clicked !!")
        if (event.target.classList.contains('complete-order')) {
            displayPayementPopUp();
        }
    });
    function displayPayementPopUp() { 
        const popUpContainer = document.getElementById('pop-up');
        popUpContainer.classList.remove('hidden');
       
       
    }

    // Add event listener to the Pay button
document.getElementById('submit').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent form submission
    const ThankYouElement = document.getElementById('p-thank-you');
    ThankYouElement.classList.remove('hidden');
    const popUpContainer = document.getElementById('pop-up');
    popUpContainer.classList.add('hidden'); // Hide the pop-up
});