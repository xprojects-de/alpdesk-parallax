import '../css/animate.min.css';
import '../css/alpdeskanimationeffects.css';

document.addEventListener('DOMContentLoaded', function () {

    if (!('requestAnimationFrame' in window)) {
        return;
    }

    function isInAnimationViewport(element, offsetPercent = 0) {
        const rect = element.getBoundingClientRect();
        let elementTop = rect.top + window.scrollY;
        const elementHeight = rect.height;
        if (offsetPercent !== 0) {
            const hPercent = (window.innerHeight / 100) * offsetPercent;
            elementTop = elementTop + hPercent;
        }
        const elementBottom = elementTop + elementHeight;
        const viewportTop = window.scrollY;
        const viewportBottom = viewportTop + window.innerHeight;
        return elementBottom > viewportTop && elementTop < viewportBottom;
    }

    function getAnimationXOffset(element, position = 'left') {
        let o = 0;
        const parentWidth = element.parentElement.offsetWidth;
        if (position === 'right') {
            o = parentWidth - element.offsetWidth;
        } else if (position === 'center') {
            o = (parentWidth / 2) - (element.offsetWidth / 2);
        }
        return o;
    }

    function getAnimationYOffset(element, position = 'top') {
        let o = 0;
        const parentHeight = element.parentElement.offsetHeight;
        if (position === 'bottom') {
            o = parentHeight - element.offsetHeight;
        } else if (position === 'center') {
            o = (parentHeight / 2) - (element.offsetHeight / 2);
        }
        return o;
    }

    const animationElements = [];
    const visibleAnimationElements = [];
    let processAnimationsScheduled = null;

    const EFFECT_SPEED_SLOW_VALUE = 4000;
    const EFFECT_SPEED_MIDDLE_VALUE = 2500;
    const EFFECT_SPEED_FAST_VALUE = 1000;

    function getSpeed(speed) {
        switch (speed) {
            case 'slow':
                return EFFECT_SPEED_SLOW_VALUE;
            case 'middle':
                return EFFECT_SPEED_MIDDLE_VALUE;
            case 'fast':
                return EFFECT_SPEED_FAST_VALUE;
            default:
                return EFFECT_SPEED_MIDDLE_VALUE;
        }
    }

    function processAnimation() {
        for (let i = 0; i < animationElements.length; i++) {
            const parent = animationElements[i].node.parentElement;
            if (isInAnimationViewport(parent, animationElements[i].viewport) && !checkVisibleExists(animationElements[i].node)) {
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

            element.node.style.display = 'block';
            if (element.type === 2) {
                element.node.style.opacity = 1;
            }

            if (element.animateCssOptions !== '') {
                element.node.style.animationDuration = speed + 'ms';
                element.node.classList.add('animate__animated');
                element.node.classList.add('animate__' + element.animateCssOptions);
            }

            element.node.style.transition = `top ${speed}ms, left ${speed}ms`;

            element.node.style.top = getAnimationYOffset(element.node, 'top') + 'px';
            element.node.style.left = getAnimationXOffset(element.node, 'left') + 'px';

            element.triggered = true;
        }
    }

    function prepareEffect(node, startposition) {
        switch (startposition) {
            case 's1':
                node.style.top = getAnimationYOffset(node, 'top') + 'px';
                node.style.left = getAnimationXOffset(node, 'left') + 'px';
                break;
            case 's2':
                node.style.top = getAnimationYOffset(node, 'top') + 'px';
                node.style.left = getAnimationXOffset(node, 'center') + 'px';
                break;
            case 's3':
                node.style.top = getAnimationYOffset(node, 'top') + 'px';
                node.style.left = getAnimationXOffset(node, 'right') + 'px';
                break;
            case 's4':
                node.style.top = getAnimationYOffset(node, 'bottom') + 'px';
                node.style.left = getAnimationXOffset(node, 'left') + 'px';
                break;
            case 's5':
                node.style.top = getAnimationYOffset(node, 'bottom') + 'px';
                node.style.left = getAnimationXOffset(node, 'center') + 'px';
                break;
            case 's6':
                node.style.top = getAnimationYOffset(node, 'bottom') + 'px';
                node.style.left = getAnimationXOffset(node, 'right') + 'px';
                break;
            case 's7':
                node.style.top = getAnimationYOffset(node, 'center') + 'px';
                node.style.left = getAnimationXOffset(node, 'left') + 'px';
                break;
            case 's8':
                node.style.top = getAnimationYOffset(node, 'center') + 'px';
                node.style.left = getAnimationXOffset(node, 'center') + 'px';
                break;
            case 's9':
                node.style.top = getAnimationYOffset(node, 'center') + 'px';
                node.style.left = getAnimationXOffset(node, 'right') + 'px';
                break;
            default:
                break;
        }
    }

    function init() {

        visibleAnimationElements.length = 0;
        animationElements.length = 0;

        document.querySelectorAll('.has-animationeffects').forEach(function (el) {
            el.querySelectorAll('div.animation-effect').forEach(function (node) {

                if (node !== null) {
                    const effect = node.dataset.effect;
                    const startposition = node.dataset.startposition;
                    const speed = node.dataset.speed;
                    const viewport = node.dataset.viewport;
                    const hide = node.dataset.hide;
                    const ignoremotionreduce = node.dataset.ignoremotionreduce;
                    const animateCssOptions = node.dataset.animationcss;

                    if (hide === '1') {
                        node.style.display = 'none';
                    }

                    prepareEffect(node, startposition);

                    let push = true;

                    if (ignoremotionreduce !== '1') {
                        const mediaQueryMotionReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
                        if (!mediaQueryMotionReduce || mediaQueryMotionReduce.matches === true) {
                            push = false;
                            node.style.display = 'none';
                        }
                    }

                    if (push === true) {
                        animationElements.push({
                            node: node,
                            effect: effect,
                            startposition: startposition,
                            speed: speed,
                            viewport: viewport,
                            animateCssOptions: animateCssOptions,
                            type: 1 // TYPE_ARTICLE
                        });
                    }
                }
            });
        });

        document.querySelectorAll('.animation-effect-ce').forEach(function (node) {

            if (node !== null) {
                const speed = node.dataset.speed;
                const viewport = node.dataset.viewport;
                const hide = node.dataset.hide;
                const animateCssOptions = node.dataset.animationcss;

                if (hide === '1') {
                    node.style.opacity = 0;
                }

                animationElements.push({
                    node: node,
                    effect: '',
                    startposition: '',
                    speed: speed,
                    viewport: viewport,
                    animateCssOptions: animateCssOptions,
                    type: 2 // TYPE_CEELEMENT
                });
            }
        });

        if (animationElements.length > 0) {
            processAnimation();
        }
    }

    init();

    if (animationElements.length) {
        window.addEventListener('scroll', processAnimation);
        window.addEventListener('resize', init);
    }

});


