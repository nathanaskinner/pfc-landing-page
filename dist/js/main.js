jQuery(document).ready(function ($) {

    $(window).on('load', function () {
        setTimeout(AOS.refreshHard, 150);
    });

    $(window).on('load', function () {
        AOS.refresh();
    });

    $(window).on('load', function () {
        $('.animate-svg').each(function (i, el) {
            vsvgInitElement(el);
        })
    })

    AOS.init({
        disable: 'phone',
        duration: 1000,
        easing: 'ease-in-sine',
        once: true,
        anchor: 'top-top',
        startEvent: 'load',
    });



    function vsvgInitElement(el) {
        var $el = $(el);
        return new Vivus(el, {
            duration: 100
        });
    }
});