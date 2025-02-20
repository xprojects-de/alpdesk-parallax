import '../css/alpdeskparallax.css'

(function (window, document) {

    function alpdeskParallaxReady(callback) {
        if (document.addEventListener) {
            document.addEventListener('DOMContentLoaded', callback);
        } else if (document.readyState !== 'loading') {
            callback();
        }
    }

    alpdeskParallaxReady(function () {

        if (!('requestAnimationFrame' in window)) {
            return;
        }

        $.fn.isInParallaxViewport = function () {

            const elementTop = $(this).offset().top;
            const elementBottom = elementTop + $(this).outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();

            return elementBottom > viewportTop && elementTop < viewportBottom;

        };

        $.fn.getParallaxScrollOffset = function () {

            let diff = ($(this).offset().top - $(window).height());
            if (diff < 0) {
                diff = 0;
            }

            return diff;

        };

        let parallaxElements = [];
        let visibleElements = [];
        let processParallaxScheduled;
        const factor = 0.25;

        function prepareBackgroundvAlign(nodeHeight, srcHeight, vAlign, sizeModus) {

            let yPos = 0; // top
            if (sizeModus === 'cover') {
                return yPos;
            }

            if (vAlign === 'center') {
                yPos = Math.floor((nodeHeight / 2) - (srcHeight / 2));
            } else if (vAlign === 'bottom') {
                yPos = Math.floor(nodeHeight - (srcHeight));
            }

            return yPos;
        }

        function scrollParallax() {

            for (let i = 0; i < parallaxElements.length; i++) {

                const parent = parallaxElements[i].node.parentNode;
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

            for (let i = 0; i < visibleElements.length; i++) {

                if (visibleElements[i].node === element) {
                    return true;
                }

            }

            return false;

        }

        function updateVisibleElements() {

            for (let i = 0; i < visibleElements.length; i++) {
                setPosition(visibleElements[i]);
            }

        }

        function setPosition(element) {

            if (element.parent.getBoundingClientRect().top > $(window).height()) {
                return;
            }

            const vAlign = parseInt($(element.node).attr('data-parallax-valign'));
            const hAlign = $(element.node).attr('data-parallax-halign');
            const vParallax = $(element.node).attr('data-vparallax');

            const scrollOffset = $(window).scrollTop() - $(element.parent).getParallaxScrollOffset();
            let motion = (vAlign + (factor * scrollOffset));

            if (element.vAlign === 'bottom' && element.sizeModus !== 'cover') {
                motion = (vAlign + (-factor * scrollOffset));
            }

            $(element.node).css({
                backgroundPositionY: motion + 'px'
            });

            let motion_h = hAlign;
            if (vParallax === 'left' && element.hAlign !== 'center') {
                motion_h = (-motion) + 'px';
            } else if (vParallax === 'right' && element.hAlign !== 'center') {
                motion_h = ($(window).width() - motion) + 'px';
            }

            $(element.node).css({
                backgroundPositionX: motion_h
            });

        }

        function initParallax() {

            parallaxElements = [];
            visibleElements = [];

            $('.has-responsive-background-image').each(function () {

                const el = $(this);
                const node = el.find('div.parallax-bgimage');
                if (node !== null) {

                    const parallaxActive = node.data('isparallax');
                    const sizeModus = node.data('sizemodus');
                    const hAlign = node.data('halign');
                    const vAlign = node.data('valign');
                    const src = node.data('src');
                    const srcHeight = node.data('srcheight');

                    node.css({
                        backgroundImage: 'url(' + src + ')',
                        backgroundSize: sizeModus
                    });

                    if (parallaxActive === 1) {

                        let coverH = 0;
                        const elementH = $(this).outerHeight();

                        if (sizeModus === 'cover') {

                            coverH = elementH + (elementH * factor) + (factor * $(window).height());
                            const coverTop = -(coverH - elementH);
                            node.height(coverH);
                            node.css({
                                top: coverTop,
                                backgroundPositionY: '0%'
                            });

                        }

                        node.attr('data-parallax-valign', prepareBackgroundvAlign(node.height(), srcHeight, vAlign, sizeModus));
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

    }, false);

})(window, document);