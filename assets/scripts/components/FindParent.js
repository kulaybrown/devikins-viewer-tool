import $ from "jquery";

class FindParent {
  constructor(element) {
    this.$element = $(element);
    this.$selectInput = this.$element.find("input");
    this.$selectButton = this.$element.find("button");
    
    // this.$optionItem = this.$optionlist.find(".select-dropdown-option-item");
    this.addListeners();
}

addListeners() {
    this.$selectButton.on("click", this.handleClickFindParent.bind(this));
    // this.$optionItem.on("click", this.handleSelect.bind(this));
    // $($selectButton).on("click", (event) => {
    //   const $target = $(event.target);
    //   if (!$target.closest(".select-dropdown").is(this.$element.get(0))) {
    //     this.$element.removeClass("select-dropdown--open");
    //   }
    // });

    
  }

  handleGetChildID() {
    return this.$selectInput.val();
  }

  handleClickFindParent() {
    const deviChildID = this.handleGetChildID();
    this.handleAPI(deviChildID)
  }

  handleAPI(deviChildID) {
    
    this.$parent2 = this.$element.find(".parent-2");

    $.ajax({
      url: `https://inventory.api.devikins.com/asset/${deviChildID}`,
      type: "GET", /* or type:"GET" or type:"PUT" */
      dataType: "json",
      data: {
      },
      success: function (result) {
        const parentContainer = $(".parent-container");
        const p1 = result.ParentHashList[0];
        const p2 = result.ParentHashList[1];
        $(parentContainer).empty()
        if($(result.ParentHashList).length > 1) {
          parentContainer.append(`<p>Parent 1: ${p1}</p>`);
          parentContainer.append(`<p>Parent 2: ${p2}</p>`);
          // $(".parent-1").text("Parent 1: " + p1)
          // $(".parent-2").text("Parent 2: " + p2)
        } else {
          parentContainer.append('<p>No Parent</p>');
        }
        console.log(result)
        // this.$parent1 = this.$element.find(".parent-1");
        
        // console.log(this.$element)
        // $(this.$parent1).text(p1)
        // $(this.$parent2).text(p2)
      },
      error: function () {
        console.log("error");
      }
    });
  }

  handleRenderParentID(p1, p2) {
    $(this.$parent1).text(p1)
    $(this.$parent2).text(p2)
  }
//   handleToggleClass() {
//     this.$element.toggleClass("select-dropdown--open");
//   }

//   handleSelect(e) {
//     const selectValue = $(e.target).text();
//     this.$select.text(selectValue);
//     this.handleToggleClass();
//   }
}

export default FindParent;
