import $ from "jquery";
import {nurseryPersonality} from './constant';

class Selection {
  constructor(element) {
    this.$element = $(element);
    this.$nurseryItems = this.$element.find(".nursery-item");
    this.$itemsCont = this.$nurseryItems.find("> div");
    this.$nurseryPersonality = this.$element.find(".nursery-personality");
    this.addListeners();
  }

  addListeners() {
    
    this.handleRenderPersonality();
    this.handleSelectedPersonality()
  }

  handleRenderPersonality() {
    nurseryPersonality.forEach(element => {
      let div = `
        <div class='nursery-personality-${element.personality}' style='background: #1d1a2f url(${element.img});' data-personality='${element.personality}'>${element.personality}</div>
      `
      this.$nurseryPersonality.append(div)
    });
  }

  handleSelectedPersonality() {
    const select = this.$nurseryPersonality.find(">div");
    select.on("click", function() {
      // console.log($(this).attr("data-personality"))
      handleSelectedItems($(this).attr("data-personality"));
      for (let index = 0; index < select.length; index++) {
        $(select[index]).removeClass('selected');
      }
      $(this).addClass('selected')
    })

    function handleSelectedItems(personality) {
      $(".nursery-item > div").empty();
      nurseryPersonality.forEach(element => {
         if(element.personality === personality) {
          element.items.forEach(element2 => {
            console.log(element2);
            const appendItems = `
              <div><img src="${element2}" alt="${element.personality}" /></div>
            `;
            $(".nursery-item > div").append(appendItems);
          });
             
        }
      });
    }
  }

  
}

export default Selection;
