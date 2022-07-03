import $ from "jquery";
import {handleImgIndexPath, 
  handleRarity, 
  handleGenes, 
  handleAffinity, 
  handleProcrationLeft, 
  handleLifeStage, 
  handleAncestry, 
  handlePersonality
} from "./helpers";
import {nurseryPersonality, imgPath} from "./constant";

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
    $.ajax({
      url: `https://inventory.api.devikins.com/asset/${deviChildID}`,
      type: "GET",
      dataType: "json",
      data: {
      },
      success: function (result) {
        const parentContainer = $(".devikid-info-container");
        // console.log(result)
        let dvkImg = `https://img.devikins.com/${handleImgIndexPath(deviChildID)}/${deviChildID}.png`;

        function errorImage() {
          var tester=new Image();
          tester.onerror=imageNotFound;
          tester.src=dvkImg;
          function imageNotFound() {
            $('.devikid-info .card-m').css({"background": `url(${imgPath}pending-preview.png) no-repeat center center`, "background-size": "140%"});
          }
        }
        
        function recoItems() {
          const x = handlePersonality(result.Personality);
          nurseryPersonality.forEach(element => {
            if(element.personality === x.toLowerCase()) {
             element.items.forEach(element2 => {
              //  console.log(element2);
               const appendItems = `
                 <img src="${element2}" alt="nursy items" />
               `;
               $(".personality-reco-items").append(appendItems);
             });
           }
         });
        }
        
        $(parentContainer).empty()
        const devikid = `<div class='' devi-id='${deviChildID}' id='child' devi-rarity=''>
          <div class='card-m' style='background-image: url(${dvkImg});'>
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
              <p>${handleRarity(result.OverallAffinity)}</p>
            </div>
            <div class='devikid-data-box proc-left'>
              <p>Procreation Left</p>
              <p>${handleProcrationLeft(result.BreedCount)}</p>
            </div>
            <div class='devikid-data-box life-stage'>
              <p>Life Stage</p>
              <p>${handleLifeStage(result.Stage)}</p>
            </div>
            <div class='devikid-data-box ancestry'>
              <p>Ancestry</p>
              <p>${handleAncestry(result.AncestryType)}</p>
            </div>
            <div class='devikid-data-box personality'>
              <p>Personality</p>
              <p>${handlePersonality(result.Personality)}</p>
              <div class='personality-reco-items'>
                <p>Recommended Items</p>
              </div>
            </div>
            <div class='devikid-data-bar'>
              <div class='devikid-bar-info'>
                <p>Vitality Attribute</p>
                <p>${result.VitBase}</p>
              </div>
              <div class='devikid-bar' style='width: ${result.VitBase}%;'></div>
            </div>
            <div class='devikid-data-bar'>
              <div class='devikid-bar-info'>
                <p>Power Attribute</p>
                <p>${result.PowBase}</p>
              </div>
              <div class='devikid-bar' style='width: ${result.PowBase}%;'></div>
            </div>
            <div class='devikid-data-bar'>
              <div class='devikid-bar-info'>
                <p>Fortitude Attribute</p>
                <p>${result.ForBase}</p>
              </div>
              <div class='devikid-bar' style='width: ${result.ForBase}%;'></div>
            </div>
            <div class='devikid-data-bar'>
              <div class='devikid-bar-info'>
                <p>Agility Attribute</p>
                <p>${result.AgiBase}</p>
              </div>
              <div class='devikid-bar' style='width: ${result.AgiBase}%;'></div>
            </div>
            <div class='devikid-data-bar'>
              <div class='devikid-bar-info'>
                <p>Sanity Attribute</p>
                <p>${result.SanBase}</p>
              </div>
              <div class='devikid-bar' style='width: ${result.SanBase}%;'></div>
            </div>
          </div>
        `;
        parentContainer.append(deviText)
        errorImage();
        


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

        recoItems()

  
      },
      error: function () {
        console.log("error");
        const parentContainer = $(".devikid-info-container");
        $(parentContainer).empty()
        parentContainer.append(`
        <div class='pls-try-again'>
          <div>Please Try Again</div>
        </div>
        `)
      }
    });


    
  }

}

export default DevikidInfo;
