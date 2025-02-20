import '../css/animate.min.css'
import '../css/alpdeskanimationeffects.css'

$(document).ready(function () {

    (function () {

        if (!('requestAnimationFrame' in window)) {
            return;
        }

        $.fn.isInAnimationViewport = function (offsetPercent = 0) {

            let elementTop = $(this).offset().top;

            if (offsetPercent !== 0 && elementTop !== 0) {
                const hPercent = ($(window).height() / 100) * offsetPercent;
                elementTop = elementTop + hPercent;
            }

            const elementBottom = elementTop + $(this).outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();

            return elementBottom > viewportTop && elementTop < viewportBottom;

        };

        $.fn.getAnimationXOffset = function (position = 'left') {

            let o = 0;

            if (position === 'right') {
                o = ($(this).parent().width() - $(this).outerWidth());
            } else if (position === 'center') {
                o = (($(this).parent().width() / 2) - ($(this).outerWidth() / 2));
            }

            return o;

        };

        $.fn.getAnimationYOffset = function (position = 'top') {

            let o = 0;

            if (position === 'bottom') {
                o = ($(this).parent().height() - $(this).outerHeight());
            } else if (position === 'center') {
                o = (($(this).parent().height() / 2) - ($(this).outerHeight() / 2));
            }

            return o;

        };

        let animationElements = [];
        let visibleAnimationElements = [];
        let processAnimationsScheduled;

        const POSITION_S1 = 's1';
        const POSITION_S2 = 's2';
        const POSITION_S3 = 's3';
        const POSITION_S4 = 's4';
        const POSITION_S5 = 's5';
        const POSITION_S6 = 's6';
        const POSITION_S7 = 's7';
        const POSITION_S8 = 's8';
        const POSITION_S9 = 's9';

        const EFFECT_E1 = 'e1';
        const EFFECT_E2 = 'e2';
        const EFFECT_E3 = 'e3';
        const EFFECT_E4 = 'e4';
        const EFFECT_E5 = 'e5';
        const EFFECT_E6 = 'e6';
        const EFFECT_E7 = 'e7';
        const EFFECT_E8 = 'e8';
        const EFFECT_E9 = 'e9';

        const EFFECT_SPEED_SLOW = 'slow';
        const EFFECT_SPEED_SLOW_VALUE = 4000;
        const EFFECT_SPEED_MIDDLE = 'middle';
        const EFFECT_SPEED_MIDDLE_VALUE = 2500;
        const EFFECT_SPEED_FAST = 'fast';
        const EFFECT_SPEED_FAST_VALUE = 1000;

        const TYPE_ARTICLE = 1;
        const TYPE_CEELEMENT = 2;

        function getSpeed(speed) {

            let s = EFFECT_SPEED_MIDDLE_VALUE;
            switch (speed) {
                case EFFECT_SPEED_SLOW: {
                    s = EFFECT_SPEED_SLOW_VALUE;
                    break;
                }
                case EFFECT_SPEED_MIDDLE: {
                    s = EFFECT_SPEED_MIDDLE_VALUE;
                    break;
                }
                case EFFECT_SPEED_FAST: {
                    s = EFFECT_SPEED_FAST_VALUE;
                    break;
                }
                default:
                    break;
            }

            return s;

        }

        function processAnimation() {

            for (let i = 0; i < animationElements.length; i++) {

                const parent = animationElements[i].node.parentNode;

                if ($(parent).isInAnimationViewport(animationElements[i].viewport) && !checkVisibleExists(animationElements[i].node)) {

                    visibleAnimationElements.push({
                        node: animationElements[i].node,
                        effect: animationElements[i].effect,
                        startposition: animationElements[i].startposition,
                        speed: animationElements[i].speed,
                        viewport: animationElements[i].viewport,
                        animateCssOptions: animationElements[i].animateCssOptions,
                        type: animationElements[i].type,
                        triggered: false
                    });

                }

            }

            cancelAnimationFrame(processAnimationsScheduled);
            if (animationElements.length) {
                processAnimationsScheduled = requestAnimationFrame(updateVisibleElements);
            }

        }

        function checkVisibleExists(element) {

            for (let i = 0; i < visibleAnimationElements.length; i++) {

                if (visibleAnimationElements[i].node === element) {
                    return true;
                }

            }

            return false;

        }

        function updateVisibleElements() {

            for (let i = 0; i < visibleAnimationElements.length; i++) {
                runEffect(visibleAnimationElements[i]);
            }

        }

        function runEffect(element) {

            if (element.triggered === false) {

                const speed = getSpeed(element.speed);

                $(element.node).show();
                if (element.type === TYPE_CEELEMENT) {
                    $(element.node).css({
                        opacity: 1
                    });
                }

                if (element.animateCssOptions !== '') {
                    $(element.node).css({
                        animationDuration: speed + 'ms'
                    });
                    $(element.node).addClass('animate__animated');
                    $(element.node).addClass('animate__' + element.animateCssOptions);
                }

                switch (element.effect) {
                    case EFFECT_E1: {
                        $(element.node).stop().animate({
                            top: $(element.node).getAnimationYOffset('top') + 'px',
                            left: $(element.node).getAnimationXOffset('left') + 'px'
                        }, speed);
                        break;
                    }
                    case EFFECT_E2: {
                        $(element.node).stop().animate({
                            top: $(element.node).getAnimationYOffset('top') + 'px',
                            left: $(element.node).getAnimationXOffset('center') + 'px'
                        }, speed);
                        break;
                    }
                    case EFFECT_E3: {
                        $(element.node).stop().animate({
                            top: $(element.node).getAnimationYOffset('top') + 'px',
                            left: $(element.node).getAnimationXOffset('right') + 'px'
                        }, speed);
                        break;
                    }
                    case EFFECT_E4: {
                        $(element.node).stop().animate({
                            top: $(element.node).getAnimationYOffset('bottom') + 'px',
                            left: $(element.node).getAnimationXOffset('left') + 'px'
                        }, speed);
                        break;
                    }
                    case EFFECT_E5: {
                        $(element.node).stop().animate({
                            top: $(element.node).getAnimationYOffset('bottom') + 'px',
                            left: $(element.node).getAnimationXOffset('center') + 'px'
                        }, speed);
                        break;
                    }
                    case EFFECT_E6: {
                        $(element.node).stop().animate({
                            top: $(element.node).getAnimationYOffset('bottom') + 'px',
                            left: $(element.node).getAnimationXOffset('right') + 'px'
                        }, speed);
                        break;
                    }
                    case EFFECT_E7: {
                        $(element.node).stop().animate({
                            top: $(element.node).getAnimationYOffset('center') + 'px',
                            left: $(element.node).getAnimationXOffset('left') + 'px'
                        }, speed);
                        break;
                    }
                    case EFFECT_E8: {
                        $(element.node).stop().animate({
                            top: $(element.node).getAnimationYOffset('center') + 'px',
                            left: $(element.node).getAnimationXOffset('center') + 'px'
                        }, speed);
                        break;
                    }
                    case EFFECT_E9: {
                        $(element.node).stop().animate({
                            top: $(element.node).getAnimationYOffset('center') + 'px',
                            left: $(element.node).getAnimationXOffset('right') + 'px'
                        }, speed);
                        break;
                    }
                    default:
                        break;
                }
                element.triggered = true;
            }

        }

        function prepareEffect(node, startposition) {

            switch (startposition) {
                case POSITION_S1: {
                    node.css({
                        top: $(node).getAnimationYOffset('top') + 'px',
                        left: $(node).getAnimationXOffset('left') + 'px'
                    });
                    break;
                }
                case POSITION_S2: {
                    node.css({
                        top: $(node).getAnimationYOffset('top') + 'px',
                        left: $(node).getAnimationXOffset('center') + 'px'
                    });
                    break;
                }
                case POSITION_S3: {
                    node.css({
                        top: $(node).getAnimationYOffset('top') + 'px',
                        left: $(node).getAnimationXOffset('right') + 'px'
                    });
                    break;
                }
                case POSITION_S4: {
                    node.css({
                        top: $(node).getAnimationYOffset('bottom') + 'px',
                        left: $(node).getAnimationXOffset('left') + 'px'
                    });
                    break;
                }
                case POSITION_S5: {
                    node.css({
                        top: $(node).getAnimationYOffset('bottom') + 'px',
                        left: $(node).getAnimationXOffset('center') + 'px'
                    });
                    break;
                }
                case POSITION_S6: {
                    node.css({
                        top: $(node).getAnimationYOffset('bottom') + 'px',
                        left: $(node).getAnimationXOffset('right') + 'px'
                    });
                    break;
                }
                case POSITION_S7: {
                    node.css({
                        top: $(node).getAnimationYOffset('center') + 'px',
                        left: $(node).getAnimationXOffset('left') + 'px'
                    });
                    break;
                }
                case POSITION_S8: {
                    node.css({
                        top: $(node).getAnimationYOffset('center') + 'px',
                        left: $(node).getAnimationXOffset('center') + 'px'
                    });
                    break;
                }
                case POSITION_S9: {
                    node.css({
                        top: $(node).getAnimationYOffset('center') + 'px',
                        left: $(node).getAnimationXOffset('right') + 'px'
                    });
                    break;
                }
                default:
                    break;
            }

        }

        function init() {

            visibleAnimationElements = [];
            animationElements = [];

            $('.has-animationeffects').each(function () {

                const el = $(this);

                el.find('div.animation-effect').each(function () {

                    const node = $(this);

                    if (node !== null) {

                        const effect = node.data('effect');
                        const startposition = node.data('startposition');
                        const speed = node.data('speed');
                        const viewport = node.data('viewport');
                        const hide = node.data('hide');
                        const ignoremotionreduce = node.data('ignoremotionreduce');
                        const animateCssOptions = node.data('animationcss');

                        if (hide === 1) {
                            $(node).hide();
                        }

                        prepareEffect(node, startposition);

                        let push = true;

                        if (ignoremotionreduce !== 1) {

                            const mediaQueryMotionReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
                            if (!mediaQueryMotionReduce || mediaQueryMotionReduce.matches === true) {
                                push = false;
                                $(node).hide();
                            }

                        }

                        if (push === true) {

                            animationElements.push({
                                node: node[0],
                                effect: effect,
                                startposition: startposition,
                                speed: speed,
                                viewport: viewport,
                                animateCssOptions: animateCssOptions,
                                type: TYPE_ARTICLE
                            });

                        }

                    }

                });

            });

            $('.animation-effect-ce').each(function () {

                const node = $(this);

                if (node !== null) {

                    const speed = node.data('speed');
                    const viewport = node.data('viewport');
                    const hide = node.data('hide');
                    const animateCssOptions = node.data('animationcss');

                    if (hide === 1) {
                        $(node).css({
                            opacity: 0
                        });
                    }

                    animationElements.push({
                        node: node[0],
                        effect: '',
                        startposition: '',
                        speed: speed,
                        viewport: viewport,
                        animateCssOptions: animateCssOptions,
                        type: TYPE_CEELEMENT
                    });

                }

            });

            if (animationElements.length > 0) {
                processAnimation();
            }

        }

        init();

        if (!animationElements.length) {
            return;
        }

        $(window).on('scroll', processAnimation);
        $(window).on('resize', init);

    })();
});