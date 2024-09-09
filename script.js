let totalPriceBanner = document.querySelectorAll("#totalPrice");
//console.log(totalPriceBanner);
//let totalPriceBottom = document.querySelector("#totalPriceBottom");

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

}



addEventListener('change', totalCounter);
addEventListener('change', priceBannerAnimation);