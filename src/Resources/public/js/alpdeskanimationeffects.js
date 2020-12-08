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

    var EFFECT_E1 = 'e1';
    var EFFECT_E2 = 'e2';

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
        switch (element.effect) {
          case EFFECT_E1:
          {
            $(element.node).stop().animate({
              backgroundPositionX: '100%',
              backgroundPositionY: '100%'
            }, speed);
            break;
          }
          case EFFECT_E2:
          {
            $(element.node).stop().animate({
              backgroundPositionX: '0%',
              backgroundPositionY: '100%'
            }, speed);
            break;
          }
          default:
            break;
        }
        element.triggered = true;
      }

    }

    function prepareEffect(node, effect) {
      switch (effect) {
        case EFFECT_E1:
        {
          node.css({
            backgroundPositionX: 'left',
            backgroundPositionY: 'top'
          });
          break;
        }
        case EFFECT_E2:
        {
          node.css({
            backgroundPositionX: 'right',
            backgroundPositionY: 'top'
          });
          break;
        }
        default:
          break;
      }
    }

    function init() {

      $('.has-animationeffects').each(function (index) {

        var el = $(this);

        el.find('div.animation-effect').each(function (index) {

          var node = $(this);

          if (node !== null) {

            var src = node.data('src');
            var effect = node.data('effect');
            var speed = node.data('speed');
            var viewport = node.data('viewport');

            node.css({
              backgroundImage: 'url(' + src + ')'
            });

            prepareEffect(node, effect);

            animationElements.push({
              node: node[0],
              effect: effect,
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