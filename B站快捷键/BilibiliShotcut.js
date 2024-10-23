// ==UserScript==
// @name         B站快捷键
// @description  B站播放视频或直播时可用的快捷键，直接使用键盘操作，比鼠标更便捷
// @namespace    https://github.com/RiverYale/Userscripts/
// @homepage     https://riveryale.github.io/Userscripts/
// @version      5.4
// @author       RiverYale
// @match        *://www.bilibili.com/video/*
// @match        *://www.bilibili.com/bangumi/*
// @match        *://www.bilibili.com/blackboard/*
// @match        *://www.bilibili.com/festival/*
// @match        *://live.bilibili.com/*
// @icon         https://www.bilibili.com/favicon.ico?v=1
// @run-at       document-start
// @compatible   chrome
// @compatible   edge
// @license      MIT License
// ==/UserScript==

/*================== 更新脚本前注意保存自己修改的内容！ ==================*/

var onKeyDown = function (e) {
	if (pageType == 3) {
		var activeInput = document.activeElement
		if (activeInput == document.querySelector(".chat-input-new > textarea")
			|| activeInput == document.querySelector(".fullscreen-danmaku .chat-input")) {
			if (27 == e.keyCode) {     // Esc
				activeInput.blur()
			} else {
				return
			}
		}
	}
	if (17 == e.keyCode) {				// Ctrl 弹幕开关
		danmuToggle(e);
	} else if (76 == e.keyCode) {		// L 画面占比调整
		videoScale();
	} else if (191 == e.keyCode) {		// /? 全屏
		fullScreenToggle(e);
	} else if (222 == e.keyCode) {		// '" 宽屏
		wideScreenToggel();
	} else if (188 == e.keyCode) {		// ,< 减速
		speedAdjust("down");
	} else if (190 == e.keyCode) {		// .> 加速
		speedAdjust("up");
	} else if (186 == e.keyCode) {		// ;: 视频结束后重播，直播时刷新
		restart(e);
	} else if (32 == e.keyCode) {		// Space 直播时暂停
		livePause(e);
	} else if (38 == e.keyCode) {		// ↑键 直播时音量+
		liveVolumeAdjust(e, "up");
	} else if (40 == e.keyCode) {		// ↓键 直播时音量-
		liveVolumeAdjust(e, "down");
	} else if (77 == e.keyCode) {		// M键 静音开关
		liveMutedToggle(e);
	} else if (81 == e.keyCode) {		// Q 直播选择最高画质
		qualitySelect()
	} else if (83 == e.keyCode) {		// S 直播弹幕侧边栏
		sliderToggle()
	}
}
document.addEventListener("keydown", onKeyDown);

/*================== 更新脚本前注意保存自己修改的内容！ ==================*/

var pageType = 0;
if (document.URL.indexOf("https://www.bilibili.com/video") >= 0) {
	pageType = 0;
} else if(document.URL.indexOf("https://www.bilibili.com/blackboard") >= 0) {
	pageType = 1;
} else if(document.URL.indexOf("https://www.bilibili.com/festival") >= 0) {
	pageType = 1;
} else if(document.URL.indexOf("https://www.bilibili.com/bangumi") >= 0) {
	pageType = 2;
} else if(document.URL.indexOf("https://live.bilibili.com") >= 0) {
	pageType = 3;
}


const LIVE_TOOLS_LEFT = ".left-area .icon";
const LIVE_TOOLS_RIGHT = ".right-area .icon";

function danmuToggle(e) {
	switch (pageType) {
		case 0:
		case 1:
		case 2:
			if (e.keyCode != 68 || e.shiftKey || e.ctrlKey || e.altKey || e.metaKey) {
				fireKeyEvent(document.querySelector('body'), 'keydown', 68);
				fireKeyEvent(document.querySelector('body'), 'keyup', 68);
			}
			break;
		// case 2:
		// 	document.querySelectorAll('[aria-label="弹幕显示隐藏"] .bui-switch-input')[0].click();
		// 	break;
		case 3:
			var video = document.querySelector("video");
			imitataMouseMove(video, 0, 0);
			document.querySelectorAll(LIVE_TOOLS_RIGHT)[3].click()
			break;
	}
}

