import $ from "jquery";

const setSelected = "devikid";
class Selection {
  constructor(element) {
    this.$element = $(element);
    this.addListeners();
    
  }

  addListeners() {
    let selected = setSelected;
    this.$element.on("change", function(){
      selected = $(this).find(":selected").val()
      this.findParent = $(".find-parent");
      this.devikidInfo = $(".devikid-info");
      // console.log(selected)
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

    getURLParams()
    function getURLParams() {
      var url_string = window.location.href;
      var url = new URL(url_string);
      var c = url.searchParams.get("s");
      // paramsProduct = c;
      for (let index = 0; index < $(".selection").length; index++) {
        $($(".selection")[index]).removeClass("selection--selected");
      }

      $(`[data-select='${c ? c : setSelected}']`).addClass("selection--selected");
      $("#select-action").val(c ? c : setSelected);
    }
  }
}

export default Selection;
