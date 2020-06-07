const vid = document.querySelector("#opening-video");

// Execute this after the main, "heavy" video is loaded
// This code replaces videos, hides the message
let hoverRect = document.querySelector(".hover-space")


vid.addEventListener("canplay", () => {


  //change text of the message if the main, "heavy" video has loaded
  // let loadingMessage = document.querySelector('.message');
  // loadingMessage.innerHTML= "Loaded just hover"


  let el = document.querySelector('#before-loaded')
  let newEl = document.querySelector('#opening-video')


  let counter = 0;
  function counterUpdate() {
    counter ++;
  }
  el.addEventListener('ended',counterUpdate,false);

  hoverRect.addEventListener('mouseover', () => {

    hoverRect.classList.toggle("hide");


    let waitingTime = 4000;
    if (counter==0) {
      el.addEventListener('ended', myHandler,false);
      function myHandler(e) {

        newEl.classList.toggle("hide");
        newEl.classList.toggle("video-styles");
        el.parentNode.replaceChild(newEl, el);
        setTimeout(showMenu,waitingTime);

      }
    } else if (counter==1) {

      newEl.classList.toggle("hide");
      newEl.classList.toggle("video-styles");
      el.parentNode.replaceChild(newEl, el);
      setTimeout(showMenu,waitingTime);

    }

    function showMenu () {
      document.querySelector('main').style.visibility = "visible";
      document.querySelector('.background-element').classList.add("opacityIn");
      document.querySelector('nav').classList.add("scaleIn");
      document.querySelector('.banner').classList.add("banner-animation");

      run(4000, 5);


      console.log(document.getElementById("bg-img").src);
    }

  });


});

let bgImages = document.querySelectorAll("#bg-img")
let arrayBgImages = Array.from(bgImages)

console.log(arrayBgImages);
function run(interval, frames) {
  var int = 2;

  function func() {

      let dataSource = arrayBgImages[0].getAttribute("data-src");
      arrayBgImages[0].src = `${dataSource + int}.jpg`

      int++;
      if(int === frames) { int = 1; }
  }

    var swap = window.setInterval(func, interval);
}



  function showSection (elem) {

    let targettedSections = document.querySelectorAll("section")
    document.querySelectorAll('#logo-element').forEach(logoPart => {
      logoPart.classList.remove("logoOpen");
    })

    targettedSections.forEach(section => {
      let sectionMatching = section.getAttribute("data-targetted-section")
      if (sectionMatching === elem) {
        section.classList.toggle("hidden");
      } else if (elem === "about") {
        faceVid.play()
      }

    });


  }

  function hideSection () {
    document.querySelectorAll('#logo-element').forEach(logoPart => {
      logoPart.classList.add("logoOpen");
    })

    let targettedSections = document.querySelectorAll("section")
    targettedSections.forEach(section => {
      section.classList.add("hidden");
    });
    faceVid.pause()
  }

  const navElements = document.querySelectorAll("#nav-elem");
  navElements.forEach(element => {
    // console.log(element);
    element.addEventListener("click", () => {
      let navElement = element.getAttribute("data-section")
      console.log(navElement);
      showSection(navElement)
    })

  })


  let faceVid = document.getElementById("face-vid");
  let soundStatus = faceVid.muted;
  let playStatus = faceVid.paused;
  let unmuteButton = document.getElementById("unmute-btn");
  unmuteButton.addEventListener("click", (e) => {
    console.log("clicked")
    e.preventDefault()
    if (soundStatus) {
      unmuteButton.classList.remove("highlight");
      playButton.classList.add("highlight");
      faceVid.muted = false;
      soundStatus = false;

    } else if (!soundStatus) {
      unmuteButton.classList.add("highlight");
      faceVid.muted = true;
      soundStatus = true;
    }

  })

  let playButton = document.getElementById('play-button');
  playButton.addEventListener('click', (e) => {
    unmuteButton.classList.remove("highlight");
    playButton.classList.add("highlight");
    e.preventDefault()
    smoothScroll(document.getElementById('face-vid'))
    faceVid.muted = false;
    soundStatus = false;
  })


  window.smoothScroll = function(target) {
    var scrollContainer = target;
    do { //find scroll container
        scrollContainer = scrollContainer.parentNode;
        if (!scrollContainer) return;
        scrollContainer.scrollTop += 1;
    } while (scrollContainer.scrollTop == 0);

    var targetY = 0;
    do { //find the top of target relatively to the container
        if (target == scrollContainer) break;
        targetY += target.offsetTop;
    } while (target = target.offsetParent);

    scroll = function(c, a, b, i) {
        i++; if (i > 30) return;
        c.scrollTop = a + (b - a) / 30 * i;
        setTimeout(function(){ scroll(c, a, b, i); }, 20);
    }
    // start scrolling
    scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
}



document.getElementById('logo-wrapper').addEventListener('click', () => {
 hideSection();
})

document.querySelector(".shroom").addEventListener("mouseover", function () {
  document.querySelector(".nav-all-pages").classList.add("show-nav")
})
document.querySelector(".nav-all-pages").addEventListener("mouseleave", function () {
  document.querySelector(".nav-all-pages").classList.remove("show-nav")
})
