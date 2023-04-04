{
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
  let url = "";
  let currentVideoId;
  let dataListIdVideo;
  let videoPlayer = select(".videoPlayer");
  let learnNow = select(".learnNow");
  const famousBrand = select("#famousBrand");
  const contentVideo = select("#lessonList");
  const overlayContent = select(".overlayContent");
  let presentationArea = select(".presentationArea");
  let playListId = "PL_-VfJajZj0U1MSx1IMu13oLJq2nM97ac";

  var myWidth = 1200;
  var myHeight = `${(myWidth / 16) * 9}`;
  let width_content;
  let height_content;

  function setWindowSize() {
    if (typeof window.innerWidth == "number") {
      myWidth = window.innerWidth;
      myHeight = window.innerHeight;
    } else {
      if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
        myWidth = document.documentElement.clientWidth;
        myHeight = document.documentElement.clientHeight;
      } else {
        if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
          myWidth = document.body.clientWidth;
          myHeight = document.body.clientHeight;
        }
      }
    }
    width_content = (myWidth * 77) / 100;
    height_content = ((width_content * 85) / 100 / 16) * 9;
    videoPlayer.style.setProperty("width", (width_content * 85) / 100 + "px");
    videoPlayer.style.setProperty("height", `${height_content}px`);
  }
  window.addEventListener("resize", setWindowSize);

  /* ===========   Khởi tạo trình phát   ============= */
  let tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  let firstScriptTag = $("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  let player;
  function onYouTubeIframeAPIReady() {
    window.addEventListener("resize", setWindowSize);
    player = new YT.Player("player", {
      // width:,
      // height:,
      playerVars: {
        playsinline: 1,
        controls: 1,
        autohide: 0,
        disablekb: 1,
        cc_load_policy: 0,
        iv_load_policy: 3,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        autoplay: 0,
        m: 0,
        enablejsapi: 1,
        list: playListId,
      },
      events: {
        onReady: onPlayerReady,
      },
    });
  }
  /* ======== onPlayerReady ========== */
  function onPlayerReady(_event) {
    player.cuePlaylist({
      listType: "playlist",
      index: 0,
      startSeconds: 0,
      suggestedQuality: "auto",
    });
    // player.cueVideoById("BmkVXoKoqVA");
    player.setShuffle(0);
    player.setShuffle(false);
    player.setLoop(true);
    player.getIframe().width = "100%";
    player.getIframe().height = "100%";
    player.addEventListener("onStateChange", "onPlayerStateChange");
    player.stopVideo();
    showTime();
  }
  let stateData = 0;
  /* ======== Lắng nghe thay đổi State ========== */
  function onPlayerStateChange(event) {
    window.addEventListener("resize", setWindowSize);
    const videoPlaylists = select(".sidebar_tracks");
    let titleVideo = player.videoTitle;
    currentVideoId = event.target.getVideoData().video_id;
    const handleActiveVideo = (currentId) => {
      let element = select(".lesson", true);
      if (element) {
        element.map(function (elem) {
          elem.classList.remove("active");
          if (elem.id === currentId) {
            elem.classList.add("active");
            return;
          }
        });
      }
    };
    if ([1, 2, 5].indexOf(player.getPlayerState()) >= 0) {
      showTitle(titleVideo);
      handleActiveVideo(currentVideoId);
    }
    handleVideoPlaylist(dataListIdVideo);
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
      switch (player.getPlayerState()) {
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
    stateData = event.data;
    toggleOverlay(stateData);

    learnNow.onclick = () => playPauseVideo();
    famousBrand.onclick = () => playPauseVideo();
    // window.addEventListener("resize", myFunctionResize);
    function showTitle(titleVideo) {
      var titleEl = select("#currentVideoTitle");
      if (titleVideo) {
        titleEl.innerText = titleVideo;
      }
    }
    function handleVideoPlaylist(listIdVideo) {
      if (listIdVideo) {
        listIdVideo = listIdVideo;
      } else {
        listIdVideo = player.getPlaylist();
      }
      if (listIdVideo && player.getPlayerState() === 5) {
        handleData(listIdVideo);
      }
    }
    function handleData(listIds) {
      if (listIds && player.getPlayerState() === 5) {
        const htmls = listIds.map((IdVideo, i) => {
          url = "https://www.youtube.com/watch?v=" + IdVideo;
          return getTitle(url, IdVideo, i);
        });
      }
    }
    function getTitle(url, Id, i) {
      return $.getJSON("https://noembed.com/embed", {
        format: "json",
        url: url,
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
                      <h4 class="lessonTitle"> ${i + 1} - ${data.title}</h4>
                      <span class="lesson_duration"> 03:00 </span>
                    </div>
                  </div>
                  <div class="icon_right">
                    <img class="lesson_bookmark" src="./assets/img/Small_icon/bookmark.svg" alt="bookmark">
                    <img class="lesson_checked" src="./assets/img/Small_icon/checked.svg" alt="lesson checked">
                  </div>`;
      contentVideo.lastChild.after(answerEle);
      return answerEle;
    }
    const handleId_Video = (num, currentId) => {
      let element = select(".lesson", true);
      let changeId = "";
      if (element) {
        element.map(function (elem, i) {
          var j = i + num;
          if (j <= 0) {
            j = element.length - 1;
          } else if (j >= element.length) {
            j = 0;
          }
          if (elem.id === currentId) {
            return (changeId = element[j]);
          }
        });
      }
      return changeId.id;
    };
    function testVideo() {
      changePlaylist();
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
    function toggleOverlay(num) {
      if (num != 5) {
        learnNow.classList.add("dpn");
      } else {
        learnNow.classList.remove("dpn");
      }
      if (num === 2 || num === 5) {
        overlayContent.classList.remove("dpn");
      } else {
        overlayContent.classList.add("dpn");
      }
    }
    select(".testVideo").onclick = () => {
      testVideo();
    };
    select("#stopVideo").onclick = () => {
      stopVideo();
    };
    select("#preVideo").onclick = () => {
      previousVideo();
    };
    select("#nextVideo").onclick = () => {
      nextVideo();
    };
    function specifiedVideo(id) {
      // chỉ định phát video theo id, phát từ đầu
      player.loadVideoById(id);
      player.seekTo(0, true);
    }
    function changePlaylist(playListId) {
      contentVideo.innerHTML = `<p></p>`;
      playListId = "PLe28tn1x4EIYnd9KSPfNEkstp-3rZiUOf";
      var newPlayListId = playListId;
      player.cuePlaylist({
        list: newPlayListId,
        index: 0,
        startSeconds: 0,
      });
      dataListIdVideo = player.getPlaylist();
      handleVideoPlaylist(dataListIdVideo);
    }
  }
  /* Khởi tạo ngoài !!!!!!!!!! */
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
}
