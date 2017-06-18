$(document).ready(function() {
  // variables
  var id; // variable for initializing active nav btn href value
  var activeContent;
  var scrollBar;
  var scrollBarNav;
  var dh = $(document).height(); // get document height
  var sbnh;

  // section-page positioning and navigation functions start
  showSection(); // shows the section relative to active bio-content
  positionScrollBar(); // sets the height of the scroll bar...
  $("nav ul li a").click(function() {
    if (id != $(this).attr("href")) {
      $(".active").removeClass("active");
      var active = $(this);
      active.addClass("active");
      saveActiveBtn(active);
      showSection();
      positionScrollBar();
      activeContent.on("scroll", scrollBarEventHandler);
      translateMenuBar();
    }
  });

  $(".arrow-down a").click(function() {
    $(".active").removeClass("active");
    var active = $("a[href='#about-page']").not(this);
    active.addClass("active");
    saveActiveBtn(active);
    showSection();
    positionScrollBar();
    translateMenuBar();
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
    var navTop = nav.css("top");
    // console.log(top);
    if (navTop == "0px") {
      nav.css({"top": "100%", "marginTop": "-90px"});
      activeContent.css("top", "0");
      scrollBar.css("top", "0");
    } else {
      nav.css({"top": "0", "marginTop": "0"});
      activeContent.css("top", "90px");
      scrollBar.css("top", "90px");
    }
  }

  function positionScrollBar() {
    activeContent = $(id+" div[id*=-content]"); // find active section content
    rowContainer = $(activeContent).children("div.row-container");
    scrollBar = $(activeContent).children("div.scroll-bar"); // find active section scroll bar element
    scrollBarNav = $(scrollBar).children("div.scroll-bar-nav"); // find active scroll bar navigation element

    activeContent.outerHeight(dh-90);
    var ah = activeContent.outerHeight(); // get active section content height
    var rh = rowContainer.outerHeight();
    scrollBar.height(ah); // set the scroll bar height
    var sbh = scrollBar.height(); // get scroll bar height
    sbnh = (sbh/rh)*100; // set scroll bar navigation height
    scrollBarNav.height(sbnh+"%");
    // console.log(dh+" "+ah+" "+rh+" "+sbh+" "+sbnh);
  }
  // section-page navigation functions end


  //scroll-bar parallax functions start
  function scrollBarEventHandler() {
    positionScrollBar();
    console.log("I am here");
    var st = activeContent.scrollTop();
    var speed = sbnh/100;
    st = speed * st;
    scrollBarNav.css({
      "top": st
    });
  }

});
