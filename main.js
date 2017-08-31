/* Muy bacano el carrusel y el poguehead */

"use strict"; // Start of use strict



// Closes responsive menu when a scroll trigger link is clicked
$(".js-scroll-trigger").click(function() {
  $(".navbar-collapse").collapse("hide");
});

// Activate scrollspy to add active class to navbar items on scroll
$("body").scrollspy({
  target: "#mainNav",
  offset: 48
});




function isElementInViewport(top, bot) {

  // Get the scroll position of the page.
  var scrollElem = ((navigator.userAgent.toLowerCase().indexOf("webkit") != -1) ? "body" : "html");
  var viewportTop = $(scrollElem).scrollTop();
  var viewportBottom = viewportTop + $(window).height();

  //var elemTop = Math.round( $(this).offset().top );
  //var elemBottom = elemTop + $(this).height();
  //console.log(elemTop);
  //console.log(elemBottom);

  return ((top < viewportBottom) && (bot > viewportTop));
}
// Collapse the navbar when page is scrolled, also for adding active class and start animations
$(window).scroll(function () {
    if ($("#mainNav").offset().top > 100) {
        $("#mainNav").addClass("navbar-shrink");
    } else {
        $("#mainNav").removeClass("navbar-shrink");
    }
    var elems = $(".sr-icons");
    if (elems.hasClass("active"))
        return;

    if (isElementInViewport(2751, 2815)) {
        // Start the animation
        elems.each(function (index) {
            $(this).delay(index * 200).queue(function (nxt) {
                $(this).addClass("active");
                nxt();
            });
        });
    }
    if (isElementInViewport(900, 1288)) {
        console.log($(".typewriter"));
        $(".typewriter").addClass("active");
    }
});

/*
* Flux 3D Carousel
* Author: Dean Coulter
* Licensed under the MIT license
* 
* Version 0.1
*/

$.fn.carousel3d = function(){

  var el = ({
    carousel_frame: $(this)

  });

  var size = el.carousel_frame.children().length; 
  var panelSize = el.carousel_frame.width();
  var translateZ = Math.round( ( panelSize / 2 ) / Math.tan( Math.PI / size ) );

  el.carousel_frame.css({
    "transform": "rotateY(0deg) translateZ(-"+translateZ+"px)"
  });

  var rotateY = 0;
  var rotate_int = 0;
  var ry =  360/size;

  function animate_slider(index){
    rotateY = ry*rotate_int;
    $("#test").text(rotateY+", "+rotate_int+", ");
    
    for(var i=0;i<size;i++){
      var z = (rotate_int*-1*ry)+(i*ry);
      if(i != index){
        el.carousel_frame.children("figure:eq("+i+")").css({
          "transform":"rotateY("+z+"deg ) translateZ("+translateZ+"px)",
          "color": "transparent",
          "text-shadow": "0 0 5px rgba(0,0,0,0.8)"
        });
      }
      else{
        el.carousel_frame.children("figure:eq("+i+")").css({"transform":"rotateY("+z+"deg ) translateZ("+translateZ+"px)","color":"white"});
      }
    }
    rotateY = 0;
  }

  animate_slider(0);



  el.carousel_frame.children().on("click", function(){
    var new_int = $(this).index();
    var dir = (rotate_int%size!=0 || new_int!=(size-1)) && (((rotate_int%size < new_int) && rotate_int >=0) || (-rotate_int%size >= new_int && rotate_int < 0) || (rotate_int%size==(size-1) && new_int == 0));
    if(dir){
      rotate_int++;
    } 
    else if(!dir){
      rotate_int--;
    } 
    animate_slider(new_int);
  }); 
};

