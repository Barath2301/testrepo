//  RESTART ANIMATION W/ RESTART BUTTON

document.getElementById("restart").addEventListener("click", function(){
    window.location.reload();
  });
 
 
 //    ONCLICK OF PAUSE BUTTON, CHANGE BUTTON TEXT & COLOR
 
 let paused = false;
 
 const PAUSE = document.querySelector("#pause");
 console.log(PAUSE);
 
 function reveal(e) {
   e.preventDefault();
 
   if (PAUSE.innerHTML == "Pause") {
 
     PAUSE.innerHTML = "Resume";
     PAUSE.classList.add("dblue");
     PAUSE.classList.remove("teal");
   }
   else {
 
     PAUSE.innerHTML = "Pause";
     PAUSE.classList.remove("dblue");
     PAUSE.classList.add("teal");
   }
 
 }
 
 PAUSE.addEventListener("click", function(e){ reveal(e,this); }, false);
 
 
 // PAUSE & RESUME ON CLICK OR HOVER
 
 let animList = document.querySelectorAll(".animate");  // returns NodeList
 
 let iconList = document.querySelectorAll(".pause-trigger");  // returns NodeList
 let tempList = document.querySelectorAll(".temp-circle");  // returns
 
 let playingState = true;
 
 let parentList = document.querySelectorAll(".anim-parent");
 
 let currentEl = 0;
 
 let nextAction = null;
 
 let currentTimer = null;
 
 
 function hideLogo(el){
   el.querySelector("#logo").classList.add("hidden");
 }
 
 function removeHideLogo(el){
   el.querySelector("#logo").classList.remove("hidden");
 }
 
 
 
 function becomeActive(list) {
   // el.querySelector(".icon").classList.add("active");
   // el.querySelector(".mod-text").classList.add("active");
 
   list.forEach(function(elem) {
     // console.log(elem);
     elem.classList.add("active");
   });
 
 }
 
 function becomeInactive(el) {
     el.classList.remove("active");
 }
 
 function deactivateAll() {
   document.querySelectorAll(".active").forEach(becomeInactive);
 }
 
 function resetAnimation(el) {
   el.classList.remove("active");
   void el.offsetWidth;
   el.classList.add("active");
 }
 
 function resetAll() {
   document.querySelectorAll(".animate").forEach(resetAnimation);
 }
 
 function activate() {
   if(currentTimer) {
     window.clearTimeout(currentTimer);
   }
   console.log("current El", currentEl);
   if(parentList[currentEl]) {
     deactivateAll();
     currentTimer = window.setTimeout(function() {
       becomeActive(parentList[currentEl].querySelectorAll(".animate"))
       currentTimer = window.setTimeout(function(){
         currentEl += 1;
         activate();
       }, 2500);
     }, 500 );
 
   } else {
     deactivateAll();
     setTimeout(function(){
       document.querySelector("#logo").classList.add("end");
       document.querySelector("#value-prop").classList.add("end");
     },1500)
 
   }
 
 }
 
 (function() {
   console.log("starting");
   iconList.forEach(function(icon) {
     icon.classList.add("start-up");
   });
   document.querySelectorAll("#logo, #value-prop, #instructions, #pause, #restart").forEach(function(el) {
     el.classList.add("start-up");
   });
 
   window.setTimeout(function() {
     console.log("Activating: ");
     document.querySelectorAll(".start-up").forEach(function(el) {
       el.classList.remove("start-up");
     });
     activate();
   },6600);
 })()
 
 function pauseState(v) {
   v.style.animationPlayState = "paused";
 
 }
 
 function resumeState(v) {
   v.style.animationPlayState = "running";
 }
 
 function doingTheThing(v, state) {
 
 // console.log("State: ", state);
 
   if(state == true && !paused)  {
     resumeState(v);
   } else {
     pauseState(v);
   }
 
 // console.log(playingState, v);
 
 }
 
 function setPlayingState(state){
 
     playingState = state;
     if(state == true && !paused)  {
       activate();
     } else {
       deactivateAll();
       if(currentTimer) {
         window.clearTimeout(currentTimer);
       }
     }
     console.log("Playing State: ", playingState, paused);
 
     animList.forEach( function(v) {
       doingTheThing(v, state)
 
     });
 
 }
 
 function togglePlayingState(){
   // console.log("Paused State: ", !paused);
 
   paused = !paused
   setPlayingState(!playingState);
 
 }
 
 let mouseTimer;
 
 function iconMouseEnter(e) {
   // e.preventDefault();
   // e.stopPropagation();
   console.log(e.target.parentElement)
 
   if (paused) {return;}
 
   window.clearTimeout(mouseTimer);
 
   mouseTimer = window.setTimeout( function(){
 
     // console.log("iconMouseEnter");
 
     hideLogo();
     setPlayingState(false);
     resetAnimation(e.target);
     let list = [e.target.parentElement];
     e.target.parentElement.querySelectorAll('.animate').forEach(v =>
       list.push(v)
     );
     becomeActive(list);
 
   }, 150);
 
 }
 
 function iconMouseLeave(e) {
   e.preventDefault();
   e.stopPropagation();
 
   if (paused) {return;}
 
   window.clearTimeout(mouseTimer);
 
   mouseTimer = window.setTimeout( function(){
 
     // console.log("iconMouseLeave", e.target);
 
     setPlayingState(true);
     activate();
 
   }, 1000);
 
 }
 
 
 const PAUSEBTTN = document.getElementById("pause");
 
 const SVG = document.getElementById("graphic");
 
 PAUSEBTTN.addEventListener("click", togglePlayingState , false);
 
 window.setTimeout( function() {
 
   iconList.forEach(v => {
     v.addEventListener("mouseenter", iconMouseEnter , false)
     v.addEventListener("mouseleave", iconMouseLeave , false)
 
   });
 
 }, 6600);