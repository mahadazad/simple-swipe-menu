(function ($) {
    var DIR_RIGHT = 1;
    var DIR_LEFT = -1;
    $.fn.simpleSwipeMenu = function (options) {
        function _setWrapperCss(elm) {
            $(elm).css({
                overflow: "hidden"
            });
        };

        function _setMenuCss(elm) {
            $(elm).css({
                "margin-left": 0,
                "-webkit-user-select": "none",
                "-moz-user-select": "none",
                "-ms-user-select": "none",
                "-o-user-select": "none",
                "user-select": "none"
            });
        };

        return this.each(function () {
            var op = {
                $wrapper: $(this),
                $el: $(this).find('>ul'),
                mouseDown: false,
                x1: 0,
                y1: 0,
                minX: 0
            },
            settings = $.extend({}, options);

            _setWrapperCss(op.$wrapper);
            _setMenuCss(op.$el);

            // set max x:
            op.maxX = op.$wrapper.outerWidth() - op.$el.outerWidth();

            $(this).mousedown(function (e) {
                op.mouseDown = true;
                op.x1 = e.pageX;
                op.y1 = e.pageY;
                op.initialMarginLeft = parseFloat(op.$el.css('margin-left'));
                op.currentMarginLeft = op.initialMarginLeft;
            });

            $([document, this]).mouseup(function () {
                op.mouseDown = false;
                op.x1 = 0;
                op.y1 = 0;
            });

            $(this).mousemove(function (e) {
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
            });

        });
    };
}(jQuery));
