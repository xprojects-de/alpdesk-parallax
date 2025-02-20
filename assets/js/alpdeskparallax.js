import '../css/alpdeskparallax.css';

document.addEventListener("DOMContentLoaded", function () {

    if (!('requestAnimationFrame' in window)) {
        return;
    }

    function isInParallaxViewport(element) {

        const elementTop = element.getBoundingClientRect().top + window.scrollY;
        const elementBottom = elementTop + element.offsetHeight;
        const viewportTop = window.scrollY;
        const viewportBottom = viewportTop + window.innerHeight;

        return elementBottom > viewportTop && elementTop < viewportBottom;

    }

    function getParallaxScrollOffset(element) {

        const elementTop = element.getBoundingClientRect().top + window.scrollY;
        let diff = elementTop - window.innerHeight;

        return diff < 0 ? 0 : diff;

    }

    let parallaxElements = [];
    let visibleElements = [];
    let processParallaxScheduled;
    const factor = 0.25;

    function prepareBackgroundvAlign(nodeHeight, srcHeight, vAlign, sizeModus) {

        let yPos = 0;

        if (sizeModus === 'cover') {
            return yPos;
        }

        if (vAlign === 'center') {
            yPos = Math.floor((nodeHeight / 2) - (srcHeight / 2));
        } else if (vAlign === 'bottom') {
            yPos = Math.floor(nodeHeight - srcHeight);
        }

        return yPos;

    }

    function scrollParallax() {

        parallaxElements.forEach(element => {

            const parent = element.node.parentNode;
            if (parent.classList.contains('parallax') && isInParallaxViewport(parent) && !checkVisibleExists(element.node)) {

                visibleElements.push({
                    node: element.node,
                    parent: parent,
                    vAlign: element.vAlign,
                    hAlign: element.hAlign,
                    sizeModus: element.sizeModus,
                    coverH: element.coverH,
                    elementH: element.elementH
                });

            }

        });

        cancelAnimationFrame(processParallaxScheduled);

        if (visibleElements.length) {
            processParallaxScheduled = requestAnimationFrame(updateVisibleElements);
        }

    }

    function checkVisibleExists(element) {
        return visibleElements.some(visibleElement => visibleElement.node === element);
    }

    function updateVisibleElements() {
        visibleElements.forEach(setPosition);
    }

    function setPosition(element) {

        if (element.parent.getBoundingClientRect().top > window.innerHeight) {
            return;
        }

        const vAlign = parseInt(element.node.dataset.parallaxValign);
        const hAlign = element.node.dataset.parallaxHalign;
        const vParallax = element.node.dataset.vparallax;

        const scrollOffset = window.scrollY - getParallaxScrollOffset(element.parent);
        let motion = vAlign + (factor * scrollOffset);

        if (element.vAlign === 'bottom' && element.sizeModus !== 'cover') {
            motion = vAlign - (factor * scrollOffset);
        }

        element.node.style.backgroundPositionY = motion + 'px';

        let motion_h = hAlign;
        if (vParallax === 'left' && element.hAlign !== 'center') {
            motion_h = (-motion) + 'px';
        } else if (vParallax === 'right' && element.hAlign !== 'center') {
            motion_h = (window.innerWidth - motion) + 'px';
        }

        element.node.style.backgroundPositionX = motion_h;
    }

    function initParallax() {

        parallaxElements = [];
        visibleElements = [];

        document.querySelectorAll('.has-responsive-background-image').forEach(el => {

            const node = el.querySelector('div.parallax-bgimage');
            if (node) {

                const parallaxActive = node.dataset.isparallax;
                const sizeModus = node.dataset.sizemodus;
                const hAlign = node.dataset.halign;
                const vAlign = node.dataset.valign;
                const src = node.dataset.src;
                const srcHeight = node.dataset.srcheight;

                node.style.backgroundImage = `url(${src})`;
                node.style.backgroundSize = sizeModus;

                if (parallaxActive === '1') {

                    const elementH = el.offsetHeight;
                    let coverH = sizeModus === 'cover' ? elementH + (elementH * factor) + (factor * window.innerHeight) : 0;

                    if (sizeModus === 'cover') {

                        node.style.height = coverH + 'px';
                        node.style.top = -(coverH - elementH) + 'px';
                        node.style.backgroundPositionY = '0%';

                    }

                    node.dataset.parallaxValign = prepareBackgroundvAlign(node.offsetHeight, srcHeight, vAlign, sizeModus).toString();
                    node.dataset.parallaxHalign = hAlign;

                    parallaxElements.push({node, vAlign, hAlign, sizeModus, coverH, elementH});

                    scrollParallax();

                } else {

                    node.style.backgroundPositionX = hAlign;
                    node.style.backgroundPositionY = vAlign;

                }

            }

        });
    }

    initParallax();

    if (parallaxElements.length > 0) {

        window.addEventListener('scroll', scrollParallax);
        window.addEventListener('resize', initParallax);

    }

});

