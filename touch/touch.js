/**
 * Touch events.
 */
var touch = {
	canvas: undefined,
	roomWidth: 1,
	roomHeight: 1,
	loop: -1
};
var touches = [];
var touch_log = {};

/**
 * Start Touch API.
 * @param {number} roomwidth Room width.
 * @param {number} roomheight Room Height.
 */
function touchInvoke(roomwidth,roomheight) {
    if (typeof touch.canvas === "undefined") {
        touch.canvas = document.getElementById('canvas');
        touch.canvas.addEventListener('touchstart', function(touchEvent) {
            var rect = touch.canvas.getBoundingClientRect();

            for (var touchIndex = 0; touchIndex < touchEvent.changedTouches.length; touchIndex++) {
                var touchObj = touchEvent.changedTouches[touchIndex];

                touches.push({
                    id: touchObj.identifier,
                    start: false,
                    left: rect.left,
                    top: rect.top,
                    right: rect.right,
                    bottom: rect.bottom,
                    x: touchObj.clientX,
                    y: touchObj.clientY,
                    end: false,
                    clean: false,
                });
            }

            touchEvent.preventDefault();
        }, false);
        touch.canvas.addEventListener('touchmove', function(touchEvent) {
            var rect = touch.canvas.getBoundingClientRect();

            for (var touchIndex = 0; touchIndex < touchEvent.changedTouches.length; touchIndex++) {
                var touchObj = touchEvent.changedTouches[touchIndex];

                for (var activeTouchObjectIndex = 0; activeTouchObjectIndex < touches.length; activeTouchObjectIndex++) {
                    if (touches[activeTouchObjectIndex].id === touchObj.identifier) {
                        touches[activeTouchObjectIndex].left = rect.left;
                        touches[activeTouchObjectIndex].top = rect.top;
                        touches[activeTouchObjectIndex].right = rect.right;
                        touches[activeTouchObjectIndex].bottom = rect.bottom;
                        touches[activeTouchObjectIndex].x = touchObj.clientX;
                        touches[activeTouchObjectIndex].y = touchObj.clientY;
                        activeTouchObjectIndex = touches.length;
                    }
                }
            }

            touchEvent.preventDefault();
        }, false);
        touch.canvas.addEventListener('touchend', function(touchEvent) {
            for (var touchIndex = 0; touchIndex < touchEvent.changedTouches.length; touchIndex++) {
                var touchObj = touchEvent.changedTouches[touchIndex];

                for (var activeTouchObjectIndex = 0; activeTouchObjectIndex < touches.length; activeTouchObjectIndex++) {
                    if (touches[activeTouchObjectIndex].id === touchObj.identifier) {
                        touches[activeTouchObjectIndex].end = true;
                        break;
                    }
                }
            }

            touchEvent.preventDefault();
        }, false);
    }
	touch.roomWidth = Math.floor(roomwidth);
	touch.roomHeight = Math.floor(roomheight);
}

/**
 * Retreive a touch event.
 */
function touchStart() {
	var touchId = -1;

	for (var touchIndex = 0; touchIndex < touches.length; touchIndex++) {
		if (touches[touchIndex].start === false) {
			touches[touchIndex].start = true;
			touchId = touchIndex;
			break;
		}
	}

	return touchId;
}

/**
 * Retreive a continuous touch event.
 */
function touchMove() {
    if (touches.length > 0) {
        if (touch.loop < touches.length - 1)
            touch.loop++;
        else
            touch.loop = -1;
    } else
		touch.loop = -1;

	return touch.loop;
}

/**
 * Retreive a touch end event.
 */
function touchEnd() {
	var touchId = -1;

	for (var touchIndex = 0; touchIndex < touches.length; touchIndex++) {
        var touchObj = touches[touchIndex];

		if (touchObj.end === true && touchObj.clean === false) {
            touchObj.clean = true;
			touchId = touchIndex;
			break;
		}
	}

	return touchId;
}

/**
 * Retreive X-coordinate of a touch.
 * @param {number} touchId ID of a touch.
 * @returns {number} X-coordinate of a touch.
 */
function touchX(touchId) {
    var touchObj = touches[touchId];
    var touchResult = -1;

	if (typeof touchObj !== 'object')
        touchObj = null;

    if (touchObj !== null)
        touchResult = Math.floor((touchObj.x - touchObj.left) / (touchObj.right - touchObj.left) * touch.roomWidth);

    return touchResult;
}

/**
 * Retreive Y-coordinate of a touch.
 * @param {number} touchId ID of a touch.
 * @returns {number} Y-coordinate of a touch.
 */
function touchY(touchId) {
	var touchObj = touches[touchId];
    var touchResult = -1;

	if (typeof touchObj !== 'object')
        touchObj = null;

    if (touchObj !== null)
        touchResult = Math.floor((touchObj.y - touchObj.top) / (touchObj.bottom - touchObj.top) * touch.roomHeight);

    return touchResult;
}

/**
 * Cleanup touch API.
 */
function touchClean() {
    for (var touchIndex = 0; touchIndex < touches.length; touchIndex++) {
        var touchObj = touches[touchIndex];

		if (touchObj.clean === true) {
            touches.splice(touchIndex,1);
            touchIndex--;
        }
    }
}
