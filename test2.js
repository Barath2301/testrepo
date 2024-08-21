var angleStart = -360;
  // ----- On render -----
  $(document).ready(function() {
    // var mode = "home";
  
    // Event delegation for main container click
    
  
    // ----- On render -----
    makeRadial({
        el: $(".selector"),
        // el: $(".selector"),
        radials: 100
    });
  
    function makeRadial(options) {
        if (options && options.el) {
            var el = options.el;
            var radials = 60;
            if (options.radials) {
                radials = options.radials;
            }
            var degrees = 360 / radials;
            var i = 0;
            for (i = 0; i < radials / 2; i++) {
                var newTick = $('<div class="tick"></div>')
                    .css({
                        "-moz-transform": "rotate(" + i * degrees + "deg)"
                    })
                    .css({
                        "-webkit-transform": "rotate(" + i * degrees + "deg)"
                    })
                    .css({
                        transform: "rotate(" + i * degrees + "deg)"
                    });
                el.prepend(newTick);
            }
        }
    }
  });
  
  