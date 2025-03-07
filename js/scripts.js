$(document).ready(function () {

    /***************** Waypoints ******************/

    $('.wp1').waypoint(function () {
        $('.wp1').addClass('animated fadeInLeft');
    }, {
        offset: '75%'
    });
    $('.wp2').waypoint(function () {
        $('.wp2').addClass('animated fadeInRight');
    }, {
        offset: '75%'
    });
    $('.wp3').waypoint(function () {
        $('.wp3').addClass('animated fadeInLeft');
    }, {
        offset: '75%'
    });
    $('.wp4').waypoint(function () {
        $('.wp4').addClass('animated fadeInRight');
    }, {
        offset: '75%'
    });
    $('.wp5').waypoint(function () {
        $('.wp5').addClass('animated fadeInLeft');
    }, {
        offset: '75%'
    });
    $('.wp6').waypoint(function () {
        $('.wp6').addClass('animated fadeInRight');
    }, {
        offset: '75%'
    });
    $('.wp7').waypoint(function () {
        $('.wp7').addClass('animated fadeInUp');
    }, {
        offset: '75%'
    });
    $('.wp8').waypoint(function () {
        $('.wp8').addClass('animated fadeInLeft');
    }, {
        offset: '75%'
    });
    $('.wp9').waypoint(function () {
        $('.wp9').addClass('animated fadeInRight');
    }, {
        offset: '75%'
    });

    /***************** Initiate Flexslider ******************/
    $('.flexslider').flexslider({
        animation: "slide"
    });

    /***************** Initiate Fancybox ******************/

    $('.single_image').fancybox({
        padding: 4
    });

    $('.fancybox').fancybox({
        padding: 4,
        width: 1000,
        height: 800
    });

    /***************** Tooltips ******************/
    $('[data-toggle="tooltip"]').tooltip();

    /***************** Nav Transformicon ******************/

    /* When user clicks the Icon */
    $('.nav-toggle').click(function () {
        $(this).toggleClass('active');
        $('.header-nav').toggleClass('open');
        event.preventDefault();
    });
    /* When user clicks a link */
    $('.header-nav li a').click(function () {
        $('.nav-toggle').toggleClass('active');
        $('.header-nav').toggleClass('open');

    });

    /***************** Header BG Scroll ******************/

    // $(function () {
    //     $(window).scroll(function () {
    //         var scroll = $(window).scrollTop();

    //         if (scroll >= 20) {
    //             $('section.navigation').addClass('fixed');
    //             $('header').css({
    //                 "border-bottom": "none",
    //             });
    //         } else {
    //             $('section.navigation').removeClass('fixed');
    //             $('header').css({
    //                 "border-bottom": "solid 1px rgba(255, 255, 255, 0.2)",
    //             });
    //         }
    //     });
    // });
    /***************** Smooth Scrolling ******************/

    $(function () {

        $('a[href*=#]:not([href=#])').click(function () {
            if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {

                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top - 90
                    }, 2000);
                    return false;
                }
            }
        });

    });

    /********************** Embed youtube video *********************/
    $('.player').YTPlayer();



    /********************** RSVP **********************/
    $('#rsvp-form').on('submit', function (e) {
        e.preventDefault();
        var data = $(this).serialize();
        console.log(data)
        var params = new URLSearchParams(data);
        var name = params.get('Nome');
        var participants = params.get('Invitati');
        var bus = params.get('Autobus');
        var hour = params.get('Orario');
    
        if (!name || name.split(' ').filter(Boolean).length < 2) {
            $('#alert-wrapper').html(alert_markup('danger', '<strong>Attenzione!</strong> Assicurati di aver inserito sia Nome che Cognome.'));
            return;
        }
        
        if (!participants || participants < 1 || participants > 10) {
            $('#alert-wrapper').html(alert_markup('danger', '<strong>Attenzione!</strong> Assicurati di aver inserito un numero di invitati corretto.'));
            return;
        }
    
        if (bus && bus.includes('Seleziona')) {
            $('#alert-wrapper').html(alert_markup('danger', "<strong>Attenzione!</strong> Seleziona un'opzione valida per l'autobus."));
            return;
        }
    
        if (bus.includes('Ritorno') && hour.includes('Seleziona')) {
            $('#alert-wrapper').html(alert_markup('danger', "<strong>Attenzione!</strong> Seleziona un orario di rientro valido per l'autobus."));
            return;
        }    
    
        $('#alert-wrapper').html(alert_markup('info', '<strong>Solo un attimo!</strong> Stiamo salvando le informazioni.'));

        $.post('https://script.google.com/macros/s/AKfycbxjVq1h-vx6gf_U7L7U8GF6AfQDKA4egHT3bmgg9Q-5NfBQK1na6hL-PT9GnyR2HrEqLg/exec', data)
            .done(function (data) {
                console.log(data);
                if (data.result === "error") {
                    $('#alert-wrapper').html(alert_markup('danger', data.message));
                } else {
                    $('#alert-wrapper').html('');
                    $('#rsvp-modal').modal('show');
                }
            })
            .fail(function (data) {
                console.log(data);
                $('#alert-wrapper').html(alert_markup('danger', '<strong>Ops!</strong> Si è verificato un errore. Contatta gli sposi!'));
            });
    });


    $('#close-rsvp-alert').click(function () {
        window.location.href = '/index.html';
    });

});

/********************** Extras **********************/

// alert_markup
function alert_markup(alert_type, msg) {
    return '<div class="alert alert-' + alert_type + '" role="alert">' + msg + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span>&times;</span></button></div>';
}
