jQuery(document).ready(function($) {

    $(window).on('load', function() {
        setTimeout(AOS.refreshHard, 150);
    });
    
    AOS.init({
        disable: 'phone',
        duration: 1000,
        easing: 'ease-in-sine',
        once: true,
        anchor: 'top-top',
        startEvent: 'load',
    });

    $(window).on('load', function() {
        AOS.refresh();
    });

    function vsvgInitElement(el) {
        var $el = $(el);
        return new Vivus(el, {
            duration: 100
        });
    }

    $(window).on('load',function() {
        $('.animate-svg').each(function(i, el) {
            vsvgInitElement(el);
        })
    })

    $(window).on('load', function() {
        $("body").animate({
            opacity: 1
        }, 1000);
    });

});