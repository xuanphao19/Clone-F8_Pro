("use strict");
$.ajaxSetup({
  async: false,
});
const select = (el, all = false) => {
  el = el.trim();
  if (all) {
    return [...document.querySelectorAll(el)];
  } else {
    return document.querySelector(el);
  }
};
const getParent = (element, selector) => {
  while (element.parentElement) {
    if (element.parentElement.matches(selector)) {
      return element.parentElement;
    }
    element = element.parentElement;
  }
  return element;
};
let player,
  url = "",
  videoState = 0,
  currentVideoId,
  myWidth,
  playListId,
  listIdVideo;
const learnNow = select(".learnNow"),
  logoVideo = select(".logoVideo"),
  preLoades = select(".preLoades"),
  contentVideo = select("#lessonList"),
  famousBrand = select("#famousBrand"),
  tag = document.createElement("script"),
  presArea = select(".presentationArea"),
  overlayContent = select(".overlayContent"),
  videoForwarding = select("#videoForwarding"),
  selectCaption = select(".dropdown  .caption"),
  selectList = select(".dropdown  .caption_title"),
  selectOption = select(".list > .optgroup > .option", true);

document.onreadystatechange = () => {
  var widthBody = select("body").clientWidth;
  presArea.setAttribute("style", `--width:${Math.floor((((widthBody * 77) / 100) * 85) / 100)}px`);
};
function windowSize() {
  return {
    width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
  };
}
function setSizeVideoPlayer() {
  var winSize = windowSize();
  var setWidth = `${Math.floor((((winSize.width * 77) / 100) * 85) / 100)}`;
  presArea.setAttribute("style", `--width:${setWidth}px;`);
}
window.addEventListener("resize", setSizeVideoPlayer);

/* ===========   Khởi tạo trình phát   ============= */
(function loadIframeScript() {
  tag.src = "https://www.youtube.com/iframe_api";
  let firstScriptTag = $("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
})();
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    playerVars: {
      m: 0,
      fs: 0,
      rel: 0,
      loop: 1,
      index: 0,
      controls: 1,
      showinfo: 0,
      autohide: 0,
      autoplay: 0,
      disablekb: 1,
      enablejsapi: 1,
      playsinline: 1,
      startSeconds: 0,
      modestbranding: 1,
      cc_load_policy: 0,
      iv_load_policy: 3,
      suggestedQuality: "auto",
    },
    events: {
      onReady: onPlayerReady,
    },
  });
}
//
function onPlayerReady(event, playListId = "PL_-VfJajZj0U1MSx1IMu13oLJq2nM97ac") {
  if (playListId) {
    player.cuePlaylist({
      list: playListId,
      listType: "playlist",
    });
  } else {
    player.cueVideoById("DpvYHLUiZpc");
  }
  player.setShuffle(false);
  player.setLoop(true);
  player.getIframe().width = "100%";
  player.getIframe().height = "100%";
  player.addEventListener("onStateChange", "onPlayerStateChange");
  player.seekTo(0, true);
  showTime();
}
/* !!!!!!!!!!!!!!!!!!!!!!!!! */
selectCaption.onclick = function (e) {
  let eleParent = getParent(e.target, ".dropdown");
  eleParent.classList.toggle("toggle");
  player.stopVideo();
};
var i = 1;
let canRun = false;

