$(document).ready(function () {

  (function () {

    if (!('requestAnimationFrame' in window)) {
      return;
    }

    $.fn.isInParallaxViewport = function () {
      var elementTop = $(this).offset().top;
      var elementBottom = elementTop + $(this).outerHeight();
      var viewportTop = $(window).scrollTop();
      var viewportBottom = viewportTop + $(window).height();
      return elementBottom > viewportTop && elementTop < viewportBottom;
    };

    $.fn.getParallaxScrollOffset = function () {
      var diff = ($(this).offset().top - $(window).height());
      if (diff < 0) {
        diff = 0;
      }
      return diff;
    };

    var parallaxElements = [];
    var visibleElements = [];
    var processParallaxScheduled;
    var factor = 0.2;

    function prepareBackgroundvAlign(nodeHeight, srcHeight, vAlign) {
      var yPos = 0; // top
      if (vAlign === 'center') {
        yPos = Math.floor((nodeHeight / 2) - (srcHeight / 2));
      } else if (vAlign === 'bottom') {
        yPos = Math.floor(nodeHeight - (srcHeight));
      }
      return yPos;
    }

    function scrollParallax() {
      for (var i = 0; i < parallaxElements.length; i++) {
        var parent = parallaxElements[i].node.parentNode;
        if ($(parent).hasClass('parallax')) {
          if ($(parent).isInParallaxViewport() && !checkVisibleExists(parallaxElements[i].node)) {
            visibleElements.push({
              node: parallaxElements[i].node,
              parent: parent,
              vAlign: parallaxElements[i].vAlign,
              hAlign: parallaxElements[i].hAlign,
              sizeModus: parallaxElements[i].sizeModus,
              coverH: parallaxElements[i].coverH,
              elementH: parallaxElements[i].elementH
            });
          }
        }
      }

      cancelAnimationFrame(processParallaxScheduled);
      if (visibleElements.length) {
        processParallaxScheduled = requestAnimationFrame(updateVisibleElements);
      }

    }

    function checkVisibleExists(element) {
      for (var i = 0; i < visibleElements.length; i++) {
        if (visibleElements[i].node === element) {
          return true;
        }
      }
      return false;
    }

    function updateVisibleElements() {
      for (var i = 0; i < visibleElements.length; i++) {
        setPosition(visibleElements[i]);
      }
    }

    function setPosition(element) {

      if (element.parent.getBoundingClientRect().top > $(window).height()) {
        return;
      }

      var vAlign = parseInt($(element.node).attr('data-parallax-valign'));
      var hAlign = $(element.node).attr('data-parallax-halign');
      var vParallax = $(element.node).attr('data-vparallax');

      var scrollOffset = $(window).scrollTop() - $(element.parent).getParallaxScrollOffset();
      var motion = (vAlign + (factor * scrollOffset));

      if (element.vAlign === 'bottom') {
        motion = (vAlign + (-factor * scrollOffset));
      }

      $(element.node).css({
        backgroundPositionY: motion + 'px'
      });

      var motion_h = '';
      if (vParallax === 'left' && element.hAlign !== 'center') {
        motion_h = ' ' + (-motion) + 'px';
      } else if (vParallax === 'right' && element.hAlign !== 'center') {
        motion_h = ' ' + (motion) + 'px';
      }

      $(element.node).css({
        backgroundPositionX: hAlign + motion_h
      });

    }

    function initParallax() {

      parallaxElements = [];
      visibleElements = [];

      $('.has-responsive-background-image').each(function (index) {

        var el = $(this);
        var node = el.find('div.parallax-bgimage');
        if (node !== null) {

          var parallaxActive = node.data('isparallax');
          var sizeModus = node.data('sizemodus');
          var hAlign = node.data('halign');
          var vAlign = node.data('valign');
          var src = node.data('src');
          var srcHeight = node.data('srcheight');

          node.css({
            backgroundImage: 'url(' + src + ')',
            backgroundSize: sizeModus
          });

          if (parallaxActive === 1) {

            var coverH = 0;
            var elementH = $(this).outerHeight();

            if (sizeModus === 'cover') {

              var coverH = elementH + ((factor * $(window).height()) * 2);
              var coverTop = -(coverH - elementH);
              node.height(coverH);
              node.css({
                top: coverTop,
                backgroundPositionY: '0%'
              });
            }

            node.attr('data-parallax-valign', prepareBackgroundvAlign(node.height(), srcHeight, vAlign));
            node.attr('data-parallax-halign', hAlign);

            parallaxElements.push({
              node: node[0],
              vAlign: vAlign,
              hAlign: hAlign,
              sizeModus: sizeModus,
              coverH: coverH,
              elementH: elementH
            });

            scrollParallax();

          } else {

            node.css({
              backgroundPositionX: hAlign,
              backgroundPositionY: vAlign
            });

          }

        }

      });
    }

    initParallax();

    if (!parallaxElements.length)
      return;

    $(window).on('scroll', scrollParallax);
    $(window).on('resize', initParallax);

  })();
});