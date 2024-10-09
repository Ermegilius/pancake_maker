let orders = [];

const clientName = document.querySelector('#clientName');
let formHeader = document.querySelector('#formHeader');//get h1
let customizationSection = document.querySelectorAll('.customization-section');//get the whole customization sections, hides after the order button
let order = document.querySelector('#order');//whole order form, hidden initially, appears after the order button

// this function returns the total price of the order which is used for the banner, total price fields in the customization and order forms.
function totalCounter() {
    let inputs = document.getElementsByTagName('input'); //get all inputs on the page

    let orderTotalPrice = document.querySelector('#orderTotalPrice');  //get total price field in the order form
    let bannerTotalPrice = document.querySelector('#bannerTotalPrice');//get total price field in the banner
    let customTotalPrice = document.querySelector('#totalPrice');//get total price field in the customization form

    //this loop summs all values of checked inputs 
    let totalAddsPrice = 0;
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].checked) {
            totalAddsPrice += +inputs[i].value;
        }
    }

    let chosenType = document.querySelector("#type"); //get pancake type select field in 
    let totalPrice = +chosenType.options[chosenType.selectedIndex].value + totalAddsPrice;//summs pice of the chosen pancake type and all values of checked inputs

    orderTotalPrice.textContent = `$${totalPrice}`; //change total price field in the order form to the calculated total price
    bannerTotalPrice.textContent = `$${totalPrice}`;//change total price field in the banner to the calculated total price
    customTotalPrice.textContent = `$${totalPrice}`;//change total price field in the customization form to the calculated total price
}

//this is a price-banner animation:
function priceBannerAnimation() {
    let banner = document.querySelector('.price-banner');
    banner.style.animationName = 'priceBannerAnimation';
    banner.style.backgroundImage = 'url(./public/images/Spinner@1x-1.0s-200px-200px.gif)';
    setTimeout(() => {
        banner.style.animationName = '';
        banner.style.backgroundImage = '';
    }, 1000);
}

//this function hides order customization and unhides order info and puts required text to the order form
function placeOrder() {
    if (clientName.value.trim() === '') {
        alert("Please write your name.");//check if a client entered the name
    } else {
        //1) client's name:
        let orderClientName = document.querySelector('#orderClientName');//client's name field in the order form
        orderClientName.textContent = clientName.value; //insert client's name from input

        //2)delivery:
        let orderDelivery = document.querySelector('#orderDelivery');//chosen delivery option field in the order form
        let selectedDelivery = document.querySelector('input[name="deliveryInfo"]:checked');//get checked delivery input
        let selectedDeliveryLabel = document.querySelector(`label[for="${selectedDelivery.id}"]`);//get label of the checked delivery input
        orderDelivery.textContent = selectedDeliveryLabel.textContent;//change field in the order form to the text content of the label of the checked delivery input

        //3)pancake type, toppings and extras options:
        let orderPancakeOptions = document.querySelector('#orderPancakeOptions'); // get ul of all pancake options in the order form
        let chosenAdds = document.querySelectorAll('input[type="checkbox"]:checked');//get all checked pancake's options checkboxes
        let chosenType = document.querySelector("#type"); //get pancake type select field in 
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(`${chosenType.options[chosenType.selectedIndex].textContent}`));
        orderPancakeOptions.appendChild(li);//append chosen pancake type to the ul

        // this loop appends every checked checkbox label to the ul
        for (let i = 0; i < chosenAdds.length; i++) {
            if (chosenAdds[i]) {
                let li = document.createElement("li");
                li.appendChild(document.createTextNode(chosenAdds[i].nextSibling.textContent));
                orderPancakeOptions.appendChild(li);
            }
        }

        // show order details div
        formHeader.textContent = 'Your order is: ';
        order.classList.remove('hidden');

        //hide customization div
        customizationSection.forEach((section) => {
            section.classList.add('hidden');
        })
        orders.push({
            clientsName: clientName.value,
            pancakeAdds: orderPancakeOptions.innerText.replace(/(\r\n|\n|\r)/gm, ", "),
            delivery: selectedDeliveryLabel.textContent,
            price: +totalPrice.textContent.slice(1),
        });
        console.log(orders);
    }
}

function returnBack() {
    order.classList.add('hidden');
    customizationSection.forEach((section) => {
        section.classList.remove('hidden');
    });

    let inputs = document.getElementsByTagName('input');
    Array.from(inputs).forEach((input) => {
        input.value = "";
    });
}

addEventListener('change', totalCounter);
addEventListener('change', priceBannerAnimation)