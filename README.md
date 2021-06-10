# GMHTML5MultiTouch

Multi-Touch extension for GameMaker:Studio

Only tested on GM:S 1.4, someone please test it on GameMaker: Studio 2!

---
# How to use

Compress whole project as `7-Zip` archive, then rename its file extension to `.gmez`.

Then, import the file to your project, then add a new script in `Step` event, or `Draw` event of an object:

Then, put this code:
```javascript
touch_invoke(room_width,room_height); //start touch instance with defined screen resolution.

var touch_start_id;
var touch_end_id;
var touch_move_id;

do {
    // When Touch begins, like mouse_check_button_pressed()
    touch_start_id = touch_start();  //get ID of each touch

    if(touch_start_id > -1){ //if touch exists
        // Usage Example
        draw_sprite(spr_test, 1, touch_x(touch_start_id), touch_y(touch_start_id));
        draw_set_font(font_default);
        draw_text_ext(touch_x(touch_start_id),touch_y(touch_start_id),string(touch_start_id), 60, 200);
    }
} until (touch_start_id < 0);


do {
    // When Touch ends, like mouse_check_button_released()
    touch_end_id = touch_end(); //get ID of each touch

    if(touch_end_id > -1){
        // Usage Example
        draw_sprite(spr_test, 2, touch_x(touch_end_id), touch_y(touch_end_id));
        draw_set_font(font_default);
        draw_text_ext(touch_x(touch_end_id), touch_y(touch_end_id), string(touch_end_id), 60, 200);
    }
} until (touch_end_id < 0);

do {
    // When Touch continuously happens (holding), like mouse_check_button()
    touch_move_id = touch_move(); //get ID of each touch

    if(touch_move_id > -1){
        // Usage Example
        draw_sprite(spr_test,0,touch_x(touch_move_id),touch_y(touch_move_id));
        draw_set_font(font_default);
        draw_text_ext(touch_x(touch_move_id), touch_y(touch_move_id), string(touch_move_id), 60, 200);
    }
} until (touch_move_id < 0);

touch_clean(); //end touch instance.

```

---
# Limitations

This extenstion only works with one instance. So if you want to use it in multiple instances, I'd recommend using `with` statement to call each instances you want instead:

```javascript
touch_invoke(room_width,room_height); //start touch instance with defined screen resolution.

var touch_start_id;
var touch_end_id;
var touch_move_id;

do {
    touch_start_id = touch_start();
    if(touch_start_id > -1){
        // Set global values for instances.
        global.touch_id = touch_start_id;
        global.touch_x = touch_x(touch_start_id);
        global.touch_y = touch_y(touch_start_id);
        // Call instances
        with(obj_joystick){
            event_perform("ev_mouse","ev_left_press");
            // then use global variables
        }
    }
} until (touch_start_id < 0);

do {
    touch_end_id = touch_end();
    if(touch_end_id > -1){
        // Set global values for instances.
        global.touch_id = touch_start_id;
        global.touch_x = touch_x(touch_start_id);
        global.touch_y = touch_y(touch_start_id);
        // Call instances
        with(obj_joystick){
            event_perform("ev_mouse","ev_left_release");
        }
    }
} until (touch_end_id < 0);

do {
    touch_move_id = touch_move();
    if(touch_move_id > -1){
        // Set global values for instances.
        global.touch_id = touch_start_id;
        global.touch_x = touch_x(touch_start_id);
        global.touch_y = touch_y(touch_start_id);
        // Call instances
        with(obj_joystick){
            event_perform("ev_mouse","ev_left_button);
        }
    }
} until (touch_move_id < 0);

touch_clean(); //end touch instance.
```
