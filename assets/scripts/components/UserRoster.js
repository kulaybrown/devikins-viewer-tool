import $ from "jquery";

class UserRoster {
  constructor(element) {
    this.$element = $(element);
    this.addListeners();

  }

  addListeners() {
    // for (let index = 0; index < 2000; index++) {

    //   // https://inventory.api.devikins.com/latest

    //   $.ajax({
    //     url: `https://inventory.api.devikins.com/asset/${index}`,
    //     type: "GET",
    //     dataType: "json",
    //     data: {
    //     },
    //     success: function (result) {
    //       const total = result.total;
    //       // console.log(total)
    //       if(result.UserId === "TAb2UrbMw6n7sj34NbP82ocrcGg1tEpBoz") {
    //         console.log(result.SequenceCounter)
    //       }
    //     },
    //     error: function () {
    //       console.log("error");
    //     }
    //   })
    // }
        





    // function getData(ajaxurl) { 
    //   return $.ajax({
    //     url: ajaxurl,
    //     type: 'GET',
    //   });
    // };
    
    // async function test(index) {
    //   try {
    //     const res = await getData(`https://inventory.api.devikins.com/asset/${index}`)
    //     // console.log(res)
    //       if(res.UserId === "TAb2UrbMw6n7sj34NbP82ocrcGg1tEpBoz") {
    //         console.log(res.SequenceCounter)
    //       }
    //   } catch(err) {
    //     // console.log(err);
    //   }
    // }
    // const batch = 100;
    // let batch2 = 200;
    // for (let index = 0; index < batch; index++) {

    //   for (let index2 = 0; index2 < batch2; index2++) {
    //     console.log(index2)
    //     // test(index2);
        
    //   }
    //   batch2 = batch2 + 200;
    // }

  }
} 

export default UserRoster;
