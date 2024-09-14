let totalPriceBanner = document.querySelectorAll("#totalPrice");
//console.log(totalPriceBanner);
//let totalPriceBottom = document.querySelector("#totalPriceBottom");

const clientName = document.querySelector('#clientName');
let formHeader = document.querySelector('#formHeader');
let customizationSection = document.querySelectorAll('.customization-section');
let container = document.querySelector('.form-container');
let order = document.querySelector('#order');

let orderClientName = document.querySelector('#orderClientName');
let orderPancaceOptions = document.querySelector('#orderPancaceOptions');
let orderDelivery = document.querySelector('#orderDelivery');
let orderTotalPrice = document.querySelector('#orderTotalPrice');

function totalCounter() {
    //console.log(chosenTypePrice, typeof (chosenTypePrice));

    let chosenAdds = document.getElementsByTagName('input');
    //console.log(chosenAdds);
    //console.log("The first checkbox's value is:" + chosenAdds[0].value);
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
    //console.log("Total price is " + totalPrice);
    for (i = 0; i < totalPriceBanner.length; i++) {
        totalPriceBanner[i].textContent = "$" + totalPrice;
    }
}

function priceBannerAnimation() {
    let banner = document.querySelector('.price-banner');
    banner.style.animationName = 'priceBannerAnimation';
    banner.style.backgroundImage = 'url(./public/images/Spinner@1x-1.0s-200px-200px.gif)';
    setTimeout(() => {
        banner.style.animationName = '';
        banner.style.backgroundImage = '';
    }, 1000);
}

function placeOrder() {
    orderClientName.textContent = clientName.value;

    formHeader.textContent = 'Your order is: ';
    order.classList.remove('hidden'); // show order details

    customizationSection.forEach((section) => {
        section.classList.add('hidden');
    }) //hide all sustomization fields
}

addEventListener('change', totalCounter);
addEventListener('change', priceBannerAnimation);