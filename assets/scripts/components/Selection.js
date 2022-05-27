import $ from "jquery";

class Selection {
  constructor(element) {
    this.$element = $(element);
    this.addListeners();
  }

  addListeners() {
    let selected = "devikid";
    this.$element.on("change", function(){
      selected = $(this).find(":selected").val()
      this.findParent = $(".find-parent");
      this.devikidInfo = $(".devikid-info");
      console.log(selected)
      handleRemoveSelection();
      $(`[data-select='${selected}']`).addClass("selection--selected");

      function handleRemoveSelection() {
        for (let index = 0; index < $(".selection").length; index++) {
          $($(".selection")[index]).removeClass("selection--selected");
        }
      }
    })
    
    handleSetSelectionActive()
    function handleSetSelectionActive() {
      $(`[data-select='${selected}']`).addClass("selection--selected");
      $("#select-action").val(selected);
    }
  }
}

export default Selection;
