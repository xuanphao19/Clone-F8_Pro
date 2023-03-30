{
  ("use strict");
  let tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  let firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  let player;

  // Creating an object for the video using YouTube's API.
  function onYouTubeIframeAPIReady() {
    player = new YT.Player("player", {
      width: "950",
      height: "534",
      // videoId: "cCcLNNfn7DE", Chỉ định video mặc định khi tải trang
      playerVars: {
        playsinline: 1,
        controls: 0,
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
  const playPauseImg = playPauseBtn.querySelector(".playPauseImg");

  function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  function onPlayerReady(_event) {
    player.cuePlaylist({
      listType: "playlist",
      // list: PL5ED23F88FA83369B // (NHỮNG ID PLAYLIST CÓ KHẢ THI)
      // list: PLgHGispmpXWZC2UNYuh4kHOxAk3dhb4hD // Hay!
      // list: PLZxu0fu1e7uMzrLTUv6M8-XW3Rc3Le7e0 // Khúc hát sông quê!
      // list: "PL_-VfJajZj0VgpFpEVFzS5Z-lkXtBe-x5", // Js Sơn Đặng
      // list: "PL_-VfJajZj0Uwu5Y5G-wSet5uhKGxE7Cq", // Js Sơn Đặng
      // list: "PL_-VfJajZj0UjLMzxqGXUoE6iqpfbZysn", // Js Sơn Đặng
      // list: "PL_-VfJajZj0V5PMIaUflQ2UvpL9XZZhWT", // Js Sơn Đặng
      list: "RDCLAMNkRnLEg",
      //
      index: 0,
      startSeconds: 0,
      suggestedQuality: "hd720",
    });

    player.setShuffle({
      shufflePlaylist: 1,
    });

    player.addEventListener("onStateChange", "onPlayerStateChange");
    player.stopVideo();
    showTime();
    ////////////////////////////////////////////////
  }

  // Sử lý sau video playing thì vào đây 👇👇👇
  function onPlayerStateChange(event) {
    // if (player.getPlayerState() == -1) { No video }
    // if (player.getPlayerState() == 1) { play Video }
    // if (player.getPlayerState() == 2) { pause Video }
    // if (player.getPlayerState() == 3) { prev & Next }
    // if (player.getPlayerState() == 5) { stop Video }

    if ([1, 2, 5].indexOf(player.getPlayerState()) >= 0) {
      if (player.videoTitle) {
        document.getElementById("title").innerText = player.videoTitle;
      }
    }

    //   // Lấy danh sách id playList có video đang phát!

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

    // Chỉ định phát Video theo id OK
    function specifiedVideo(id) {
      player.cueVideoById(id);
      // player.playVideoAt(n); n = index
    }

    const videoPlaylists = document.querySelector(".videoPlaylists");
    videoPlaylists.onclick = function (e) {
      if (e.target.matches(".videoItem")) {
        specifiedVideo(e.target.id);
      }
    };

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
    function testVideo() {
      player.nextVideo();
      //    event.target.mute();
      //    event.target.setShuffle(true); Ok!
      //    event.target.setLoop(true); Ok?
      //    playRandomTrack();
      // player.previousVideo() Ok!
      // handleStateChange(); PL_-VfJajZj0VgpFpEVFzS5Z-lkXtBe-x5
    }

    // function showPlayList() {}
    // showPlayList(); handleData

    var dataListIdVideo = player.getPlaylist();
    const contentVideo = document.getElementById("hungTinh");
    var url = "";
    function handleData(dataListIdVideo) {
      if (dataListIdVideo && player.getPlayerState() === 5) {
        dataListIdVideo.map((IdVideo, i) => {
          url = "https://www.youtube.com/watch?v=" + IdVideo;
          $.getJSON(
            "https://noembed.com/embed",
            {format: "json", url: url},
            function (data) {
              if (data.url.includes(IdVideo)) {
                showPlayList(data, IdVideo, i);
              }
            },
          );
        });
      }
    }
    handleData(dataListIdVideo);

    function showPlayList(data, IdVideo, i) {
      let answerEle = document.createElement("li");
      answerEle.id = `${IdVideo}`;
      answerEle.className = "videoItem";
      answerEle.innerText = `${i + 1} - ${data.title}`;
      contentVideo.lastChild.after(answerEle);
    }
    ////////////////////////////////////////////////////////////////
  }

  ////////////////////////////////////////////////////////////////
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

  // function handleStateChange() {
  //   // player.removeEventListener();
  //   onPlayerStateChange = function () {};
  // }
}
// let answer = element.matches(".container");3vBwRfQbXkg
