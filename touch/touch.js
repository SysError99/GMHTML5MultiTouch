/**
 * Touch events.
 */
const touch = {
	canvas: null,
	roomWidth: 1,
	roomHeight: 1,
	loop: -1
}
const touches = []
const touch_log = {}
/**
 * Start Touch API.
 * @param {number} roomwidth Room width.
 * @param {number} roomheight Room Height.
 */
function touchInvoke(roomwidth,roomheight) {
    if(touch.canvas === null){
        touch.canvas = document.getElementById('canvas')
        touch.canvas.addEventListener('touchstart', function(touchEvent){
            let rect = touch.canvas.getBoundingClientRect()
            for(let touchIndex = 0; touchIndex < touchEvent.changedTouches.length; touchIndex++){
                let touchObj = touchEvent.changedTouches[touchIndex]
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
                })
            }
            touchEvent.preventDefault()
        }, false)
        touch.canvas.addEventListener('touchmove', function(touchEvent){
            let rect = touch.canvas.getBoundingClientRect()
            for(let touchIndex = 0; touchIndex < touchEvent.changedTouches.length; touchIndex++){
                let touchObj = touchEvent.changedTouches[touchIndex]
                for(let activeTouchObjectIndex = 0; activeTouchObjectIndex < touches.length; activeTouchObjectIndex++){
                    if(touches[activeTouchObjectIndex].id === touchObj.identifier){
                        touches[activeTouchObjectIndex].left = rect.left
                        touches[activeTouchObjectIndex].top = rect.top
                        touches[activeTouchObjectIndex].right = rect.right
                        touches[activeTouchObjectIndex].bottom = rect.bottom
                        touches[activeTouchObjectIndex].x = touchObj.clientX
                        touches[activeTouchObjectIndex].y = touchObj.clientY
                        activeTouchObjectIndex = touches.length
                    }
                }
            }
            touchEvent.preventDefault()
        }, false)
        touch.canvas.addEventListener('touchend', function(touchEvent){
            for(let touchIndex = 0; touchIndex < touchEvent.changedTouches.length; touchIndex++){
                let touchObj = touchEvent.changedTouches[touchIndex]
                for(let activeTouchObjectIndex = 0; activeTouchObjectIndex < touches.length; activeTouchObjectIndex++){
                    if(touches[activeTouchObjectIndex].id === touchObj.identifier){
                        touches[activeTouchObjectIndex].end = true
                        break
                    }
                }
            }
            touchEvent.preventDefault()
        }, false)
    }
	touch.roomWidth = floor(roomwidth)
	touch.roomHeight = floor(roomheight)
}
/**
 * Retreive a touch event.
 */
function touchStart(){
	let touchId = -1
	for(let touchIndex = 0; touchIndex < touches.length; touchIndex++){
		if(touches[touchIndex].start === false){
			touches[touchIndex].start = true
			touchId = touchIndex
			break
		}
	}
	return touchId
}
/**
 * Retreive a continuous touch event.
 */
function touchMove(){
    if(touches.length > 0){
        if(touch.loop < touches.length - 1)
            touch.loop++
        else
            touch.loop = -1
    }
	else
		touch.loop = -1
	return touch.loop
}
/**
 * Retreive a touch end event.
 */
function touchEnd(){
	var touchId = -1
	for(let touchIndex = 0; touchIndex < touches.length; touchIndex++){
        let touchObj = touches[touchIndex]
		if(touchObj.end === true && touchObj.clean === false){
            touchObj.clean = true
			touchId = touchIndex
			break
		}
	}
	return touchId
}
/**
 * Retreive X-coordinate of a touch.
 * @param {number} touchId ID of a touch.
 * @returns {number} X-coordinate of a touch.
 */
function touchX(touchId){
    let touchObj = touches[touchId]
    let touchResult = -1
	if(typeof touchObj !== 'object')
        touchObj = null
    if(touchObj !== null)
        touchResult = floor((touchObj.x - touchObj.left) / (touchObj.right - touchObj.left) * touch.roomWidth)
    return touchResult
}
/**
 * Retreive Y-coordinate of a touch.
 * @param {number} touchId ID of a touch.
 * @returns {number} Y-coordinate of a touch.
 */
function touchY(touchId){
	let touchObj = touches[touchId]
    let touchResult = -1
	if(typeof touchObj !== 'object')
        touchObj = null
    if(touchObj !== null)
        touchResult = floor((touchObj.y - touchObj.top) / (touchObj.bottom - touchObj.top) * touch.roomHeight)
    return touchResult
}
/**
 * Cleanup touch API.
 */
function touchClean(){
    for(let touchIndex = 0; touchIndex < touches.length; touchIndex++){
        let touchObj = touches[touchIndex]
		if(touchObj.clean === true){
            touches.splice(touchIndex,1)
            touchIndex--
        }
    }
}