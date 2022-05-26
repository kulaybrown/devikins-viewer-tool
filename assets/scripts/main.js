import $ from "jquery";
import Selection from "./components/Selection";
import FindParent from "./components/FindParent";
import DevikidInfo from "./components/DevikidInfo";

$("#select-action").each((index, element) => new Selection(element));
$(".find-parent").each((index, element) => new FindParent(element));
$(".devikid-info").each((index, element) => new DevikidInfo(element));
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