function videoScale() {
	var video;
	switch (pageType) {
		case 0:
		case 1:
			// var video_wrapper = document.querySelector(".bilibili-player-video");
			// video_wrapper.style.justifyContent = 'center';
			// video_wrapper.style.alignItems = 'center';
			// video = video_wrapper.children[0];
			// if (video_wrapper.children.length < 2) {
			// 	var style_node = document.createElement('style');
			// 	style_node.innerHTML = 'bwp-video { height: 100%; }';
			// 	video_wrapper.appendChild(style_node);
			// }
			// break;
		case 2:
			var video_wrapper = document.querySelector(".bpx-player-video-wrap");
			video_wrapper.style.display = 'flex';
			video_wrapper.style.justifyContent = 'center';
			video_wrapper.style.alignItems = 'center';
			video = video_wrapper.children[0];
			break;
		case 3:
			video = document.querySelector("video");
			video.style.bottom = '0';
			video.style.right = '0';
			video.style.margin = 'auto';
			break;
	}

	if (video.style.width == '') {
		video.style.width = '100%';
	}
	var width = video.style.width.slice(0, -1) - 25;
	width = (width + 75) % 100 + 25;
	video.style.width = width + '%';
	video.style.height = width + '%';
}

function fullScreenToggle(e) {
	switch (pageType) {
		case 0:
		case 1:
		case 2:
			if (e.keyCode != 70 || e.shiftKey || e.ctrlKey || e.altKey || e.metaKey) {
				fireKeyEvent(document.querySelector('body'), 'keydown', 70);
				fireKeyEvent(document.querySelector('body'), 'keyup', 70);
			}
			break;
		// case 2:
			// document.querySelector(".squirtle-fullscreen-wrap").children[0].click();
			// break;
		case 3:
			var video = document.querySelector("video");
			imitataMouseMove(video, 0, 0);
			document.querySelectorAll(LIVE_TOOLS_RIGHT)[0].click()
			break;
	}
}

function wideScreenToggel() {
	switch (pageType) {
		case 0:
		case 1:
			document.querySelector(".bpx-player-ctrl-wide").click();
			break;
		case 2:
			document.querySelector(".squirtle-widescreen-wrap").children[0].click();
			break;
		case 3:
			var video = document.querySelector("video");
			imitataMouseMove(video, 0, 0);
			document.querySelectorAll(LIVE_TOOLS_RIGHT)[1].click()
			break;
	}
}

function speedAdjust(upOrDown) {
	switch (pageType) {
		case 0:
		case 1:
		case 2:
			var video = document.querySelector("video");
			var step = document.querySelectorAll('.bpx-player-ctrl-playbackrate-menu')[0];
			if (video == null) {
				video = document.querySelector("bwp-video");
			}
			if (step == undefined) {
				step = document.querySelectorAll('.squirtle-speed-select-list')[0];
			}
			step = step.children;
			for (let i = 0; i < step.length; i++) {
				if (-1 != step[i].getAttribute("class").search("active")) {
					var infoText = step[i].innerHTML;
					if ("down" == upOrDown && i < step.length - 1) {
						step[i + 1].click();
						infoText = step[i + 1].innerHTML;
					} else if ("up" == upOrDown && i > 0) {
						step[i - 1].click();
						infoText = step[i - 1].innerHTML;
					}
					break;
				}
			}
			showInfo(video.parentNode, infoText);
			break;
		case 3:
			break;
	}
}

