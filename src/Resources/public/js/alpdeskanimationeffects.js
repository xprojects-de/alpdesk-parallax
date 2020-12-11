$(document).ready(function () {

  (function () {

    if (!('requestAnimationFrame' in window)) {
      return;
    }

    $.fn.isInAnimationViewport = function (offsetPercent = 0) {
      var elementTop = $(this).offset().top;
      if (offsetPercent !== 0 && elementTop !== 0) {
        var hPercent = ($(window).height() / 100) * offsetPercent;
        elementTop = elementTop + hPercent;
      }
      var elementBottom = elementTop + $(this).outerHeight();
      var viewportTop = $(window).scrollTop();
      var viewportBottom = viewportTop + $(window).height();
      return elementBottom > viewportTop && elementTop < viewportBottom;
    };

    $.fn.getAnimationXOffset = function (position = 'left') {
      var o = 0;
      if (position === 'right') {
        o = ($(this).parent().width() - $(this).outerWidth());
      } else if (position === 'center') {
        o = (($(this).parent().width() / 2) - ($(this).outerWidth() / 2));
      }
      return o;
    };

    $.fn.getAnimationYOffset = function (position = 'top') {
      var o = 0;
      if (position === 'bottom') {
        o = ($(this).parent().height() - $(this).outerHeight());
      } else if (position === 'center') {
        o = (($(this).parent().height() / 2) - ($(this).outerHeight() / 2));
      }
      return o;
    };

    var animationElements = [];
    var visibleAnimationElements = [];
    var processAnimationsScheduled;

    var POSITION_S1 = 's1';
    var POSITION_S2 = 's2';
    var POSITION_S3 = 's3';
    var POSITION_S4 = 's4';
    var POSITION_S5 = 's5';
    var POSITION_S6 = 's6';
    var POSITION_S7 = 's7';
    var POSITION_S8 = 's8';
    var POSITION_S9 = 's9';

    var EFFECT_E1 = 'e1';
    var EFFECT_E2 = 'e2';
    var EFFECT_E3 = 'e3';
    var EFFECT_E4 = 'e4';
    var EFFECT_E5 = 'e5';
    var EFFECT_E6 = 'e6';
    var EFFECT_E7 = 'e7';
    var EFFECT_E8 = 'e8';
    var EFFECT_E9 = 'e9';

    var EFFECT_SPEED_SLOW = 'slow';
    var EFFECT_SPEED_SLOW_VALUE = 4000;
    var EFFECT_SPEED_MIDDLE = 'middle';
    var EFFECT_SPEED_MIDDLE_VALUE = 2500;
    var EFFECT_SPEED_FAST = 'fast';
    var EFFECT_SPEED_FAST_VALUE = 1000;

    var TYPE_ARTICLE = 1;
    var TYPE_CEELEMENT = 2;

    function getSpeed(speed) {
      var s = EFFECT_SPEED_MIDDLE_VALUE;
      switch (speed) {
        case EFFECT_SPEED_SLOW:
        {
          s = EFFECT_SPEED_SLOW_VALUE;
          break;
        }
        case EFFECT_SPEED_MIDDLE:
        {
          s = EFFECT_SPEED_MIDDLE_VALUE;
          break;
        }
        case EFFECT_SPEED_FAST:
        {
          s = EFFECT_SPEED_FAST_VALUE;
          break;
        }
        default:
          break;
      }
      return s;
    }

    function processAnimation() {
      for (var i = 0; i < animationElements.length; i++) {
        var parent = animationElements[i].node.parentNode;
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
      for (var i = 0; i < visibleAnimationElements.length; i++) {
        if (visibleAnimationElements[i].node === element) {
          return true;
        }
      }
      return false;
    }

    function updateVisibleElements() {
      for (var i = 0; i < visibleAnimationElements.length; i++) {
        runEffect(visibleAnimationElements[i]);
      }
    }

    function runEffect(element) {
      if (element.triggered === false) {

        var speed = getSpeed(element.speed);

        $(element.node).show();
        if (element.type === TYPE_CEELEMENT) {
          $(element.node).css({
            opacity: 1
          });
        }

        if (element.animateCssOptions.length > 0) {
          $(element.node).css({
            animationDuration: speed + 'ms'
          });
          $(element.node).addClass('animate__animated');
          for (var i = 0; i < element.animateCssOptions.length; i++) {
            $(element.node).addClass('animate__' + element.animateCssOptions[i]);
          }
        }

        switch (element.effect) {
          case EFFECT_E1:
          {
            $(element.node).stop().animate({
              top: $(element.node).getAnimationYOffset('top') + 'px',
              left: $(element.node).getAnimationXOffset('left') + 'px'
            }, speed);
            break;
          }
          case EFFECT_E2:
          {
            $(element.node).stop().animate({
              top: $(element.node).getAnimationYOffset('top') + 'px',
              left: $(element.node).getAnimationXOffset('center') + 'px'
            }, speed);
            break;
          }
          case EFFECT_E3:
          {
            $(element.node).stop().animate({
              top: $(element.node).getAnimationYOffset('top') + 'px',
              left: $(element.node).getAnimationXOffset('right') + 'px'
            }, speed);
            break;
          }
          case EFFECT_E4:
          {
            $(element.node).stop().animate({
              top: $(element.node).getAnimationYOffset('bottom') + 'px',
              left: $(element.node).getAnimationXOffset('left') + 'px'
            }, speed);
            break;
          }
          case EFFECT_E5:
          {
            $(element.node).stop().animate({
              top: $(element.node).getAnimationYOffset('bottom') + 'px',
              left: $(element.node).getAnimationXOffset('center') + 'px'
            }, speed);
            break;
          }
          case EFFECT_E6:
          {
            $(element.node).stop().animate({
              top: $(element.node).getAnimationYOffset('bottom') + 'px',
              left: $(element.node).getAnimationXOffset('right') + 'px'
            }, speed);
            break;
          }
          case EFFECT_E7:
          {
            $(element.node).stop().animate({
              top: $(element.node).getAnimationYOffset('center') + 'px',
              left: $(element.node).getAnimationXOffset('left') + 'px'
            }, speed);
            break;
          }
          case EFFECT_E8:
          {
            $(element.node).stop().animate({
              top: $(element.node).getAnimationYOffset('center') + 'px',
              left: $(element.node).getAnimationXOffset('center') + 'px'
            }, speed);
            break;
          }
          case EFFECT_E9:
          {
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
        case POSITION_S1:
        {
          node.css({
            top: $(node).getAnimationYOffset('top') + 'px',
            left: $(node).getAnimationXOffset('left') + 'px'
          });
          break;
        }
        case POSITION_S2:
        {
          node.css({
            top: $(node).getAnimationYOffset('top') + 'px',
            left: $(node).getAnimationXOffset('center') + 'px'
          });
          break;
        }
        case POSITION_S3:
        {
          node.css({
            top: $(node).getAnimationYOffset('top') + 'px',
            left: $(node).getAnimationXOffset('right') + 'px'
          });
          break;
        }
        case POSITION_S4:
        {
          node.css({
            top: $(node).getAnimationYOffset('bottom') + 'px',
            left: $(node).getAnimationXOffset('left') + 'px'
          });
          break;
        }
        case POSITION_S5:
        {
          node.css({
            top: $(node).getAnimationYOffset('bottom') + 'px',
            left: $(node).getAnimationXOffset('center') + 'px'
          });
          break;
        }
        case POSITION_S6:
        {
          node.css({
            top: $(node).getAnimationYOffset('bottom') + 'px',
            left: $(node).getAnimationXOffset('right') + 'px'
          });
          break;
        }
        case POSITION_S7:
        {
          node.css({
            top: $(node).getAnimationYOffset('center') + 'px',
            left: $(node).getAnimationXOffset('left') + 'px'
          });
          break;
        }
        case POSITION_S8:
        {
          node.css({
            top: $(node).getAnimationYOffset('center') + 'px',
            left: $(node).getAnimationXOffset('center') + 'px'
          });
          break;
        }
        case POSITION_S9:
        {
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

        var el = $(this);

        el.find('div.animation-effect').each(function () {

          var node = $(this);

          if (node !== null) {

            var effect = node.data('effect');
            var startposition = node.data('startposition');
            var speed = node.data('speed');
            var viewport = node.data('viewport');
            var hide = node.data('hide');
            var ignoremotionreduce = node.data('ignoremotionreduce');
            var animateCss = node.data('animationcss');
            var animateCssOptions = [];
            if (animateCss !== '') {
              animateCssOptions = animateCss.split(';');
            }

            if (hide === 1) {
              $(node).hide();
            }

            prepareEffect(node, startposition);

            var push = true;

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

        var node = $(this);

        if (node !== null) {

          var speed = node.data('speed');
          var viewport = node.data('viewport');
          var hide = node.data('hide');
          var animateCss = node.data('animationcss');
          var animateCssOptions = [];
          if (animateCss !== '') {
            animateCssOptions = animateCss.split(';');
          }

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