/**
 * ₛₚₐgₕₑₜₜᵢ cₒdₑ wᵢz₋bₐₙg ₃₀₀₀
 * `` ✨ it tastes like d̸̹̄͆̏̓̽͗͂͝͠i̴̡̧̬̻̩̖̯̇͐̓̽̅͛̎̏̀͝s̵̲͈̲̖̟̤̭͎̓͛́̒̓͗̀̆̑͝s̷̥͉͉̗̹͝ạ̵͈̖͚̇̐̋̈́̾̕ͅp̷͇̞͉̤̬̀̊́͆̈͆͜ŏ̷̧͉̤͉̳̺̳̥̦́͜͝î̶͖̳͈̦̞̊͜n̵̢̰̗͓͆͆̐̆͑̒͛́̂̓t̴̢̨͇̗̋̓̈́̀m̷̯̋͒̈́̈̈́̒̀͂͠ẻ̷̢̞̹͎̠͈͍̣͕̾͊̎̄͘n̸͝ͅt̶̢̗̺̰̹̳̻̉͛̊̈́̆̍̑͑̓͘ ~ ✨ ``
 *
 * All **JavaScript** here made by Anthony V.
 */

window.onload = function() {
    let navbar = document.querySelector(".navbar");
    let height = document.querySelector(".banner").offsetHeight - document.querySelector(".navbar").offsetHeight;
    let blue = document.querySelector(".blue");
    let wrapper = document.querySelector(".wrapper");


    let updateNavbar = () => {
        scroll = document.scrollingElement.scrollTop;
        if (scroll >= height) {
            navbar.classList.add("fixed");
            blue.classList.add("sm_blue");
            blue.style.top = navbar.offsetHeight + "px";
            wrapper.style.marginTop = blue.offsetHeight + "px";
        } else {
            navbar.classList.remove("fixed");
            blue.classList.remove("sm_blue");
            wrapper.style.marginTop = "0px";
        }
    };

    window.addEventListener("scroll", (evt) => {
        updateNavbar();
    }, {
        capture: true,
        passive: true
    });

    let collapsed = true;

    document.querySelector("#menuToggle button").onclick = () => {
        collapsed = !collapsed;

        if (!collapsed) {
            document.querySelector(".navbar").classList.add("active");
            document.querySelectorAll(".navbar ul li").forEach(el => {
                el.classList.add("visible");
            });
            updateNavbar();
        } else {
            document.querySelectorAll(".navbar ul li").forEach(el => {
                document.querySelector(".navbar").classList.remove("active");
                el.classList.remove("visible");
            });
            updateNavbar();
        }
    };

    let buttons = document.querySelectorAll(".ripple");

    let _ripple = (e) => {
        const button = e.currentTarget;
        button.dim = button.getBoundingClientRect();
        const circle = document.createElement("span");
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        let x = `${e.clientX - button.dim.left - radius}px`;
        let y = `${e.clientY - button.dim.top - radius}px`;

        if (e.clientX === 0 && e.clientY === 0) {
            x = `${button.dim.width / 2 - radius}px`;
            y = `${button.dim.height / 2 - radius}px`;
        }

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = x;
        circle.style.top = y;
        circle.classList.add("_ripple");

        const ripple = button.getElementsByClassName("_ripple")[0];

        if (ripple) {
            ripple.remove();
        }

        button.appendChild(circle);
    };

    buttons.forEach((button) => {
        button.addEventListener("click", _ripple);
    });

    let Flare = (function() {
        let player = document.querySelector("#musicPlayer");
        let music = new Audio("https://drive.google.com/uc?id=1Msf8rDz187eAs4ovmuFysUrk7NKX-iT7");

        let loop = document.querySelector("#musicPlayer .loop");

        let playback = document.querySelector("#musicPlayer div[playback]");
        playback.btn = document.querySelector("#musicPlayer .playback");
        playback.progress = playback.querySelector(".progress");
        playback.buffered = playback.querySelector(".buffered");
        playback.percent = 0;
        playback.range = playback.querySelector(".range");
        playback.jump = playback.querySelector(".jump");
        playback.circle = playback.querySelector(".circle");
        playback.timestamp = player.querySelectorAll("#musicPlayer .timestamp");

        let volume = document.querySelector("#musicPlayer div[volume]");
        volume.range_cont = volume.querySelector(".range-cont");
        volume.range = volume.querySelector(".range");
        volume.progress = volume.querySelector(".progress");
        volume.circle = volume.querySelector(".circle");
        volume.btn = volume.querySelector(".btn-text.volume");

        let updateRange = () => {
            playback.percent = music.currentTime / music.duration;
            playback.circle.style.left = `calc(${playback.percent * 100}% - ${playback.circle.offsetWidth / 2}px)`;
            playback.progress.style.width = `${playback.percent * 100}%`;

            if (playback.circle.getBoundingClientRect().left + playback.circle.offsetWidth - playback.range.offsetWidth > 0) {
                playback.circle.style.left = `calc(100% - ${playback.circle.offsetWidth})`;
            }

            playback.timestamp[0].innerHTML = new Date(music.currentTime * 1000).toISOString().substr(11, 8);
            playback.timestamp[1].innerHTML = new Date(music.duration * 1000).toISOString().substr(11, 8);
        };

        let updateRangeVolume = () => {
            volume.circle.style.bottom = `${music.volume * volume.range.offsetHeight - volume.circle.offsetHeight / 2}px`;
            volume.progress.style.height = `${music.volume * volume.range.offsetHeight + volume.circle.offsetHeight / 2}px`;
        };

        let toggleLoop = () => {
            music.loop = !music.loop;
            if (music.loop) {
                loop.classList.remove("disabled");
            } else {
                loop.classList.add("disabled");
            }
        };

        let togglePlay = () => {
            music.paused = !music.paused;
            if (music.paused) {
                music.play();
            } else {
                music.pause();
            }
        };

        let toggleMute = () => {
            music.muted = !music.muted;
            if (music.muted) {
                volume.btn.classList.add("disabled");
            } else {
                volume.btn.classList.remove("disabled");
            }
        };

        music.addEventListener('pause', (e) => {
            playback.btn.innerHTML = `<span class="fa-solid fa-play"></span>`;
        });

        music.addEventListener('play', (e) => {
            playback.btn.innerHTML = `<span class="fa-solid fa-pause"></span>`;
        });

        music.addEventListener('timeupdate', updateRange);

        music.onwaiting = (event) => {
            playback.btn.innerHTML = `<span class="loader"></span>`;
        };

        music.oncanplaythrough = (e) => {
            if (music.paused) {
                playback.btn.innerHTML = `<span class="fa-solid fa-play"></span>`;
            } else {
                playback.btn.innerHTML = `<span class="fa-solid fa-pause"></span>`;
            }
        };

        music.onloadedmetadata = (e) => {
            updateRange();

            playback.btn.addEventListener("click", togglePlay);
            loop.addEventListener("click", toggleLoop);

            volume.onmouseover = () => {
                volume.range_cont.style.display = 'block';
                updateRangeVolume();
            };

            volume.onmouseout = () => {
                volume.range_cont.style.display = 'none';
            };

            volume.btn.addEventListener("dblclick", toggleMute)

            volume.range.addEventListener("mousedown", (e) => {
                volume.circle.style.bottom = `${volume.range.getBoundingClientRect().bottom - e.clientY - volume.circle.offsetWidth / 2}px`;

                volume.progress.style.height = `calc(${volume.circle.style.bottom} + ${volume.circle.offsetHeight / 2}px)`;

                if ((volume.range.getBoundingClientRect().bottom - e.clientY - volume.circle.offsetWidth / 2) - (volume.range.offsetHeight - volume.circle.offsetHeight / 2) >= 0) {
                    volume.circle.style.bottom = `${volume.range.offsetHeight - volume.circle.offsetHeight / 2}px`;
                    volume.progress.style.height = `${volume.range.offsetHeight + volume.circle.offsetHeight / 2}px`;

                    // this is asking if the volume circle goes out of bounds, and if so, to set the circle to max volume minus its radius
                }
                if (parseInt(volume.circle.style.bottom, 10) - volume.circle.clientHeight / 2 <= 0) {
                    volume.circle.style.bottom = -volume.circle.clientHeight / 2 + 'px';
                    volume.progress.style.height = -volume.circle.clientHeight / 2 + 'px';

                    // checks if the circle goes too far down
                }

                let range = parseInt(volume.circle.style.bottom, 10) + volume.circle.offsetHeight / 2;

                if (range / volume.range.offsetHeight <= 1 && range / volume.range.offsetHeight >= 0) {
                    music.volume = (range / volume.range.offsetHeight).toFixed(1);;
                }
            });

            playback.range.addEventListener("mousedown", (e) => {
                playback.circle.style.left = `${e.clientX - playback.range.getBoundingClientRect().left}px`;
                playback.percent = parseInt(playback.circle.style.left, 10) / playback.range.offsetWidth;
                music.currentTime = music.duration * playback.percent;
            });

            playback.range.onmouseover = function(e) {
                let offset;
                let jump_w = parseInt(window.getComputedStyle(playback.jump, ':before')['border-top-width']) * 2
                window.innerWidth >= 600 ? offset = jump_w : offset = 0

                playback.jump.classList.add("visible");
                playback.jump.innerHTML = new Date(music.currentTime * 1000).toISOString().substr(11, 8);

                playback.range.onmousemove = (e) => {
                    playback.jump.style.left = `${e.clientX - playback.range.offsetLeft - playback.jump.clientWidth / 2 - offset}px`;
                    e.offsetLeft = (e.clientX - playback.range.offsetLeft - offset) / playback.range.offsetWidth;
                    if (e.offsetLeft >= 0 && e.offsetLeft <= 1) {
                        playback.jump.innerHTML = new Date(e.offsetLeft * music.duration * 1000).toISOString().substr(11, 8);
                    } else {
                        playback.jump.classList.remove("visible");
                    }
                };
            };

            playback.range.onmouseout = function(e) {
                playback.jump.classList.remove("visible");
                playback.jump.innerHTML = '';
            };

            music.addEventListener('progress', function() {
                if (music.duration > 0) {
                    for (var i = 0; i < music.buffered.length; i++) {
                        if (music.buffered.start(music.buffered.length - 1 - i) < music.currentTime) {
                            playback.buffered.style.width = (music.buffered.end(music.buffered.length - 1 - i) / music.duration) * 100 + "%";
                            break;
                        }
                    }
                }
            });
        };

        player.addEventListener("keydown", (e) => {
            switch (e.key) {
                case 'ArrowLeft':
                    music.currentTime -= 5;
                    break;
                case 'ArrowRight':
                    music.currentTime += 5;
                    break;
            }
        });
        return {
            player,
            music
        };
    })();

    document.querySelector(".gap").style.height = Flare.player.getBoundingClientRect().height * 1.29 + 'px';
};