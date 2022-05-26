import $ from "jquery";
import {handleImgIndexPath, handleRarity, handleGenes, handleAffinity} from "./helpers";

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
    this.$selectInput.on("keypress", function(e) {
      if (e.key === "Enter") {
        $(e.target).parent(".find-parent-action").find("button").trigger("click")
      }
    })
  }

  handleGetChildID() {
    return this.$selectInput.val();
  }

  handleClickFindParent() {
    const deviChildID = this.handleGetChildID();
    this.handleAPI(deviChildID)
  }

  handleAPI(deviChildID, x) {
    let deviGrandParent = [];
    let deviParent = [];
    let deviFamily = [];
    let deviData = [];
    $.ajax({
      url: `https://inventory.api.devikins.com/asset/${deviChildID}`,
      type: "GET", /* or type:"GET" or type:"PUT" */
      dataType: "json",
      data: {
      },
      success: function (result) {
        // console.log(result)
        const parentContainer = $(".parent-container");
        const p1 = result.ParentHashList[0];
        const p2 = result.ParentHashList[1];
        deviFamily.push(deviChildID)
        if($(result.ParentHashList).length > 1) {
          deviParent.push(p1, p2)
          deviFamily.push(p1, p2)
          handleFamilyData();
        }


        $(parentContainer).empty()
        // style='background-image: url(https://img.devikins.com/${x}/${deviChildID}.png);
        if($(result.ParentHashList).length > 1) {
         

          

          const grandparents = '<div class="generation" id="grand-parents"><div class="pair"></div><div class="pair"></div></div>'
          parentContainer.append(grandparents)
          for (let index = 0; index < result.ParentHashList.length; index++) {
            $.ajax({
              url: `https://inventory.api.devikins.com/asset/${result.ParentHashList[index]}`,
              type: "GET",
              dataType: "json",
              data: {
              },
              success: function (resultx) {
                const parentContainer2 = $(".parent-container");
                

                // const grandparents = '<div class="generation" id="grand-parents"><div class="pair"></div></div>'
                // parentContainer.append(grandparents)
                // console.log(deviChildID)
                // parentContainer2.find('.child-cont').append(`<div class='parent-item' devi-id='${p1}'>${p1}</div>`);
                
                const g1 = resultx.ParentHashList[0];
                const g2 = resultx.ParentHashList[1];
                if($(resultx.ParentHashList).length > 1) {
                  parentContainer2.find($('#grand-parents .pair')[index]).append(`<div class='grandparent-item card-m' ${g1 && `devi-id='${g1}'`} devi-rarity=''>
                    <div style='background-image: url(https://img.devikins.com/${handleImgIndexPath(g1)}/${g1}.png);'>
                      <div class='gene-cont'>
                        <div class='gene gene-mouth'></div>
                        <div class='gene gene-eye'></div>
                        <div class='gene gene-ear'></div>
                        <div class='gene gene-hair'></div>
                        <div class='gene gene-horn'></div>
                      </div>
                      <div class='devi-id'>${g1}</div>
                      <div class='devi-oa'></div>
                      <div class='aff-cont'>
                        <div class='aff-vit'><span></span></div>
                        <div class='aff-pow'><span></span></div>
                        <div class='aff-for'><span></span></div>
                        <div class='aff-agi'><span></span></div>
                        <div class='aff-san'><span></span></div>
                      </div>
                    </div>
                  </div>`);
                  parentContainer2.find($('#grand-parents .pair')[index]).append(`<div class='grandparent-item card-f' ${g2 && `devi-id='${g2}'`} devi-rarity=''>
                    <div style='background-image: url(https://img.devikins.com/${handleImgIndexPath(g2)}/${g2}.png);'>
                      <div class='gene-cont'>
                        <div class='gene gene-mouth'></div>
                        <div class='gene gene-eye'></div>
                        <div class='gene gene-ear'></div>
                        <div class='gene gene-hair'></div>
                        <div class='gene gene-horn'></div>
                      </div>
                      <div class='devi-id'>${g2}</div>
                      <div class='devi-oa'></div>
                      <div class='aff-cont'>
                        <div class='aff-vit'><span></span></div>
                        <div class='aff-pow'><span></span></div>
                        <div class='aff-for'><span></span></div>
                        <div class='aff-agi'><span></span></div>
                        <div class='aff-san'><span></span></div>
                      </div>
                    </div>
                  </div>`);
                } else {
                  parentContainer2.find($('#grand-parents .pair')[index]).append(`<div class='grandparent-item card-m no-parents'></div>`);
                  parentContainer2.find($('#grand-parents .pair')[index]).append(`<div class='grandparent-item card-f no-parents'></div>`);
                }
              },
              error: function () {
                console.log("error");
              }
            });
          }


          const parent = '<div class="generation" id="parents"><div class="pair"></div></div>'
          parentContainer.append(parent)
          parentContainer.find('#parents .pair').append(`<div class='parent-item card-m' ${p1 && `devi-id='${p1}'`} devi-rarity=''>
            <div style='background-image: url(https://img.devikins.com/${handleImgIndexPath(p1)}/${p1}.png);'>
              <div class='gene-cont'>
                <div class='gene gene-mouth'></div>
                <div class='gene gene-eye'></div>
                <div class='gene gene-ear'></div>
                <div class='gene gene-hair'></div>
                <div class='gene gene-horn'></div>
              </div>
              <div class='devi-id'>${p1}</div>
              <div class='devi-oa'></div>
              <div class='aff-cont'>
                <div class='aff-vit'><span></span></div>
                <div class='aff-pow'><span></span></div>
                <div class='aff-for'><span></span></div>
                <div class='aff-agi'><span></span></div>
                <div class='aff-san'><span></span></div>
              </div>
            </div>
          
          </div>`);
          parentContainer.find('#parents .pair').append(`<div class='parent-item card-f' ${p2 && `devi-id='${p2}'`} devi-rarity=''>
            <div style='background-image: url(https://img.devikins.com/${handleImgIndexPath(p2)}/${p2}.png);'>
              <div class='gene-cont'>
                <div class='gene gene-mouth'></div>
                <div class='gene gene-eye'></div>
                <div class='gene gene-ear'></div>
                <div class='gene gene-hair'></div>
                <div class='gene gene-horn'></div>
              </div>
              <div class='devi-id'>${p2}</div>
              <div class='devi-oa'></div>
              <div class='aff-cont'>
                <div class='aff-vit'><span></span></div>
                <div class='aff-pow'><span></span></div>
                <div class='aff-for'><span></span></div>
                <div class='aff-agi'><span></span></div>
                <div class='aff-san'><span></span></div>
              </div>
            </div>
          </div>`);


          const child = `<div class='generation' devi-id='${deviChildID}' id='child' devi-rarity=''>
          <div class='card-m' style='background-image: url(https://img.devikins.com/${handleImgIndexPath(deviChildID)}/${deviChildID}.png);'>
            <div class='gene-cont'>
              <div class='gene gene-mouth'></div>
              <div class='gene gene-eye'></div>
              <div class='gene gene-ear'></div>
              <div class='gene gene-hair'></div>
              <div class='gene gene-horn'></div>
            </div>
            <div class='devi-id'>${deviChildID}</div>
            <div class='devi-oa'></div>
            <div class='aff-cont'>
              <div class='aff-vit'><span></span></div>
              <div class='aff-pow'><span></span></div>
              <div class='aff-for'><span></span></div>
              <div class='aff-agi'><span></span></div>
              <div class='aff-san'><span></span></div>
            </div>
          </div>
        </div>`;
        parentContainer.append(child)


        } else {
          parentContainer.append('<p style="color: white;">No Parents</p>');
        }



        // console.log(result)
        // console.log(deviParent)
        getParent()
      },
      error: function () {
        console.log("error");
      }
    });
    
    function getParent() {
      // console.log(deviParent.length)

      for (let index = 0; index < deviParent.length; index++) {
        // console.log(index)
        $.ajax({
          url: `https://inventory.api.devikins.com/asset/${deviParent[index]}`,
          type: "GET",
          dataType: "json",
          data: {
          },
          success: function (resultx) {
            const g1 = resultx.ParentHashList[0];
            const g2 = resultx.ParentHashList[1];
            if($(resultx.ParentHashList).length > 1) {
              deviGrandParent.push(g1, g2)
              deviFamily.push(g1, g2)
              handleFamilyData();
            }
          },
          error: function () {
            console.log("error");
          }
        });
      }
    }
    
    function handleFamilyData() {
      // console.log(deviFamily.length)
      // console.log("no 3")
      for (let index = 0; index < deviFamily.length; index++) {
        // console.log(index)
        $.ajax({
          url: `https://inventory.api.devikins.com/asset/${deviFamily[index]}`,
          type: "GET",
          dataType: "json",
          data: {
          },
          success: function (resultxx) {
            const parentContainer = $(".parent-container");
            const selectdeviId = $(parentContainer.find('[devi-id]'));

            const geneMouth = selectdeviId.find(".gene-mouth");
            const geneEye = selectdeviId.find(".gene-eye");
            const geneEar = selectdeviId.find(".gene-ear");
            const geneHair = selectdeviId.find(".gene-hair");
            const geneHorn = selectdeviId.find(".gene-horn");

            const affVit = selectdeviId.find(".aff-vit");
            const affPow = selectdeviId.find(".aff-pow");
            const affFor = selectdeviId.find(".aff-for");
            const affAgi = selectdeviId.find(".aff-agi");
            const affSan = selectdeviId.find(".aff-san");

            const deviOA = selectdeviId.find(".devi-oa");

            for (let index2 = 0; index2 < selectdeviId.length; index2++) {
              let id = $(selectdeviId[index2]).attr('devi-id');
              // console.log(id + " xxxxx")
              // console.log($(selectdeviId[index]).attr('devi-id'))
              if(id === JSON.stringify(resultxx.SequenceCounter)) {
                // console.log(resultxx.OverallAffinity)
                $(selectdeviId[index2]).attr('devi-rarity', handleRarity(resultxx.OverallAffinity));
                $(geneMouth[index2]).attr("data-gene", handleGenes(resultxx.Eyes ? resultxx.Mouth.Tag : "bonded"))
                $(geneEye[index2]).attr("data-gene", handleGenes(resultxx.Eyes ? resultxx.Eyes.Tag : "bonded"))
                $(geneEar[index2]).attr("data-gene", handleGenes(resultxx.Eyes ? resultxx.Ears.Tag : "bonded"))
                $(geneHair[index2]).attr("data-gene", handleGenes(resultxx.Eyes ? resultxx.Hair.Tag : "bonded"))
                $(geneHorn[index2]).attr("data-gene", handleGenes(resultxx.Eyes ? resultxx.Horns.Tag : "bonded"))

                $(affVit[index2]).attr("data-aff", handleAffinity(resultxx.VitAffinity))
                $(affPow[index2]).attr("data-aff", handleAffinity(resultxx.PowAffinity))
                $(affFor[index2]).attr("data-aff", handleAffinity(resultxx.ForAffinity))
                $(affAgi[index2]).attr("data-aff", handleAffinity(resultxx.AgiAffinity))
                $(affSan[index2]).attr("data-aff", handleAffinity(resultxx.SanAffinity))

                $(affVit[index2]).find("span").text(resultxx.VitAffinity);
                $(affPow[index2]).find("span").text(resultxx.PowAffinity);
                $(affFor[index2]).find("span").text(resultxx.ForAffinity);
                $(affAgi[index2]).find("span").text(resultxx.AgiAffinity);
                $(affSan[index2]).find("span").text(resultxx.SanAffinity);

                $(deviOA[index2]).text(resultxx.OverallAffinity);

              }
            }
            
            // console.log("hoy")
            // console.log(JSON.stringify(resultxx.SequenceCounter) + " heloo");
            // console.log(deviFamily)
            // console.log("adasd")
            // console.log(parentContainer)
            // parentContainer.append('<span>hello </span>')
            

          },
          error: function () {
            console.log("error");
          }
        });
      }
    }
    

    

    function handleGranParentsHide() {
      const parentContainer = $(".parent-container");
      const gp = parentContainer.find("#grand-parents");

      if(document.querySelectorAll(".no-parents").length === 4) {
        gp.css("display", "none");
      }
    }
  }

  handleRenderParentID(p1, p2) {
    $(this.$parent1).text(p1)
    $(this.$parent2).text(p2)
  }

  
//   handleSelect(e) {
//     const selectValue = $(e.target).text();
//     this.$select.text(selectValue);
//     this.handleToggleClass();
//   }
}

export default FindParent;
