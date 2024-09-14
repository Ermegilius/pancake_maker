let totalPriceBanner = document.querySelectorAll("#totalPrice");
//console.log(totalPriceBanner);
//let totalPriceBottom = document.querySelector("#totalPriceBottom");

const clientName = document.querySelector('#clientName');
let formHeader = document.querySelector('#formHeader');//changes from "custimize" to "your order"
let customizationSection = document.querySelectorAll('.customization-section');//whole form, hides after order button
let container = document.querySelector('.form-container');
let order = document.querySelector('#order');//whole order form, hidden initially, appears after the order button

//here are the fields from the order form (appears after the order button):
let orderClientName = document.querySelector('#orderClientName');//client's name
let orderPancakeOptions = document.querySelector('#orderPancakeOptions'); // all pankake's options
let orderDelivery = document.querySelector('#orderDelivery');//chosen delivery option
let orderTotalPrice = document.querySelector('#orderTotalPrice');  //total price

//this function returns the totall price of the order
function totalCounter() {
    let chosenAdds = document.getElementsByTagName('input'); //all inputs on the page
    let chosenAddsPrice = 0;
    for (let i = 0; i < chosenAdds.length; i++) {
        let checkedValue = 0;
        if (chosenAdds[i].checked) {
            checkedValue = +chosenAdds[i].value;
            chosenAddsPrice += checkedValue;
        }
    }

    let chosenType = document.querySelector("#type");
    let chosenTypePrice = +chosenType.value;
    //console.log("Chosen adds price is " + chosenAddsPrice);
    totalPrice = chosenTypePrice + chosenAddsPrice;
    // console.log("Total price is " + totalPrice);
    for (i = 0; i < totalPriceBanner.length; i++) {
        totalPriceBanner[i].textContent = "$" + totalPrice;
    }
}

//this is a price-banner animation
function priceBannerAnimation() {
    let banner = document.querySelector('.price-banner');
    banner.style.animationName = 'priceBannerAnimation';
    banner.style.backgroundImage = 'url(./public/images/Spinner@1x-1.0s-200px-200px.gif)';
    setTimeout(() => {
        banner.style.animationName = '';
        banner.style.backgroundImage = '';
    }, 1000);
}

//hides order customization and unhides order info
function placeOrder() {
    if (clientName.value.trim() === '') {
        alert("Please write your name.");
    } else {
        //name section:
        orderClientName.textContent = clientName.value; //insert clients name from input

        //pancake options section:
        //type option:
        let chosenType = document.querySelector("#type");
        let chosenAdds = document.querySelectorAll('input[type="checkbox"]:checked');
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(`${chosenType.options[chosenType.selectedIndex].textContent}`));
        orderPancakeOptions.appendChild(li);

        //toppings and extras options:
        for (let i = 0; i < chosenAdds.length; i++) {
            if (chosenAdds[i]) {
                let li = document.createElement("li");
                li.appendChild(document.createTextNode(chosenAdds[i].nextSibling.textContent));
                orderPancakeOptions.appendChild(li);
            }
        }

        // orderPancakeOptions.textContent = ;
        let selectedDelivery = document.querySelector('input[name="deliveryInfo"]:checked');//get checked delivery input
        let selectedDeliveryLabel = document.querySelector(`label[for="${selectedDelivery.id}"]`);//get label of the checked delivery input
        orderDelivery.textContent = selectedDeliveryLabel.textContent;//change field to the text content of the label of the checked delivery input
        orderTotalPrice.textContent = `$${totalPrice}`;

        // show order details
        formHeader.textContent = 'Your order is: ';
        order.classList.remove('hidden');

        //hide all sustomization fields
        customizationSection.forEach((section) => {
            section.classList.add('hidden');
        })
    }
}

addEventListener('change', totalCounter);
addEventListener('change', priceBannerAnimation);