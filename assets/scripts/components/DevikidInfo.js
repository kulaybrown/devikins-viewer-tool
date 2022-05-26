import $ from "jquery";
import {handleImgIndexPath, handleRarity, handleGenes, handleAffinity} from "./helpers";

class DevikidInfo {
  constructor(element) {
    this.$element = $(element);
    this.$selectInput = this.$element.find("input");
    this.$selectButton = this.$element.find("button");


    this.addListeners();
  }

  addListeners() {
    this.$selectButton.on("click", this.handleClickDeviInfo.bind(this));
      this.$selectInput.on("keypress", function(e) {
      if (e.key === "Enter") {
        $(e.target).parent(".devikid-info-action").find("button").trigger("click")
      }
    })
  }

  handleGetChildID() {
    return this.$selectInput.val();
  }
  
  handleClickDeviInfo() {
    const deviChildID = this.handleGetChildID();
    this.handleAPI(deviChildID)
  }

  handleAPI(deviChildID) {
    let deviGrandParent = [];
    let deviParent = [];
    let deviFamily = [];
    let deviData = [];
    $.ajax({
      url: `https://inventory.api.devikins.com/asset/${deviChildID}`,
      type: "GET",
      dataType: "json",
      data: {
      },
      success: function (result) {
        const parentContainer = $(".devikid-info-container");
        console.log(result)
        $(parentContainer).empty()
        const devikid = `<div class='' devi-id='${deviChildID}' id='child' devi-rarity=''>
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
        parentContainer.append(devikid)

        const deviText = `
          <div class='devikid-data'>
            <div class='devikid-data-box rarity'>
              <p>Rarity</p>
              <p>Rare</p>
            </div>
            <div class='devikid-data-box proc-left'>
              <p>Procreation Left</p>
              <p>9</p>
            </div>
            <div class='devikid-data-box life-stage'>
              <p>Life Stage</p>
              <p>Adult</p>
            </div>
            <div class='devikid-data-box ancestry'>
              <p>Ancestry</p>
              <p>Ochran</p>
            </div>
            <div class='devikid-data-box personality'>
              <p>Personality</p>
              <p>Reckless</p>
            </div>
            <div class='devikid-data-bar agi-attr'>
              <div class='devikid-bar-info'>
                <p>Vitality Attribute</p>
                <p>55</p>
              </div>
              <div class='devikid-bar' style='width: 55%;'></div>
            </div>
            <div class='devikid-data-bar agi-attr'>
              <div class='devikid-bar-info'>
                <p>Power Attribute</p>
                <p>60</p>
              </div>
              <div class='devikid-bar' style='width: 60%;'></div>
            </div>
            <div class='devikid-data-bar agi-attr'>
              <div class='devikid-bar-info'>
                <p>Fortitude Attribute</p>
                <p>46</p>
              </div>
              <div class='devikid-bar' style='width: 46%;'></div>
            </div>
            <div class='devikid-data-bar agi-attr'>
              <div class='devikid-bar-info'>
                <p>Agility Attribute</p>
                <p>70</p>
              </div>
              <div class='devikid-bar' style='width: 70%;'></div>
            </div>
            <div class='devikid-data-bar agi-attr'>
              <div class='devikid-bar-info'>
                <p>Sanity Attribute</p>
                <p>100</p>
              </div>
              <div class='devikid-bar' style='width: 100%;'></div>
            </div>
          </div>
        `;
        parentContainer.append(deviText)



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

 
        let id = $(selectdeviId).attr('devi-id');
        if(id === JSON.stringify(result.SequenceCounter)) {
          $(selectdeviId).attr('devi-rarity', handleRarity(result.OverallAffinity));
        
          $(geneMouth).attr("data-gene", handleGenes(result.Eyes ? result.Mouth.Tag : "bonded"))
          $(geneEye).attr("data-gene", handleGenes(result.Eyes ? result.Eyes.Tag : "bonded"))
          $(geneEar).attr("data-gene", handleGenes(result.Eyes ? result.Ears.Tag : "bonded"))
          $(geneHair).attr("data-gene", handleGenes(result.Eyes ? result.Hair.Tag : "bonded"))
          $(geneHorn).attr("data-gene", handleGenes(result.Eyes ? result.Horns.Tag : "bonded"))
        
          $(affVit).attr("data-aff", handleAffinity(result.VitAffinity))
          $(affPow).attr("data-aff", handleAffinity(result.PowAffinity))
          $(affFor).attr("data-aff", handleAffinity(result.ForAffinity))
          $(affAgi).attr("data-aff", handleAffinity(result.AgiAffinity))
          $(affSan).attr("data-aff", handleAffinity(result.SanAffinity))

          $(affVit).find("span").text(result.VitAffinity);
          $(affPow).find("span").text(result.PowAffinity);
          $(affFor).find("span").text(result.ForAffinity);
          $(affAgi).find("span").text(result.AgiAffinity);
          $(affSan).find("span").text(result.SanAffinity);

          $(deviOA).text(result.OverallAffinity);

        }
        
  
      },
      error: function () {
        console.log("error");
      }
    });


    
  }

}

export default DevikidInfo;
