/*!
 * Simple Swipe Menu v1.0.0
 * https://github.com/mahadazad/simple-swipe-menu
 *
 * Copyright 2014 Muhammad Mahad Azad
 * Email: mahadazad@gmail.com
 * CodeCanyon: http://codecanyon.net/user/mahadazad/portfolio
 *
 * Released under the MIT license
 */


(function($) {
    var DIR_RIGHT = 1;
    var DIR_LEFT = -1;
    $.fn.simpleSwipeMenu = function(options) {

        function _isTouchDevice() {
            return ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;
        }

        function _setWrapperCss(elm, op) {
            $(elm).css({
                overflow: "hidden",
                width: op.settings.menuWidth + 'px'
            });
        }

        function _preventDefault(e) {
            e = e || window.event;
            if (e.preventDefault)
                e.preventDefault();
            e.returnValue = false;
        }


        function _setMenuCss(elm, op) {
            $(elm).find('li').css({
                "margin-left": 0,
                "-webkit-user-select": "none",
                "-moz-user-select": "none",
                "-ms-user-select": "none",
                "-o-user-select": "none",
                "user-select": "none",
                width: op.settings.itemWidth + 'px'
            });

            $(elm).css({
                width: (elm.children().length * $(elm).find('li:eq(0)').outerWidth()) + 'px'
            });
        }



        return this.each(function() {
            var op = {
                $wrapper: $(this),
                $el: $(this).find('>ul'),
                mouseDown: false,
                x1: 0,
                y1: 0,
                minX: 0
            },
            settings = $.extend({
                menuWidth: 200,
                itemWidth: 100
            }, options);

            op.settings = settings;

            _setWrapperCss(op.$wrapper, op);
            _setMenuCss(op.$el, op);

            // set max x:
            op.maxX = op.$wrapper.outerWidth() - op.$el.outerWidth();

            function onMouseDown(e) {
                e = _isTouchDevice() ? e.touches[0] : e;
                op.mouseDown = true;
                op.x1 = e.pageX;
                op.y1 = e.pageY;
                op.initialMarginLeft = parseFloat(op.$el.css('margin-left'));
                op.currentMarginLeft = op.initialMarginLeft;
            }

            function onMouseMove(e) {
                _preventDefault(e);
                e = _isTouchDevice() ? e.touches[0] : e;
                if (op.mouseDown) {
                    var x2 = e.pageX;
                    var y2 = e.pageY;
                    var offset = op.x1 - x2;
                    op.dir = offset < 0 ? DIR_RIGHT : DIR_LEFT;
                    op.currentMarginLeft = parseFloat(op.$el.css('margin-left'));

                    if (op.dir == DIR_RIGHT && op.currentMarginLeft >= op.minX) {
                        op.$el.css('margin-left', op.minX);
                        return;
                    } else if (op.dir == DIR_LEFT && op.currentMarginLeft <= op.maxX) {
                        op.$el.css('margin-left', op.maxX);
                        return;
                    }

                    op.$el.css('margin-left', (op.initialMarginLeft - offset));
                    $('body').css('cursor', 'all-scroll');
                }
                else {
                    $('body').css('cursor', 'default');
                }

            }

            function onMouseUp(e) {
                e = _isTouchDevice() ? e.touches[0] : e;
                op.mouseDown = false;
                op.x1 = 0;
                op.y1 = 0;
            }

            $(this).on('mousedown', onMouseDown);
            this.addEventListener('touchstart', onMouseDown, false);
            $([document, this]).on('mouseup', onMouseUp);
            this.addEventListener('touchend', onMouseUp, false);
            document.addEventListener('touchend', onMouseUp, false);
            $(this).on('mousemove', onMouseMove);
            this.addEventListener('touchmove', onMouseMove, false);

        });
    };
}(jQuery));
