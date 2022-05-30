import $ from "jquery";
import Selection from "./components/Selection";
import FindParent from "./components/FindParent";
import DevikidInfo from "./components/DevikidInfo";
// import UserRoster from "./components/UserRoster";
import Nursery from "./components/Nursery";

$("#select-action").each((index, element) => new Selection(element));
$(".find-parent").each((index, element) => new FindParent(element));
$(".devikid-info").each((index, element) => new DevikidInfo(element));
// $(".user-roster-info").each((index, element) => new UserRoster(element));
$(".nursery-info").each((index, element) => new Nursery(element));
// console.log($(".selection").length)



$(".send-love img").on("click", function(){
  copyToClipboard();
})
$("#forbeer").on("click", function(){
  copyToClipboard();
})
function copyToClipboard() {
  /* Get the text field */
  var copyText = document.getElementById("forbeer");

  // /* Select the text field */
  copyText.value;
  copyText.setSelectionRange(0, 99999); /* For mobile devices */

  /* Copy the text inside the text field */
  navigator.clipboard.writeText(copyText.value);
  // navigator.clipboard.writeText(text)
}



// DVK Price
let dvk_price = 0; 
async function get_dvk_price()
{
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://prices.endpoints.services.klever.io/v1/prices", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = async function(){
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            let value = JSON.parse(this.response)
            dvk_price = value.symbols[0].price
            

            document.querySelector("#dvk-price > div").innerHTML = "$"+ value.symbols[0].price.toFixed(6);
			
        } else {
            document.querySelector("#dvk-price > div").innerHTML = "$-";
        }
    }
    xhr.send(JSON.stringify({"names": "DVK/TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t"}));
}
get_dvk_price();
