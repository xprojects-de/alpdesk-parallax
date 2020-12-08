$(document).ready(function () {

  (function () {

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

    var animationElements = [];
    var visibleAnimationElements = [];

    var POSITION_S1 = 's1';
    var POSITION_S2 = 's2';
    var POSITION_S3 = 's3';
    var POSITION_S4 = 's4';
    var POSITION_S5 = 's5';
    var POSITION_S6 = 's6';
    var POSITION_S7 = 's7';

    var EFFECT_E1 = 'e1';
    var EFFECT_E2 = 'e2';
    var EFFECT_E3 = 'e3';
    var EFFECT_E4 = 'e4';
    var EFFECT_E5 = 'e5';
    var EFFECT_E6 = 'e6';
    var EFFECT_E7 = 'e7';

    var FADE_F1 = 'f1';
    var FADE_F2 = 'f2';

    var EFFECT_SPEED_SLOW = 'slow';
    var EFFECT_SPEED_SLOW_VALUE = 4000;
    var EFFECT_SPEED_MIDDLE = 'middle';
    var EFFECT_SPEED_MIDDLE_VALUE = 2500;
    var EFFECT_SPEED_FAST = 'fast';
    var EFFECT_SPEED_FAST_VALUE = 1000;

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

    function scroll() {
      for (var i = 0; i < animationElements.length; i++) {
        var parent = animationElements[i].node.parentNode;
        if ($(parent).isInAnimationViewport(animationElements[i].viewport) && !checkVisibleExists(animationElements[i].node)) {
          visibleAnimationElements.push({
            node: animationElements[i].node,
            effect: animationElements[i].effect,
            fade: animationElements[i].fade,
            startposition: animationElements[i].startposition,
            speed: animationElements[i].speed,
            viewport: animationElements[i].viewport,
            triggered: false
          });
        }
      }
      updateVisibleElements();
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
        var opacity = 1;
        if (element.fade === FADE_F2) {
          opacity = 0;
        }

        switch (element.effect) {
          case EFFECT_E1:
          {
            $(element.node).stop().animate({
              backgroundPositionY: '0%',
              backgroundPositionX: '0%',
              opacity: opacity
            }, speed);
            break;
          }
          case EFFECT_E2:
          {
            $(element.node).stop().animate({
              backgroundPositionY: '0%',
              backgroundPositionX: '50%',
              opacity: opacity
            }, speed);
            break;
          }
          case EFFECT_E3:
          {
            $(element.node).stop().animate({
              backgroundPositionY: '0%',
              backgroundPositionX: '100%',
              opacity: opacity
            }, speed);
            break;
          }
          case EFFECT_E4:
          {
            $(element.node).stop().animate({
              backgroundPositionY: '100%',
              backgroundPositionX: '0%',
              opacity: opacity
            }, speed);
            break;
          }
          case EFFECT_E5:
          {
            $(element.node).stop().animate({
              backgroundPositionY: '100%',
              backgroundPositionX: '50%',
              opacity: opacity
            }, speed);
            break;
          }
          case EFFECT_E6:
          {
            $(element.node).stop().animate({
              backgroundPositionY: '100%',
              backgroundPositionX: '100%',
              opacity: opacity
            }, speed);
            break;
          }
          case EFFECT_E7:
          {
            $(element.node).stop().animate({
              backgroundPositionY: '50%',
              backgroundPositionX: '50%',
              opacity: opacity
            }, speed);
            break;
          }
          default:
            $(element.node).stop().animate({
              opacity: opacity
            }, speed);
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
            backgroundPositionY: '0%',
            backgroundPositionX: '0%'
          });
          break;
        }
        case POSITION_S2:
        {
          node.css({
            backgroundPositionY: '0%',
            backgroundPositionX: '50%'
          });
          break;
        }
        case POSITION_S3:
        {
          node.css({
            backgroundPositionY: '0%',
            backgroundPositionX: '100%'
          });
          break;
        }
        case POSITION_S4:
        {
          node.css({
            backgroundPositionY: '100%',
            backgroundPositionX: '0%'
          });
          break;
        }
        case POSITION_S5:
        {
          node.css({
            backgroundPositionY: '100%',
            backgroundPositionX: '50%'
          });
          break;
        }
        case POSITION_S6:
        {
          node.css({
            backgroundPositionY: '100%',
            backgroundPositionX: '100%'
          });
          break;
        }
        case POSITION_S7:
        {
          node.css({
            backgroundPositionY: '50%',
            backgroundPositionX: '50%'
          });
          break;
        }
        default:
          break;
      }
    }

    function prepareFade(node, fade) {
      switch (fade) {
        case FADE_F1:
        {
          node.css({
            opacity: 0
          });
          break;
        }
        default:
          break;
      }
    }


    function init() {

      visibleAnimationElements = [];

      $('.has-animationeffects').each(function (index) {

        var el = $(this);

        el.find('div.animation-effect').each(function (index) {

          var node = $(this);

          if (node !== null) {

            var src = node.data('src');
            var effect = node.data('effect');
            var fade = node.data('fade');
            var startposition = node.data('startposition');
            var speed = node.data('speed');
            var viewport = node.data('viewport');

            node.css({
              backgroundImage: 'url(' + src + ')'
            });

            prepareEffect(node, startposition);
            prepareFade(node, fade);

            animationElements.push({
              node: node[0],
              effect: effect,
              fade: fade,
              startposition: startposition,
              speed: speed,
              viewport: viewport
            });

            scroll();

          }

        });

      });
    }

    init();

    if (!animationElements.length)
      return;

    $(window).on('scroll', scroll);
    $(window).on('resize', init);

  })();
});