$(document).ready(function(){
  $("#carousel").carousel3d();
});
$.fn.extend({     

  percentcircle :  function(options) {
    //Set the default values, use comma to separate the settings, example:
    var defaults = 
    {
      animate : true,
      diameter : 150,
      guage: 5,
      coverBg: "#fff",
      bgColor: "#efefef",
      fillColor: "#5c93c8",
      percentSize: "15px",
      percentWeight: "normal"
    },styles = 
    {
      cirContainer : {
        "width":defaults.diameter,
        "height":defaults.diameter
      },
      cir : {
        "position": "relative",
        "text-align": "center",
        "margin-left":"50%",
        "width": defaults.diameter,
        "height": defaults.diameter,
        "border-radius": "100%",
        "background-color": defaults.bgColor,
        "background-image" : "linear-gradient(91deg, transparent 50%, "+defaults.bgColor+" 50%), linear-gradient(90deg, "+defaults.bgColor+" 50%, transparent 50%)"
      },
      cirCover: {
        "position": "relative",
        "top": defaults.guage,
        "left": defaults.guage,
        "text-align": "center",
        "width": defaults.diameter - (defaults.guage * 2),
        "height": defaults.diameter - (defaults.guage * 2),
        "border-radius": "100%",
        "background-color": defaults.coverBg
      },
      percent: {
        "display":"block",
        "width": defaults.diameter,
        "height": defaults.diameter,
        "line-height": defaults.diameter + "px",
        "vertical-align": "middle",
        "font-size": defaults.percentSize,
        "font-weight": defaults.percentWeight,
        "color": defaults.fillColor
      },
      content: {
        "horizontal-align":"middle",
        "margin-left":"1500px"
      }
    };

    var that = this,
      //fix indent
      template = "<div><div class='ab'><div class='cir'><span class='perc'>{{percentage}}</span></div></div></div><div class='cont' style='margin-left:27%;font-size:25px'>{{content}}</div>",          
      options =  $.extend(defaults, options);  
    //fix indent
    function init(){

      that.each(function(){

        var $this = $(this),
          //we need to check for a percent otherwise set to 0;
          perc = Math.round($this.data("percent")), //get the percentage from the element
          cont = $this.data("content"),
          deg = perc * 3.6,
          stop = options.animate ? 0 : deg,
          $chart = $(template.replace("{{percentage}}",perc+"%").replace("{{content}}",cont));
        //set all of the css properties forthe chart
        $chart.css(styles.cirContainer).find(".ab").css(styles.cir).find(".cir").css(styles.cirCover).find(".perc").css(styles.percent).find(".cont").css(styles.content);
        //add the chart back to the target element
        $this.append($chart); 
        var animated;
        $(window).scroll(function(){
          if(isElementInViewport(1759,2359) && !animated){  
            animateChart(deg,parseInt(stop),$chart.find(".ab")); //both values set to the same value to keep the function from looping and animating 
            animated = true; 
          }
        });
      });
    }

    var animateChart = function (stop,curr,$elm){
      var deg = curr;
      if(curr <= stop){
        if (deg>=180){
          $elm.css("background-image","linear-gradient(" + (90+deg) + "deg, transparent 50%, "+options.fillColor+" 50%),linear-gradient(90deg, "+options.fillColor+" 50%, transparent 50%)");
        }else{
          $elm.css("background-image","linear-gradient(" + (deg-90) + "deg, transparent 50%, "+options.bgColor+" 50%),linear-gradient(90deg, "+options.fillColor+" 50%, transparent 50%)");
        }
        curr ++;
        setTimeout(function(){
          animateChart(stop,curr,$elm);
        },1);
      }
    };  
    init(); 
  }
});
$(".demo-1").percentcircle();

$(".demo-2").percentcircle({
  animate : true,
  diameter : 200,
  guage: 3,
  coverBg: "#fff",
  bgColor: "#efefef",
  fillColor: "#E95546",
  percentSize: "15px",
  percentWeight: "normal"
});

$(".demo-3").percentcircle({
  animate : true,
  diameter : 200,
  guage: 3,
  coverBg: "#fff",
  bgColor: "#efefef",
  fillColor: "#DA4453",
  percentSize: "18px",
  percentWeight: "normal"
});
$(".demo-4").percentcircle({
  animate : true,
  diameter : 200,
  guage: 3,
  coverBg: "#fff",
  bgColor: "#efefef",
  fillColor: "#46CFB0",
  percentSize: "18px",
  percentWeight: "normal"
});   
$(".demo-5").percentcircle({
  animate : true,
  diameter : 200,
  guage: 3,
  coverBg: "#fff",
  bgColor: "#efefef",
  fillColor: "#8BC163",
  percentSize: "18px",
  percentWeight: "20px"
}); 
$(".demo-6").percentcircle({
  animate : true,
  diameter : 200,
  guage: 10,
  coverBg: "#fff",
  bgColor: "#efefef",
  fillColor: "#D870A9",
  percentSize: "18px",
  percentWeight: "normal"
});   

$(document).ready(function() {
  var facts = ["Click on my head to learn more about me!","I was born the 18th of January of 1996...","at 6:08 pm...","in Caracas, Venezuela...","my parents had been married for 9 years."],
    //fix
    pickANumber = 1;
  //fix
  jQuery("#pogueHead").on("click", function() {
    if (pickANumber == facts.length) { pickANumber = 0; }
    jQuery(".factText").text(facts[pickANumber]);
    pickANumber++;
  });
});
