{
  ("use strict");
  let tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  let firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  let player;
  // let playListId = "PL_-VfJajZj0VgpFpEVFzS5Z-lkXtBe-x5"; 116
  let playListId = "PL_-VfJajZj0U1MSx1IMu13oLJq2nM97ac";
  $.ajaxSetup({
    async: false,
  });
  function onYouTubeIframeAPIReady() {
    player = new YT.Player("player", {
      width: "1240",
      height: "700",
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
        // list: playListId,
      },
      events: {
        onReady: onPlayerReady,
      },
    });
  }
  let vol = 50;
  const volControls = document.querySelector(".volControls");
  const volControl = document.querySelector(".volControl");
  const playPause = document.querySelector(".playPause");
  const playPauseBtn = document.querySelector(".playPauseVideo");
  // const playPauseImg = playPauseBtn.querySelector(".playPauseImg");
  const contentVideo = document.getElementById("hungTinh");

  function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  function onPlayerReady(_event) {
    player.cuePlaylist({
      listType: "playlist",
      list: playListId,
      index: 0,
      startSeconds: 0,
      suggestedQuality: "auto",
    });
    player.setShuffle({
      shufflePlaylist: 1,
    });
    // player.cueVideoById("BmkVXoKoqVA");
    player.addEventListener("onStateChange", "onPlayerStateChange");
    player.stopVideo();
    showTime();
  }

  function onPlayerStateChange(event) {
    if ([1, 2, 5].indexOf(player.getPlayerState()) >= 0) {
      if (player.videoTitle) {
        document.getElementById("currentVideoTitle").innerText = player.videoTitle;
      }
    }
    console.log(player.getPlayerState());
    if (event.data === 1) {
      playPause.style.display = "none";
      playPauseImg.style.display = "flex";
      volControls.onmousemove = function () {
        volControl.style.display = "flex";
        volControls.style.backgroundColor = "#2d295b54";
        volControls.style.backdropFilter = "blur(10px)";
      };
    } else {
      playPause.style.display = "flex";
      playPauseImg.style.display = "none";
    }
    volControls.onmouseout = function () {
      volControl.style.display = "none";
      volControls.style.backgroundColor = "transparent";
      volControls.style.backdropFilter = "blur(0)";
    };
    volControl.onmousedown = function (e) {
      if (e.target.matches(".volUp") || e.target.matches(".volDown")) {
        e.target.style.backgroundColor = "#abfabf80";
        e.target.style.backgroundSize = "contain";
      }
    };
    volControl.onmouseup = function (e) {
      if (e.target.matches(".volUp") || e.target.matches(".volDown")) {
        e.target.style.backgroundColor = "transparent";
        e.target.style.backgroundSize = 0;
      }
    };
    volControl.onclick = function (e) {
      e.stopPropagation();
      if (e.target.matches(".volUp") && vol < 100) {
        vol += 10;
      } else if (e.target.matches(".volDown") && vol > 0) {
        vol -= 10;
      }
      player.setVolume(vol);
    };
    var isPlaying = false;
    function playPauseVideo() {
      switch (player.getPlayerState()) {
        case 5:
          player.seekTo(0);
          isPlaying = true;
          player.playVideo();
          return;
        case 1:
          player.pauseVideo();
          return;
        case 2:
          player.playVideo();
          return;
      }
    }
    const overlayControl = document.querySelector(".overlayVideo");
    overlayControl.onclick = function () {
      playPauseVideo();
    };
    playPauseBtn.onclick = function () {
      playPauseVideo();
    };

    const videoPlaylists = document.querySelector(".videoPlaylists");
    videoPlaylists.onclick = function (e) {
      console.log(e.target.id);
      if (e.target.matches(".videoItem")) {
        specifiedVideo(e.target.id);
      }
    };
    function specifiedVideo(id) {
      player.cueVideoById(id);
    }
    function stopVideo() {
      playPause.style.display = "flex";
      player.stopVideo();
    }
    const StopVideoBtn = document.querySelector(".StopVideo");
    StopVideoBtn.onclick = function () {
      stopVideo();
    };
    const testVideoBtn = document.querySelector(".testVideo");
    testVideoBtn.onclick = () => {
      testVideo();
    };
    var url = "";
    var dataListIdVideo;
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
    handleVideoPlaylist(dataListIdVideo);

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
      let answerEle = document.createElement("li");
      answerEle.id = `${Id}`;
      answerEle.className = "videoItem";
      answerEle.innerText = `${i + 1} - ${data.title}`;
      contentVideo.lastChild.after(answerEle);
      return answerEle;
    }
  }
  function testVideo() {
    changePlaylist();
  }
  function changePlaylist(playListId) {
    contentVideo.innerHTML = `<p></p>`;
    playListId = "PL_-VfJajZj0U1MSx1IMu13oLJq2nM97ac";
    player.cuePlaylist({
      list: playListId,
      index: 0,
      startSeconds: 0,
    });
    dataListIdVideo = player.getPlaylist();
    handleVideoPlaylist(dataListIdVideo);
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
}