function onPlayerStateChange(event) {
  const videoPlaylists = select(".sidebar_tracks");
  let titleVideo = player.videoTitle;
  currentVideoId = event.target.getVideoData().video_id;
  const handleActiveVideo = (currentId) => {
    let element = select(".lesson", true);
    if (element) {
      element.map(function (elem, i) {
        elem.classList.remove("active");
        if (elem.id === currentId) {
          elem.classList.add("active");
          return;
        }
      });
    }
  };
  videoState = player.getPlayerState();
  if ([1, 2, 5].indexOf(videoState) >= 0) {
    showTitle(titleVideo);
    if (videoState === 1) {
      handleActiveVideo(currentVideoId);
    }
  }

  player.addEventListener("enterfullscreen", onEnterFullscreen);
  function onEnterFullscreen() {}
  listIdVideo = player.getPlaylist();
  function showTitle(titleVideo) {
    var titleEl = select("#currentVideoTitle");
    if (titleVideo) {
      titleEl.innerText = titleVideo;
    }
  }
  videoPlaylists.onclick = function (e) {
    let element = getParent(e.target, ".lesson");
    if (e.target.id) {
      specifiedVideo(e.target.id);
    } else if (element) {
      specifiedVideo(element.id);
    }
  };
  var isPlaying = false;
  function playPauseVideo() {
    switch (videoState) {
      case 5:
        isPlaying = true;
        playVideo();
        player.seekTo(0);
        return;
      case 1:
        pauseVideo();
        return;
      case 2:
        playVideo();
        return;
    }
  }

  function changePlaylist(listId) {
    // isPlaying = true;
    window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    onPlayerReady("", listId);
  }

  clearTimeout(myTimeout);
  clearTimeout(hidePreload);

  selectOption.map(function (option) {
    option.onclick = function (e) {
      let eleParent = getParent(e.target, ".dropdown");
      eleParent.classList.toggle("toggle");
      selectList.innerHTML = option.innerText;
      let listId = e.target.getAttribute("data-list");
      if (listId) {
        changePlaylist(listId);
      }
    };
  });

  let vdState = player.getPlayerState();
  if (listIdVideo && vdState === 5 && !canRun) {
    canRun = true;
    preLoades.setAttribute("style", "display: block !important;");
    var myTimeout = setTimeout(() => {
      listIdVideo = player.getPlaylist();
      handleData(listIdVideo);
      canRun = false;
    }, 500);
    i++;
    var hidePreload = setTimeout(() => {
      preLoades.setAttribute("style", "display: none !important;");
    }, 2000);
  }

  function handleData(listIds) {
    player.cuePlaylist({
      list: listIds,
    });
    if (listIds) {
      contentVideo.innerHTML = `<p></p>`;
      const htmls = listIds.map((IdVideo, i) => {
        url = "https://www.youtube.com/watch?v=" + IdVideo;
        return getTitle(url, IdVideo, i);
      });
    }
  }
  function getTitle(url, Id, i) {
    return $.getJSON("https://noembed.com/embed", {
      url: url,
      format: "json",
    }).then(function (data) {
      showPlayList(data, Id, i);
    });
  }
  function showPlayList(data, Id, i) {
    let answerEle = document.createElement("div");
    answerEle.id = `${Id}`;
    answerEle.className = "lesson";
    answerEle.innerHTML = `
                  <div class="lessonContent">
                    <img class="icon_left" src="./assets/img/Small_icon/playVideo.svg" alt="left">
                    <div class="lessonInfo">
                      <h4 class="lessonTitle"> ${i + 1} 💔 ${data.title}</h4>
                      <span class="lesson_duration"> 03:00 </span>
                    </div>
                  </div>
                  <div class="icon_right">
                    <img class="lesson_bookmark" src="./assets/img/Small_icon/bookmark.svg" alt="bookmark">
                    <img class="lesson_checked" src="./assets/img/Small_icon/checked.svg" alt="lesson checked">
                  </div>`;
    let elements = select(".lesson", true);
    contentVideo.lastChild.after(answerEle);
    return answerEle;
  }

  const handleId_Video = (num, currentId) => {
    let elementIds = select(".lesson", true);
    let changeId = "";
    if (elementIds) {
      elementIds.map(function (elem, i) {
        var j = i + num;
        if (j < 0) {
          j = elementIds.length - 1;
        } else if (j >= elementIds.length) {
          j = 0;
        }
        if (elem.id === currentId) {
          return (changeId = elementIds[j]);
        }
      });
    }
    return changeId.id;
  };

  videoState = player.getPlayerState();
  if (videoState === 1 || videoState === 5) {
    recommendSlider(0, 5, currentVideoId);
  }

  function toggleOverlay(num) {
    switch (num) {
      case -1:
        learnNow.classList.remove("dpn");
        overlayContent.classList.add("dpn");
        logoVideo.setAttribute("style", "animation:  ");
        break;
      case 1:
        clearTimeout(hidePreload);
        learnNow.classList.add("dpn");
        famousBrand.classList.add("toggle");
        overlayContent.classList.add("dpn");
        logoVideo.setAttribute("style", "animation: fade_left 2s linear 5s forwards; ");
        break;
      case 2:
        learnNow.classList.add("dpn");
        overlayContent.classList.remove("dpn");
        break;
      case 3:
        learnNow.classList.add("dpn");
        overlayContent.classList.add("dpn");
        break;
      case 5:
        learnNow.classList.remove("dpn");
        famousBrand.classList.remove("toggle");
        overlayContent.classList.remove("dpn");
        break;

      default:
        break;
    }
  }

  function playVideo() {
    player.playVideo();
  }
  function pauseVideo() {
    player.pauseVideo();
  }
  function stopVideo() {
    player.stopVideo();
  }
  function nextVideo() {
    currentVideoId = player.getVideoData().video_id;
    let new_id = handleId_Video(1, currentVideoId);
    if (new_id) {
      player.loadVideoById(new_id);
      player.seekTo(0, true);
    }
  }
  function previousVideo() {
    currentVideoId = player.getVideoData().video_id;
    let new_id = handleId_Video(-1, currentVideoId);
    if (new_id) {
      player.loadVideoById(new_id);
      player.seekTo(0, true);
    }
  }
  function specifiedVideo(id) {
    player.loadVideoById(id);
    player.seekTo(0, true);
  }

  function recommendSlider(minIndex, maxIndex, currId) {
    let element = select(".lesson", true);
    let min = minIndex,
      max = maxIndex,
      length = element.length;
    if (element && length >= 5) {
      let Id = currId ? currId : element[2].id;
      element.map(function (elem, i) {
        if (elem.id === Id) {
          videoForwarding.innerHTML = `<p></p>`;
          if (2 <= i && i < length - 2) {
            min = i - 2;
            max = i + 3;
          } else if (i >= length - 2) {
            min = length - 5;
            max = length;
          }
          for (let index = min; index < max; index++) {
            let eleId = element[index].id;
            let videoInfo = document.createElement("div");
            videoInfo.dataset.id = `${eleId}`;
            videoInfo.className = "swiper-slide";
            videoInfo.innerHTML = `
                            <div class="Slideshow_wrap">
                              <div
                                class="Slideshow recommended"
                                style="
                                  background-image: url('https://img.youtube.com/vi/${eleId}/mqdefault.jpg');
                                ">
                                <span> Xem Ngay! </span>
                              </div>
                            </div>`;
            videoForwarding.lastChild.after(videoInfo);
          }
        }
      });
    }
  }

  videoForwarding.onclick = function (e) {
    e.stopPropagation();
    let suggestedVideos = select("[data-id]", true);
    if (suggestedVideos) {
      let videoEle = getParent(e.target, ".swiper-slide");
      let videoId = videoEle.getAttribute("data-id");
      if (videoId) {
        specifiedVideo(videoId);
      }
    }
  };

  toggleOverlay(videoState);
  learnNow.onclick = () => {
    clearTimeout(hidePreload);
    specifiedVideo(currentVideoId);
  };
  famousBrand.onclick = () => playPauseVideo();
  select("#stopVideo").onclick = () => stopVideo();
  select("#nextVideo").onclick = () => nextVideo();
  select("#preVideo").onclick = () => previousVideo();
  select("#logoVideo").onclick = () => specifiedVideo("1T0vfGh_0-4");
}

function showTime() {
  let cur_hh = document.querySelector(".cur_hh");
  let cur_mm = document.querySelector(".cur_mm");
  let cur_ss = document.querySelector(".cur_ss");
  setInterval(() => {
    var currTime = Math.floor(player.getCurrentTime());
    var ss_Time = `${currTime % 60}`;
    var mm_Time = `${Math.floor(currTime / 60) % 60}`;
    var hh_Time = `${Math.floor(currTime / 60 / 60) % 24}`;
    if (ss_Time < 10) {
      cur_ss.innerText = `0${ss_Time}`;
    } else if (10 < ss_Time && ss_Time < 60) {
      cur_ss.innerText = `${ss_Time}`;
    }
    if (mm_Time < 10) {
      cur_mm.innerText = `0${mm_Time}:`;
    } else if (10 < mm_Time && mm_Time < 60) {
      cur_mm.innerText = `${mm_Time}:`;
    }
    if (hh_Time < 10) {
      cur_hh.innerText = `0${hh_Time}:`;
    } else if (10 < hh_Time && hh_Time < 24) {
      cur_hh.innerText = `${hh_Time}:`;
    }
  }, 1000);
}
