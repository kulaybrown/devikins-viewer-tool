import $ from "jquery";
import {
  handleImgIndexPath, 
  handleRarity, 
  handleGenes, 
  handleAffinity, 
  handleProcrationLeft, 
  handleLifeStage, 
  handleAncestry, 
  handlePersonality
} from "./helpers";
import {imgPath} from "./constant";

class Compare {
  constructor(element) {
    this.$element = $(element);
    
    this.$addtocompare = this.$element.find("#addtocompare");
    this.$compare1 = this.$element.find(".compare-item--1");
    this.$compare2 = this.$element.find(".compare-item--2");
    this.$compare3 = this.$element.find(".compare-item--3");
    this.$compare4 = this.$element.find(".compare-item--4");
    
    this.addListeners();
  }

  addListeners() {
    this.handleAddCompare();
  }

  

  handleAddCompare() {

    this.$addtocompare.on("click", function() {
      this.$container = $(".compare-info-container");

      const compareDom = `
        <div class="compare-item">
          <div class="compare-action">
            <input type="text" placeholder="Devi ID">
            <button class='compare-action-enter'>Enter ✔️</button>
            <button class='compare-action-close'>Close ❌</button>
          </div>

          <div class="compare-attributes compare-attributes--false">
            <div class="" devi-id="0" devi-rarity="rare">
              <div class="nft-img" style="background-image: url(${imgPath}no-parent-img.jpg); background-position: center;">
                <div class="devi-id">0</div>
                <div class="devi-oa">0</div>
              </div>
            </div>
            <div class="attributes rarity">Rarity: <span></span></div>
            <div class="attributes procreation-left">Procreation Left: <span></span></div>
            <div class="attributes life-stage">Life Stage: <span></span></div>
            <div class="attributes ancestry">Ancestry: <span></span></div>
            <div class="attributes personality">Personality: <span></span></div>
            <div class="gene-cont">
              <div class="gene gene-mouth" data-gene="dominant">
                <div></div>
              </div>
              <div class="gene gene-eye" data-gene="dominant">
                <div></div>
              </div>
              <div class="gene gene-ear" data-gene="dominant">
                <div></div>
              </div>
              <div class="gene gene-hair" data-gene="dominant">
                <div></div>
              </div>
              <div class="gene gene-horn" data-gene="recessive">
                <div></div>
              </div>
            </div>
            <div class="aff-cont aff-cont1">
              <div class="aff-vit" data-aff="eldritch"><span></span></div>
              <div class="aff-pow" data-aff="rare"><span></span></div>
              <div class="aff-for" data-aff="eldritch"><span></span></div>
              <div class="aff-agi" data-aff="mythic"><span></span></div>
              <div class="aff-san" data-aff="uncommon"><span></span></div>
            </div>
            <div class="aff-cont aff-cont-attr">
              <div class="aff-vit">
                <span>
                  <div></div>
                </span>
              </div>
              <div class="aff-pow">
                <span>
                  <div></div>
                </span>
              </div>
              <div class="aff-for">
                <span>
                  <div></div>
                </span>
              </div>
              <div class="aff-agi">
                <span>
                  <div></div>
                </span>
              </div>
              <div class="aff-san">
                <span>
                  <div></div>
                </span>
              </div>
            </div>
          </div>
        </div>
      `;
      $(this.$container).append(compareDom);

      handleRemoveCompare();
      handleDisableAddCompare()
      handleCompare1()
      handlePressEnterKey()
    })

    function handleRemoveCompare() {
      const close = $(".compare-action-close");
      close.on("click", function() {
        $(this).parents(".compare-item").remove();
        handleDisableAddCompare()
      })
    }

    function handleDisableAddCompare() {
      if($(".compare-item").length === 4) {
        $("#addtocompare").attr("disabled", true)
      } else {
        $("#addtocompare").attr("disabled", false)
      }
    }

    function handleCompare1() {
      $(".compare-action-enter").on("click", function() {
        const inputVal = $(this).siblings("input").val()
        const select = $(this).parents(".compare-item").find(".compare-attributes")
          console.log(select);
          $.ajax({
            url: `https://inventory.api.devikins.com/asset/${inputVal}`,
            type: "GET",
            dataType: "json",
            data: {
            },
            success: function (result) {
              console.log(result)
              let dvkImg = `https://img.devikins.com/${handleImgIndexPath(inputVal)}/${inputVal}.png`;

              function errorImage() {
                var tester=new Image();
                tester.onerror=imageNotFound;
                tester.src=dvkImg;
                function imageNotFound() {
                  $(select).find(".nft-img").css({"background": `url(${imgPath}pending-preview.png) no-repeat center center`, "background-size": "140%"});
                }
              }

              $(select).removeClass("compare-attributes--false")
              $(select).find("[devi-id]").attr("devi-id", result.SequenceCounter);
              $(select).find(".devi-id").text(result.SequenceCounter);
              $(select).find(".devi-oa").text(result.OverallAffinity);
              $(select).find("[devi-id]").attr('devi-rarity', handleRarity(result.OverallAffinity));
              $(select).find(".nft-img").css({'background-image': `url(${dvkImg})`})
 
              $(select).find(".rarity > span").text(handleRarity(result.OverallAffinity))
              $(select).find(".procreation-left > span").text(handleProcrationLeft(result.BreedCount))
              $(select).find(".life-stage > span").text(handleLifeStage(result.Stage))
              $(select).find(".ancestry > span").text(handleAncestry(result.AncestryType))
              $(select).find(".personality > span").text(handlePersonality(result.Personality))

              $(select).find(".gene-mouth").attr("data-gene", handleGenes(result.Eyes ? result.Mouth.Tag : "bonded"))
              $(select).find(".gene-eye").attr("data-gene", handleGenes(result.Eyes ? result.Eyes.Tag : "bonded"))
              $(select).find(".gene-ear").attr("data-gene", handleGenes(result.Eyes ? result.Ears.Tag : "bonded"))
              $(select).find(".gene-hair").attr("data-gene", handleGenes(result.Eyes ? result.Hair.Tag : "bonded"))
              $(select).find(".gene-horn").attr("data-gene", handleGenes(result.Eyes ? result.Horns.Tag : "bonded"))

              $(select).find(".gene-mouth > div").text(handleGenes(result.Eyes ? result.Mouth.Tag : "bonded"))
              $(select).find(".gene-eye > div").text(handleGenes(result.Eyes ? result.Eyes.Tag : "bonded"))
              $(select).find(".gene-ear > div").text(handleGenes(result.Eyes ? result.Ears.Tag : "bonded"))
              $(select).find(".gene-hair > div").text(handleGenes(result.Eyes ? result.Hair.Tag : "bonded"))
              $(select).find(".gene-horn > div").text(handleGenes(result.Eyes ? result.Horns.Tag : "bonded"))

              const affVit = $(select).find(".aff-cont1 .aff-vit");
              const affPow = $(select).find(".aff-cont1 .aff-pow");
              const affFor = $(select).find(".aff-cont1 .aff-for");
              const affAgi = $(select).find(".aff-cont1 .aff-agi");
              const affSan = $(select).find(".aff-cont1 .aff-san");

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

              const affVitAttr = $(select).find(".aff-cont-attr .aff-vit");
              const affPowAttr = $(select).find(".aff-cont-attr .aff-pow");
              const affForAttr = $(select).find(".aff-cont-attr .aff-for");
              const affAgiAttr = $(select).find(".aff-cont-attr .aff-agi");
              const affSanAttr = $(select).find(".aff-cont-attr .aff-san");

              $(affVitAttr).attr("data-aff", result.VitBase)
              $(affPowAttr).attr("data-aff", result.PowBase)
              $(affForAttr).attr("data-aff", result.ForBase)
              $(affAgiAttr).attr("data-aff", result.AgiBase)
              $(affSanAttr).attr("data-aff", result.SanBase)

              $(affVitAttr).find("span").text(result.VitBase);
              $(affPowAttr).find("span").text(result.PowBase);
              $(affForAttr).find("span").text(result.ForBase);
              $(affAgiAttr).find("span").text(result.AgiBase);
              $(affSanAttr).find("span").text(result.SanBase);

              $(affVitAttr).find("span").append(`<div style='width: ${result.VitBase}%'></div>`)
              $(affPowAttr).find("span").append(`<div style='width: ${result.PowBase}%'></div>`)
              $(affForAttr).find("span").append(`<div style='width: ${result.ForBase}%'></div>`)
              $(affAgiAttr).find("span").append(`<div style='width: ${result.AgiBase}%'></div>`)
              $(affSanAttr).find("span").append(`<div style='width: ${result.SanBase}%'></div>`)

              errorImage();
            },
            error: function () {
              console.log("error");
            }
          });
      })
      
    }

    function handlePressEnterKey() {
    $(".compare-action input").on("keypress", function(e) {
      if (e.key === "Enter") {
        $(e.target).parent(".compare-action").find(".compare-action-enter").trigger("click")
      }
    })
    }
  }

  
}

export default Compare;
