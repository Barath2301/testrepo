var angleStart = -360;

// jquery rotate animation
function rotate(li,d) {
    $({d:angleStart}).animate({d:d}, {
        step: function(now) {
            $(li)
               .css({ transform: 'rotate('+now+'deg)' })
               .find('label')
                  .css({ transform: 'rotate('+(-now)+'deg)' });
        }, duration: 0
    });
}

// show / hide the options
function toggleOptions(s) {
    $(s).toggleClass('open');
    var li = $(s).find('li');
    var deg = $(s).hasClass('half') ? 90/(li.length-1) : 180/li.length;
    for(var i=0; i<li.length; i++) {
        var d = $(s).hasClass('half') ? (i*deg)-90 : i*deg;
        $(s).hasClass('open') ? rotate(li[i],d) : rotate(li[i],angleStart);
    }
}

$('.selector button').click(function(e) {
    toggleOptions($(this).parent());
});

setTimeout(function() { toggleOptions('.selector'); }, 100);



  // ----- On render -----
  $(document).ready(function() {
    // var mode = "home";
  
    // Event delegation for main container click
    
  
    // ----- On render -----
    makeRadial({
        el: $("#radial"),
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
  
  