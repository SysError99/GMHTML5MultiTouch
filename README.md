# GMHTML5MultiTouch

Multi-Touch extension for GameMaker:Studio

Only tested on GM:S 1.4, someone please test it on GameMaker: Studio 2!

---
# How to use

Import `MultiTouchHTML5.gmez` to your project, then add a new script in `Step` event, or `Draw` event of an object:

Then, put this code:
```javascript
touch_invoke(room_width,room_height); //start touch instance with defined screen resolution.

var touchStartId;
do{
    // When Touch begins, like mouse_check_button_pressed()
    touchStartId = touch_start();  //get ID of each touch
    if(touchStartId > -1){ //if touch exists
        // Usage Example
        draw_sprite(test_sprite, 1, touch_x(touchEndId), touch_y(touchEndId));
        draw_set_font(font_default);
        draw_text_ext(touch_x(touchEndId),touch_y(touchEndId),string(touchEndId),60, 200)
    }
}until(touchStartId < 0);

var touchEndId;
do{
    // When Touch ends, like mouse_check_button_released()
    touchEndId = touch_end(); //get ID of each touch
    if(touchEndId > -1){
        // Usage Example
        draw_sprite(test_sprit
        draw_sprite(test_sprite, 2, touch_x(touchEndId), touch_y(touchEndId));
        draw_set_font(font_default);
        draw_text_ext(touch_x(touchEndId), touch_y(touchEndId), string(touchEndId),60, 200)
    }
}until(touchEndId < 0);

var touchMoveId;
do{
    // When Touch continuously happens (holding), like mouse_check_button()
    touchMoveId = touch_move(); //get ID of each touch
    if(touchMoveId > -1){
        // Usage Example
        draw_sprite(test_sprite,0,touch_x(touchMoveId),touch_y(touchMoveId));
        draw_set_font(font_default);
        draw_text_ext(touch_x(touchMoveId), touch_y(touchMoveId), string(touchMoveId),60, 200)
    }
}until(touchMoveId < 0);

touch_clean(); //end touch instance.
```

---
# Limitations

This extenstion only works with one instance. So if you want to use it in multiple instances, I'd recommend using `with` statement to call each instances you want instead:

```javascript
touch_invoke(room_width,room_height); //start touch instance with defined screen resolution.

var touchStartId;
do{
    touchStartId = touch_start();
    if(touchStartId > -1){
        // Set global values for instances.
        global.touch_id = touchStartId;
        global.touch_x = touch_x(touchStartId);
        global.touch_y = touch_y(touchStartId);
        // Call instances
        with(obj_joystick){
            event_perform("ev_mouse","ev_left_press");
            // then use global variables
        }
    }
}until(touchStartId < 0);

var touchEndId;
do{
    touchEndId = touch_end();
    if(touchEndId > -1){
        // Set global values for instances.
        global.touch_id = touchStartId;
        global.touch_x = touch_x(touchStartId);
        global.touch_y = touch_y(touchStartId);
        // Call instances
        with(obj_joystick){
            event_perform("ev_mouse","ev_left_release");
        }
    }
}until(touchEndId < 0);

var touchMoveId;
do{
    touchMoveId = touch_move();
    if(touchMoveId > -1){
        // Set global values for instances.
        global.touch_id = touchStartId;
        global.touch_x = touch_x(touchStartId);
        global.touch_y = touch_y(touchStartId);
        // Call instances
        with(obj_joystick){
            event_perform("ev_mouse","ev_left_button);
        }
    }
}until(touchMoveId < 0);

touch_clean(); //end touch instance.
```