function restart(e) {
	switch (pageType) {
		case 0:
		case 1:
			var re = function() {
				var endingPanel = document.querySelector(".bpx-player-ending-panel");
				var restartIcon = document.querySelector("[data-action='restart']");
				if (endingPanel != null && window.getComputedStyle(endingPanel).visibility != 'hidden') {
					restartIcon.click();
				}
			}

			var electricPanel = document.querySelector(".bpx-player-electric-panel");
			var jumpElectric = document.querySelector(".bpx-player-electric-jump");
			if (electricPanel != null && window.getComputedStyle(electricPanel).visibility != 'hidden') {
				jumpElectric.click();
				setTimeout(re, 500)
			} else {
				re();
			}
			break;
		case 2:
			var endingPanel = document.querySelector(".bpx-player-ending-panel");
			var restartIcon = document.querySelector(".restart");
			if (endingPanel != null && window.getComputedStyle(endingPanel).visibility != 'hidden') {
				if(restartIcon == null) {
					if (e.keyCode != 32 || e.shiftKey || e.ctrlKey || e.altKey || e.metaKey) {
						fireKeyEvent(document.querySelector('body'), 'keydown', 32);
						fireKeyEvent(document.querySelector('body'), 'keyup', 32);
					}
				} else {
					restartIcon.click();
				}
			}
			break;

			// var electricPanel = document.querySelector(".bpx-player-electric-panel");
			// var endingPanel = document.querySelector(".bpx-player-ending-panel");
			// if (electricPanel != null && window.getComputedStyle(electricPanel).visibility != 'hidden' || endingPanel != null && window.getComputedStyle(endingPanel).visibility != 'hidden') {
			// 	fireKeyEvent(document.querySelector('body'), 'keydown', 32);
			// 	fireKeyEvent(document.querySelector('body'), 'keyup', 32);
			// }
		case 3:
			var video = document.querySelector("video");
			imitataMouseMove(video, 0, 0);
			document.querySelectorAll(LIVE_TOOLS_LEFT)[1].click()
			break;
	}
}

function livePause(e) {
	switch (pageType) {
		case 0:
		case 1:
		case 2:
			if (e.keyCode != 32 || e.shiftKey || e.ctrlKey || e.altKey || e.metaKey) {
				fireKeyEvent(document.querySelector('body'), 'keydown', 32);
				fireKeyEvent(document.querySelector('body'), 'keyup', 32);
			}
			break;
		case 3:
			e.preventDefault();
			var video = document.querySelector("video");
			imitataMouseMove(video, 0, 0);
			document.querySelectorAll(LIVE_TOOLS_LEFT)[0].click()
			break;
	}
}

function liveVolumeAdjust(e, upOrDown) {
	switch (pageType) {
		case 0:
		case 1:
		case 2:
			if ("up" == upOrDown) {
				if (e.keyCode != 38 || e.shiftKey || e.ctrlKey || e.altKey || e.metaKey) {
					fireKeyEvent(document.querySelector('body'), 'keydown', 38);
					fireKeyEvent(document.querySelector('body'), 'keyup', 38);
				}
			} else if ("down" == upOrDown) {
				if (e.keyCode != 40 || e.shiftKey || e.ctrlKey || e.altKey || e.metaKey) {
					fireKeyEvent(document.querySelector('body'), 'keydown', 40);
					fireKeyEvent(document.querySelector('body'), 'keyup', 40);
				}
			}
			break;
		case 3:
			e.preventDefault();
			var video = document.querySelector("video");
			var vol = Math.floor(video.volume * 10);
			if ("up" == upOrDown) {
				vol += 1;
				vol = Math.min(10, vol);
			} else if ("down" == upOrDown) {
				vol -= 1;
				vol = Math.max(0, vol);
			}
			video.volume = vol / 10;
			showInfo(video.parentNode, "音量 " + (vol*10), 150);

			if (video.muted) {
				liveMutedToggle(e)
			}
			break;
	}
}

function liveMutedToggle(e) {
	switch (pageType) {
		case 0:
		case 1:
		case 2:
			if (e.keyCode != 77 || e.shiftKey || e.ctrlKey || e.altKey || e.metaKey) {
				fireKeyEvent(document.querySelector('body'), 'keydown', 77);
				fireKeyEvent(document.querySelector('body'), 'keyup', 77);
			}
			break;
		case 3:
			e.preventDefault();
			var video = document.querySelector("video");
			imitataMouseMove(video, 0, 0);
			document.querySelectorAll(LIVE_TOOLS_LEFT)[2].click()
			break;
	}
}

function sliderToggle() {
	if (pageType != 3) {
		return
	}
	document.querySelector("#aside-area-toggle-btn").click();
}

