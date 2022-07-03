import $ from "jquery";

// import currency from "currency.js";

import Selection from "./components/Selection";
import FindParent from "./components/FindParent";
import DevikidInfo from "./components/DevikidInfo";
// import UserRoster from "./components/UserRoster";
import Nursery from "./components/Nursery";
import Compare from "./components/Compare";

$("#select-action").each((index, element) => new Selection(element));
$(".find-parent").each((index, element) => new FindParent(element));
$(".devikid-info").each((index, element) => new DevikidInfo(element));
// $(".user-roster-info").each((index, element) => new UserRoster(element));
$(".nursery-info").each((index, element) => new Nursery(element));
$(".compare-info").each((index, element) => new Compare(element));
// console.log($(".selection").length)


const d1 = $("#forbeer1");
const d2 = $("#forbeer2");
$(d1).find('img').on("click", function(){
  copyToClipboard(this.parentNode.childNodes[1]);
})
$(d2).find('img').on("click", function(){
  copyToClipboard(this.parentNode.childNodes[1]);
})
$(d1).find('input').on("click", function(){
  copyToClipboard(this);
})
$(d2).find('input').on("click", function(){
  copyToClipboard(this);
})
function copyToClipboard(x) {
  /* Get the text field */
  var copyText = x;
  /* Select the text field */
  copyText.value;
  copyText.setSelectionRange(0, 99999); /* For mobile devices */

  /* Copy the text inside the text field */
  navigator.clipboard.writeText(copyText.value);
  // navigator.clipboard.writeText(text)
}



// DVK Price
let dvk_price = 0; 
let php_price = 0; 
async function get_dvk_price()
{
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://prices.endpoints.services.klever.io/v1/prices", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = async function(){
      // console.log(this)
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          let value = JSON.parse(this.response)
          dvk_price = value.symbols[0].price
          

          document.querySelector("#dvk-price .usd-price").innerHTML = "$"+ dvk_price.toFixed(6);
          get_dvk_price2(dvk_price)
      } else {
          document.querySelector("#dvk-price .usd-price").innerHTML = "$-";
      }
    }
    xhr.send(JSON.stringify({"names": "DVK/USDT"}));
}

get_dvk_price();
setInterval(() => {
  get_dvk_price();
}, 30000);

// console.log(process.env);


async function get_dvk_price2(dvk_price)
{
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.coingecko.com/api/v3/simple/price?ids=usd&vs_currencies=php", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = async function(){
      // console.log(JSON.parse(this.response).usd.php)
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            let value = JSON.parse(this.response);
            php_price = value.usd.php * dvk_price;
            document.querySelector("#dvk-price .php-price").innerHTML = "₱"+ php_price.toFixed(6);
            // document.querySelector("#dvk-price > div").innerHTML = "$"+ value.symbols[0].price.toFixed(6);
			
        }
    }
    xhr.send();
}
