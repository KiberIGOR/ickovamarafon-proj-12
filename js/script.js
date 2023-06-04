$(function () {
    /* Inits */
    initLazy();
    initMenu()

    /* Lazy */
    function initLazy() {

        let
            lazyArr = [].slice.call(document.querySelectorAll('.lazy')),
            active = false,
            threshold = 200
            ;

        const lazyLoad = function (e) {
            if (active === false) {
                active = true;

                setTimeout(function () {
                    lazyArr.forEach(function (lazyObj) {
                        if ((lazyObj.getBoundingClientRect().top <= window.innerHeight + threshold && lazyObj.getBoundingClientRect().bottom >= -threshold) && getComputedStyle(lazyObj).display !== 'none') {

                            if (lazyObj.dataset.src) {
                                let
                                    img = new Image(),
                                    src = lazyObj.dataset.src
                                    ;
                                img.src = src;
                                img.onload = function () {
                                    if (!!lazyObj.parent) {
                                        lazyObj.parent.replaceChild(img, lazyObj);
                                    } else {
                                        lazyObj.src = src;
                                    }
                                }
                                lazyObj.removeAttribute('data-src');
                            }

                            if (lazyObj.dataset.srcset) {
                                lazyObj.srcset = lazyObj.dataset.srcset;
                                lazyObj.removeAttribute('data-srcset');
                            }

                            lazyObj.classList.remove('lazy');
                            lazyObj.classList.add('lazy-loaded');

                            lazyArr = lazyArr.filter(function (obj) {
                                return obj !== lazyObj;
                            });

                            if (lazyArr.length === 0) {
                                document.removeEventListener('scroll', lazyLoad);
                                window.removeEventListener('resize', lazyLoad);
                                window.removeEventListener('orientationchange', lazyLoad);
                            }
                        }
                    });

                    active = false;
                }, 200);
            }
        };

        lazyLoad();

        document.addEventListener('scroll', lazyLoad);
        window.addEventListener('resize', lazyLoad);
        window.addEventListener('orientationchange', lazyLoad);
    }
    /*burger*/
    function initMenu() {
        $('.header__menu').on('click', function () {
            $('.header__nav').toggleClass('active')

        });
        $('.header__nav-link').on('click', function () {
            $('.ham, .header__nav').removeClass('active');
        });
    }
    /*menu fixed*/
    function initScrollHeader() {
        const header = $('.header');
        const scroll = $(window).scrollTop();
        if (scroll >= 40) {
            header.addClass('fixed');

        } else {
            header.removeClass('fixed');
        }
    }
    $(window).scroll(() => initScrollHeader())
    /*Marquee skroling bar*/
    $('.play-btn').on('click', function (e) {
        e.preventDefault();
        $(this).hide();
        $('#background-video').find('iframe').show();
        $('#background-video').find('iframe')[0].src += "?autoplay=1";
    });

    /*Слайдеры*/
    let $advantage_slider = $('.advantage__bloks'),
        settingsAdvantage = {
            mobileFirst: true,
            dots: false,
            arrows: false,
            infinite: false,
            centerMode: true,
            slidesToShow: 1.545,
            slidesToScroll: 1,
            rows: 2,
            centerPadding: '10px',
            responsive: [
                {
                    breakpoint: 767,
                    settings: "unslick"
                }
            ]

        }


    $advantage_slider.slick(settingsAdvantage);

    $(window).on('resize', function () {
        if (!$advantage_slider.hasClass('slick-initialized')) {
            return $advantage_slider.slick(settingsAdvantage);
        }
    });

    let $price_slider = $('.price__blocks'),
        settingsPrice = {
            mobileFirst: true,
            dots: false,
            arrows: false,
            infinite: false,
            centerMode: false,
            slidesToShow: 1.125,
            slidesToScroll: 1,
            centerPadding: '10px',
            responsive: [
                {
                    breakpoint: 767,
                    settings: "unslick"
                }
            ]

        }


    $price_slider.slick(settingsPrice);

    $(window).on('resize', function () {
        if (!$price_slider.hasClass('slick-initialized')) {
            return $price_slider.slick(settingsPrice);
        }
    });

    let $price2_slider = $('.price__table'),
        settingsPrice2 = {
            mobileFirst: true,
            dots: false,
            arrows: false,
            infinite: false,
            centerMode: false,
            slidesToShow: 1.5,
            slidesToScroll: 1,
            centerPadding: '10px',
            responsive: [
                {
                    breakpoint: 767,
                    settings: "unslick"
                }
            ]

        }


    $price2_slider.slick(settingsPrice2);

    $(window).on('resize', function () {
        if (!$price2_slider.hasClass('slick-initialized')) {
            return $price2_slider.slick(settingsPrice2);
        }
    });



    // let $partners_slider = $('.partners__blocks'),
    //     settingsPartners = {
    //         dots: false,
    //         arrows: false,
    //         infinite: false,
    //         centerMode: false,
    //         slidesToShow: 4,
    //         slidesToScroll: 1,

    //         centerPadding: '5px',
    //         responsive: [
    //             {
    //                 breakpoint: 1199,
    //                 settings: {
    //                     slidesToShow: 5,
    //                     slidesToScroll: 5

    //                 }
    //             },
    //             {
    //                 breakpoint: 1080,
    //                 settings: {
    //                     slidesToShow: 4,
    //                     slidesToScroll: 4

    //                 }
    //             },
    //             {
    //                 breakpoint: 900,
    //                 settings: {
    //                     slidesToShow: 4,
    //                     slidesToScroll: 4

    //                 }
    //             },
    //             {
    //                 breakpoint: 650,
    //                 settings: {
    //                     slidesToShow: 3,
    //                     slidesToScroll: 3

    //                 }
    //             },
    //             {
    //                 breakpoint: 575,
    //                 settings: {
    //                     centerMode: false,
    //                     slidesToShow: 1.5,
    //                     slidesToScroll: 1
    //                 }
    //             }
    //         ]

    //     }


    // $partners_slider.slick(settingsPartners);

    // $(window).on('resize', function () {
    //     if (!$partners_slider.hasClass('slick-initialized')) {
    //         return $partners_slider.slick(settingsPartners);
    //     }
    // });

    /*Спикеры убирание data-more-hidden*/
    $('[data-more-button]').on('init.more click', function (event) {
        var
            $container = $('[data-more-options]', $(this).parent()),
            options = {},
            visible = 0,
            window_width = $(window).width(),
            $items
            ;

        options = $container.data('more-options');

        if (event.type == 'init') {
            visible = window_width > 767 ? options.init_desktop : options.init_mobile;

            /*if ( window_width > 767 && window_width < 1200 && visible % 2 == 0 ) {
            visible--;
            }*/
        }
        else {
            visible = window_width > 767 ? options.show_desktop : options.show_mobile;
        }

        $items = $(options.target + '[data-more-hidden]', $container);
        $items.slice(0, visible).removeAttr('data-more-hidden');

        $('html, body')
            .animate({ scrollTop: '+=1' }, 0)
            .animate({ scrollTop: '-=1' }, 0)
            ;

        if ($items.length - visible <= 0) {
            $(this).addClass('d-none');
        }

    })
        .trigger('init.more');

    /*univer добавление блоков*/
    $(".univer__btn-more").click(function () {
        let textBlock = $(".univer__blocks")
        textBlock.toggleClass("active");

        if (textBlock.hasClass("active")) {
            $(this).text("Скрыть")
        } else {
            $(this).text("Показать еще")
        }
    })

});