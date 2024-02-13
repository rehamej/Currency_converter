const dropList = document.querySelectorAll (".drop select"); //.to
fromcurrency = document.querySelector (".from select");
tocurrency = document.querySelector (".to select");
getButton = document.querySelector ("form button");

for(let i = 0; i < dropList.length; i++) {
    for(country_code in country_code){
        //craeting option tag with passing country code as text and a value 

        //${country_code} within value="${country_code}": This sets the value attribute of the <option> tag to the value of the country_code variable. This allows you to associate a specific value with each option in a dropdown list.
        //${country_code} between the opening and closing <option> tags: This inserts the value of country_code as the text content of the <option> element. This is what will be displayed as the selectable option in the dropdown list.

        //overall, this line of code creates an HTML <option> tag dynamically using the value of the country_code variable. 
        let optionTag = `<option value= "${country_code}">${country_code}</option>`;

        //1-'insertAdjacentHTML()' method to dynamically insert HTML content into an element.
        //2-dropList[i]: This accesses the ith element in the dropList array. The dropList array is assumed to contain DOM elements,
        //3-.insertAdjacentHTML("beforeend", optionTag): This is a method call on the selected DOM element (dropList[i]). It inserts the specified HTML content (optionTag) into the DOM tree relative to the selected element.
        //4-"beforeend": This parameter specifies the position relative to the element's content, indicating that the HTML content should be inserted just before the end of the element's content.
        //5-optionTag: This is the HTML content (in this case, an <option> tag) that you want to insert into the selected element. It's a string variable containing the HTML code for an <option> element, likely generated dynamically based on some data or conditions.

        //**So, when this line of code is executed, it inserts the HTML content stored in the optionTag variable as a new <option> element inside the selected element (dropList[i]), effectively adding a new option to a dropdown list.
        dropList[i].insertAdjacentHTML("beforeend" , optionTag);
    }
    
}

getButton.addEventListener("click" , e => {
    e.preventDefault(); //يخلي الصفحع مايصير لها ريفريش
    getExchangeRate();
});

const exchangeIcon = document.querySelector(".drop .icon");
exchangeIcon.addEventListener("click" , ()=>{
    let tempCode = fromcurrency.value;
    fromcurrency.value = tocurrency.value;
    tocurrency.value = tempCode;
    getExchangeRate();
});

function getExchangeRate(){
    const amount = document.querySelector(".amount input");
    let amountVal = amount.value;
    if(amountVal == "" || amountVal == "0"){
        amount.value = "1";
        amountVal = 1;
    }

    // exchangerateTXT.innerHTML = "Hold on tight...";

    let url = `https://v6.exchangerate-api.com/v6/6ad9eb68aec9f76871e8aa26/latest/${fromcurrency.value}`;
    fetch(url).then(response => response.json()).then(result => {
        let exchangerate = result.conversion_rates[tocurrency.value]; //هنا مشكله
        console.log(exchangerate);
        let totalExchangeRate = (amountVal * exchangerate).toFixed(2); //دا يطلع العدد على اقرب عدد صحيح
        console.log(totalExchangeRate) ;
        const exchangerateTXT = document.querySelector(".exchange-rate");
        exchangerateTXT.innerHTML = `${amountVal} ${fromcurrency.value} = ${totalExchangeRate} ${tocurrency.value}`; //دا يحط الناتج الجديد في الخانه 
    });
}