const home = document.querySelector(".home");
const vid = document.querySelector("#opening-video");
const hoverRect = document.querySelector(".hover-space")




// DETECT MOBILE FOR MAIN PAGE
//IF MOBILE: remove video elements
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || home) {

  if (hoverRect) {
    hoverRect.remove();
    let el = document.querySelector('#before-loaded')
    let newEl = document.querySelector('#opening-video')
    if (el && newEl) {
      el.remove()
      newEl.remove();
    }
    document.querySelector('main').style.visibility = "visible";
    document.querySelector('.background-element').classList.add("opacityIn");
    document.querySelector('nav').classList.add("scaleIn");
    run(4000, 5);
    console.log(document.getElementById("bg-img").src);
  }
}
// DESKTOP, IF OPENING PAGE
// CHANGE CURSOR TO WAIT BEFORE THE VIDEO IS ABLE TO PLAY
if (vid) {
  if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

    let el = document.querySelector('#before-loaded')
    let newEl = document.querySelector('#opening-video')

    vid.addEventListener('loadeddata', function() {
      hoverRect.addEventListener('click', () => {
        if (vid.readyState <= 4) {
          document.body.style.cursor = "wait";
        }
      })
    });



    vid.addEventListener("loadeddata", () => {

      let counter = 0;

      function counterUpdate() {
        counter++;
      }

      // Execute this after the main, "heavy" video is loaded
      // This code replaces videos
      el.addEventListener('ended', counterUpdate, false);
      //what if the first video ends but you don't click again

      hoverRect.addEventListener('click', () => {
        let waitingTime = 4000;

        hoverRect.classList.toggle("hide");

        if (counter == 0) {
          el.addEventListener('ended', myHandler, false);

          function myHandler(e) {

            newEl.classList.toggle("hide");
            newEl.classList.toggle("video-styles");
            el.parentNode.replaceChild(newEl, el);
            document.body.style.cursor = "default";
            setTimeout(showMenu, waitingTime);

          }
        } else if (counter == 1) {

          newEl.classList.toggle("hide");
          newEl.classList.toggle("video-styles");
          el.parentNode.replaceChild(newEl, el);
          document.body.style.cursor = "default";
          setTimeout(showMenu, waitingTime);

        }

        function showMenu() {

          document.querySelector('main').style.visibility = "visible";
          document.querySelector('.background-element').classList.add("opacityIn");
          document.querySelector('nav').classList.add("scaleIn");
          run(4000, 5);
        }

      });
    });
  }
}

// DEALING WITH LOGO IMAGES CHANGING CONSTANTLY
let bgImages = document.querySelectorAll("#bg-img")
let arrayBgImages = Array.from(bgImages)

function run(interval, frames) {
  var int = 2;

  function func() {

    let dataSource = arrayBgImages[0].getAttribute("data-src");
    arrayBgImages[0].src = `${dataSource + int}.jpg`

    int++;
    if (int === frames) {
      int = 1;
    }
  }
  var swap = window.setInterval(func, interval);
}


// TOP/NAV BAR LOGO OPENING MENU
if (document.querySelector("section")) {


  document.querySelector(".navigation-top").addEventListener("click", () => {

    document.querySelectorAll(".element").forEach(element => {
      element.classList.toggle("logoOpen")
    })
    document.querySelector(".banner").classList.toggle("active")
    document.querySelector(".navigation-top ul").classList.toggle("active")
  })
}



let sectionAbout = document.getElementById("about-section");
let sectionOpenCall = document.getElementById("open-call-section")
let sectionArchive = document.getElementById("archive-section")
let sectionFood = document.getElementById("food-section")
let sectionEvents = document.getElementById("events-section")




if (sectionEvents) {

  let eventsElements = document.querySelectorAll("ul.events-list")
  let eventsMore = document.querySelectorAll("div.event-more")
  let arrayFromEventsElements = Array.from(eventsElements)
  console.log(arrayFromEventsElements);
  for (let i = 0; i < arrayFromEventsElements.length; i++) {
    arrayFromEventsElements[i].addEventListener("click", function(event) {
      console.log(i);
      eventsElements.forEach(element => {
        element.classList.remove("underline")
      })
      eventsElements[i].classList.add("underline")
      eventsMore.forEach(eventElement => {
        eventElement.classList.add("hidden")
      })
      eventsMore[i].classList.remove("hidden")
    })
  }
}

if (sectionOpenCall) {

  let openCalls = document.querySelectorAll("#block-event")
  let openCallsMore = document.querySelectorAll(".extra-info")
  let openCallsMorePoster = document.querySelectorAll("#poster")
  let arrayFromOpenCallsElements = Array.from(openCalls)
  
  for (let i = 0; i < arrayFromOpenCallsElements.length; i++) {
    arrayFromOpenCallsElements[i].addEventListener("click", function(event) {
      console.log(i);
      // openCalls.forEach(element => {
      //   element.classList.remove("underline")
      // })

      openCallsMore.forEach(eventElement => {
        eventElement.classList.add("hidden")
      })
      openCallsMorePoster.forEach(eventElement => {
        eventElement.classList.add("hidden")
      })
      openCallsMorePoster[i].classList.remove("hidden")
      openCallsMore[i].classList.remove("hidden")
    })
  }

}

if (sectionArchive || sectionFood) {
  run(7000, 5);
}

if (sectionAbout) {

  document.querySelector('.banner').classList.add("banner-animation");

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
    smoothScroll(document.querySelector('.faces'))
    faceVid.muted = false;
    faceVid.play();
  })

}

//SCROLL SMOOTHLY TO THE TARGET ELEMENT
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
    i++;
    if (i > 30) return;
    c.scrollTop = a + (b - a) / 30 * i;
    setTimeout(function() {
      scroll(c, a, b, i);
    }, 20);
  }
  // start scrolling
  scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
}


//RECEIVING VALUES FROM VIDEOS FROM ABOUT SECTION AND MATCHING ATTRIBUTES WITH BB NAMES
let videoNames = document.querySelectorAll("#video-name")

function changeVideo(a) {
  videoName.src = a;
}
let videoInView = document.getElementById("video-src")
let videocontainer = document.getElementById("face-vid")
videoNames.forEach(videoName => {

  videoName.addEventListener("click", function(e) {
    e.preventDefault()
    videoNames.forEach(videoNameInside => {
      videoNameInside.classList.remove("current")
    })

    e.target.classList.add("current")
    if (videoInView.getAttribute("data-src") === videoName.getAttribute("data-src")) {
      return;
    } else {
      videocontainer.pause();
      videoInView.setAttribute('src', videoName.getAttribute("data-src"));
      videoInView.setAttribute('data-src', videoName.getAttribute("data-src"));
      videocontainer.load();
      videocontainer.play();
      document.getElementById("play-button").classList.add("highlight")
      document.getElementById("unmute-btn").classList.remove("highlight")
      videocontainer.muted = false;
    }

  });

})
