$(document).ready(function() {
  var id;
  showSection();
  $("nav ul li a").click(function() {
    if (id != $(this).attr("href")) {
      $(".active").removeClass("active");
      var active = $(this);
      active.addClass("active");
      saveActiveBtn(active);
      translateMenuBar();
      showSection();
    }
  });

  $(".arrow-down a").click(function() {
    $(".active").removeClass("active");
    var active = $("a[href='#about-page']").not(this);
    active.addClass("active");
    saveActiveBtn(active);
    translateMenuBar();
    showSection();
  });

  function showSection() {
    loadActiveBtn();
    id = ""+$(".active").attr("href");
    $(id).siblings("section").css("display", "none");
    $(id).css("display", "block");
  }

  function saveActiveBtn(activeBtn) {
    if(typeof(Storage) !== "undefined") {
      sessionStorage.activeBtn = activeBtn.attr("href");
      // console.log(sessionStorage.activeBtn);
    }
  }


  function loadActiveBtn() {
    if(typeof(Storage) !== "undefined") {
      if (sessionStorage.activeBtn) {
        $(".active").removeClass("active");
        $("a[href='"+sessionStorage.activeBtn+"']").addClass("active");
        // console.log("load" +sessionStorage.activeBtn);
      } else {
        $("a[href='#home-page']").addClass("active");
      }
    }
  }

  function translateMenuBar() {
    var nav = $("nav")
    var top = nav.css("top");
    var sectionContent = $("section div[id*='content']");
    // console.log(top);
    if (top == "0px") {
      nav.css({"top": "100%", "marginTop": "-90px"});
      sectionContent.css("top", "0");
    } else {
      nav.css({"top": "0", "marginTop": "0"});
      sectionContent.css("top", "90px");
    }
  }
});