function qualitySelect() {
	if (pageType != 3) {
		return
	}
	var video = document.querySelector("video");
	imitataMouseMove(video, 0, 0);
	var wrapElement = document.querySelector(".quality-wrap")
	imitateMouseClick('mouseenter', wrapElement, 0, 0)
	setTimeout(() => document.querySelectorAll(".quality-wrap > .panel > .list-it")[0].click(), 100)
}

/* 鼠标按键事件模拟 */
function imitateMouseClick(type, oElement, iClientX, iClientY) {
	var oEvent;
	oEvent = document.createEvent("MouseEvents");
	var rect = oElement.getBoundingClientRect();
	oEvent.initMouseEvent(type, true, true, document.defaultView, 0, 0, 0, rect.x + iClientX, rect.y + iClientY, false, false, false, false, 0, null);
	oElement.dispatchEvent(oEvent);
}

/* 鼠标移动事件模拟 */
function imitataMouseMove(oElement, clientX, clientY) {
	var doc = oElement.ownerDocument;
	var	win = doc.defaultView || doc.parentWindow;
	var mousemove = document.createEvent("MouseEvent");
	mousemove.initMouseEvent("mousemove", true, true, win, 0, clientX, clientY, clientX, clientY, 0, 0, 0, 0, 0, null);
	oElement.dispatchEvent(mousemove);
}

/* 键盘事件模拟 */
function fireKeyEvent(el, evtType, keyCode){
	var doc = el.ownerDocument;
	var	win = doc.defaultView || doc.parentWindow;
	var	evtObj;
	if (doc.createEvent){
		if (win.KeyEvent) {
			evtObj = doc.createEvent('KeyEvents');
			evtObj.initKeyEvent( evtType, true, true, win, false, false, false, false, keyCode, 0 );
		} else if (doc.createEventObject) {
			evtObj = doc.createEventObject();
			evtObj.keyCode = keyCode;
			el.fireEvent('on' + evtType, evtObj);
		} else {
			evtObj = doc.createEvent('UIEvents');
			Object.defineProperty(evtObj, 'keyCode', {
		        get : function() { return this.keyCodeVal; }
		    });
		    Object.defineProperty(evtObj, 'which', {
		        get : function() { return this.keyCodeVal; }
		    });
			evtObj.initUIEvent( evtType, true, true, win, 1 );
			evtObj.keyCodeVal = keyCode;
			if (evtObj.keyCode !== keyCode) {
		        console.log("keyCode " + evtObj.keyCode + " 和 (" + evtObj.which + ") 不匹配");
		    }
		}
		el.dispatchEvent(evtObj);
	}
}

/* 元素中间显示提示 */
function showInfo(parent, text, width = 100) {
	var infoBoard = document.createElement("div");
	var style = infoBoard.style;
	infoBoard.setAttribute("id", "_infoBoard");
	infoBoard.innerText = text;
	style.width 		= `${width}px`;
	style.height 		= "45px";
	style.left 			= `calc(50% - ${width / 2}px)`;
	style.top 			= "calc(50% - 50px)";
	style.lineHeight 	= "45px";
	style.background 	= "rgba(0, 0, 0, 0.6)";
	style.color 		= "rgba(255, 255, 255, 0.8)";
	style.position 		= "absolute";
	style.zIndex 		= "12";
	style.fontSize 		= "25px";
	style.textAlign 	= "center";

	var oldOne = parent.querySelector("#_infoBoard");
	if (oldOne != null) {
		parent.removeChild(oldOne);
	}
	var pos = parent.style.position;
	parent.style.position = "relative";
	parent.appendChild(infoBoard);
	setTimeout(function () {
		try {
			parent.removeChild(infoBoard);
		} catch (error) {}
		parent.style.position = pos;
	}, 1500);
}

// function imitataMouseMove(oElement, clientX, clientY) {
// 	var doc = oElement.ownerDocument;
// 	var	win = doc.defaultView || doc.parentWindow;
// 	var mousemove = document.createEvent("MouseEvent");
// 	mousemove.initMouseEvent("mousemove", true, true, win, 0, clientX, clientY, clientX, clientY, 0, 0, 0, 0, 0, null);
// 	oElement.dispatchEvent(mousemove);
// }
// setInterval(() => {
// 	var video = document.querySelector("video");
// imitataMouseMove(video, 0, 0);
// }, 1000);