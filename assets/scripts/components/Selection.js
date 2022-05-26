import $ from "jquery";

class Selection {
  constructor(element) {
    this.$element = $(element);
    this.addListeners();
  }

  addListeners() {
    let selected = "deviparents";
    this.$element.on("change", function(){
      selected = $(this).find(":selected").val()
      this.findParent = $(".find-parent");
      this.devikidInfo = $(".devikid-info");
      console.log(selected)
      if(selected === "deviparents"){
        handleRemoveSelection()
        this.findParent.addClass("selection--selected");
      } else if(selected === "devikid"){
        handleRemoveSelection()
        this.devikidInfo.addClass("selection--selected")
      }

      function handleRemoveSelection() {
        for (let index = 0; index < $(".selection").length; index++) {
          $($(".selection")[index]).removeClass("selection--selected");
        }
      }
    })
  }
}

export default Selection;
