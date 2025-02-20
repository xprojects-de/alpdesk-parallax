import '../css/animate.min.css';
import '../css/alpdeskanimationeffects.css';

document.addEventListener('DOMContentLoaded', function () {

    if (!('requestAnimationFrame' in window)) {
        return;
    }

    function isInAnimationViewport(element, offsetPercent = 0) {

        const rect = element.getBoundingClientRect();
        let elementTop = rect.top + window.scrollY;

        if (offsetPercent !== 0 && elementTop !== 0) {

            const hPercent = (window.innerHeight / 100) * offsetPercent;
            elementTop = elementTop + hPercent;

        }

        const elementBottom = elementTop + rect.height;
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
    const TYPE_CE_ELEMENT = 2;

    function getSpeed(speed) {
        switch (speed) {
            case EFFECT_SPEED_SLOW:
                return EFFECT_SPEED_SLOW_VALUE;
            case EFFECT_SPEED_MIDDLE:
                return EFFECT_SPEED_MIDDLE_VALUE;
            case EFFECT_SPEED_FAST:
                return EFFECT_SPEED_FAST_VALUE;
            default:
                return EFFECT_SPEED_MIDDLE_VALUE;
        }
    }

    function processAnimation() {

        animationElements.forEach(element => {

            const parent = element.node.parentNode;
            if (isInAnimationViewport(parent, element.viewport) && !checkVisibleExists(element.node)) {

                visibleAnimationElements.push({
                    node: element.node,
                    effect: element.effect,
                    startposition: element.startposition,
                    speed: element.speed,
                    viewport: element.viewport,
                    animateCssOptions: element.animateCssOptions,
                    type: element.type,
                    triggered: false
                });

            }

        });

        cancelAnimationFrame(processAnimationsScheduled);

        if (animationElements.length) {
            processAnimationsScheduled = requestAnimationFrame(updateVisibleElements);
        }

    }

    function checkVisibleExists(element) {
        return visibleAnimationElements.some(visibleElement => visibleElement.node === element);
    }

    function updateVisibleElements() {
        visibleAnimationElements.forEach(runEffect);
    }

    function animateElement(node, topValue, leftValue, speed) {

        const startTime = performance.now();
        const initialTop = parseInt(window.getComputedStyle(node).top, 10);
        const initialLeft = parseInt(window.getComputedStyle(node).left, 10);
        const deltaTop = topValue - initialTop;
        const deltaLeft = leftValue - initialLeft;

        let elementAnimationsScheduled = null;

        function animate() {

            const elapsed = performance.now() - startTime;
            const progress = Math.min(elapsed / speed, 1);

            node.style.top = (initialTop + deltaTop * progress) + 'px';
            node.style.left = (initialLeft + deltaLeft * progress) + 'px';

            cancelAnimationFrame(elementAnimationsScheduled);

            if (progress < 1) {
                elementAnimationsScheduled = requestAnimationFrame(animate);
            }
        }

        animate();

    }


    function runEffect(element) {

        if (element.triggered === false) {

            const speed = getSpeed(element.speed);

            element.node.style.display = 'block';
            if (element.type === TYPE_CE_ELEMENT) {
                element.node.style.opacity = 1;
            }

            if (element.animateCssOptions !== '') {

                element.node.style.animationDuration = speed + 'ms';
                element.node.classList.add('animate__animated');
                element.node.classList.add('animate__' + element.animateCssOptions);

            }

            switch (element.effect) {
                case EFFECT_E1: {
                    animateElement(element.node, getAnimationYOffset(element.node, 'top'), getAnimationXOffset(element.node, 'left'), speed);
                    break;
                }
                case EFFECT_E2: {
                    animateElement(element.node, getAnimationYOffset(element.node, 'top'), getAnimationXOffset(element.node, 'center'), speed);
                    break;
                }
                case EFFECT_E3: {
                    animateElement(element.node, getAnimationYOffset(element.node, 'top'), getAnimationXOffset(element.node, 'right'), speed);
                    break;
                }
                case EFFECT_E4: {
                    animateElement(element.node, getAnimationYOffset(element.node, 'bottom'), getAnimationXOffset(element.node, 'left'), speed);
                    break;
                }
                case EFFECT_E5: {
                    animateElement(element.node, getAnimationYOffset(element.node, 'bottom'), getAnimationXOffset(element.node, 'center'), speed);
                    break;
                }
                case EFFECT_E6: {
                    animateElement(element.node, getAnimationYOffset(element.node, 'bottom'), getAnimationXOffset(element.node, 'right'), speed);
                    break;
                }
                case EFFECT_E7: {
                    animateElement(element.node, getAnimationYOffset(element.node, 'center'), getAnimationXOffset(element.node, 'left'), speed);
                    break;
                }
                case EFFECT_E8: {
                    animateElement(element.node, getAnimationYOffset(element.node, 'center'), getAnimationXOffset(element.node, 'center'), speed);
                    break;
                }
                case EFFECT_E9: {
                    animateElement(element.node, getAnimationYOffset(element.node, 'center'), getAnimationXOffset(element.node, 'right'), speed);
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
                node.style.top = getAnimationYOffset(node, 'top') + 'px';
                node.style.left = getAnimationXOffset(node, 'left') + 'px';
                break;
            case POSITION_S2:
                node.style.top = getAnimationYOffset(node, 'top') + 'px';
                node.style.left = getAnimationXOffset(node, 'center') + 'px';
                break;
            case POSITION_S3:
                node.style.top = getAnimationYOffset(node, 'top') + 'px';
                node.style.left = getAnimationXOffset(node, 'right') + 'px';
                break;
            case POSITION_S4:
                node.style.top = getAnimationYOffset(node, 'bottom') + 'px';
                node.style.left = getAnimationXOffset(node, 'left') + 'px';
                break;
            case POSITION_S5:
                node.style.top = getAnimationYOffset(node, 'bottom') + 'px';
                node.style.left = getAnimationXOffset(node, 'center') + 'px';
                break;
            case POSITION_S6:
                node.style.top = getAnimationYOffset(node, 'bottom') + 'px';
                node.style.left = getAnimationXOffset(node, 'right') + 'px';
                break;
            case POSITION_S7:
                node.style.top = getAnimationYOffset(node, 'center') + 'px';
                node.style.left = getAnimationXOffset(node, 'left') + 'px';
                break;
            case POSITION_S8:
                node.style.top = getAnimationYOffset(node, 'center') + 'px';
                node.style.left = getAnimationXOffset(node, 'center') + 'px';
                break;
            case POSITION_S9:
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

                if (node) {

                    const effect = node.dataset.effect;
                    const startposition = node.dataset.startposition;
                    const speed = node.dataset.speed;
                    const viewport = node.dataset.viewport;
                    const hide = node.dataset.hide;
                    const ignoreMotionReduce = node.dataset.ignoremotionreduce;
                    const animateCssOptions = node.dataset.animationcss;

                    if (hide === '1') {
                        node.style.display = 'none';
                    }

                    prepareEffect(node, startposition);

                    let push = true;

                    if (ignoreMotionReduce !== '1') {

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
                            type: TYPE_ARTICLE
                        });

                    }

                }

            });

        });

        document.querySelectorAll('.animation-effect-ce').forEach(function (node) {

            if (node) {

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
                    type: TYPE_CE_ELEMENT
                });

            }
        });

        if (animationElements.length > 0) {
            processAnimation();
        }
    }

    init();

    if (animationElements.length > 0) {

        window.addEventListener('scroll', processAnimation);
        window.addEventListener('resize', init);

    }

});


