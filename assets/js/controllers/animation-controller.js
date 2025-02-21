import {Controller} from '@hotwired/stimulus';

export default class AnimationController extends Controller {

    static values = {
        startposition: String,
        effect: String,
        speed: String,
        animationcss: String,
        hide: String,
        ignoremotionreduce: String,
        viewport: String,
        type: String
    }

    animationElement = undefined;
    processAnimationsScheduled = null;

    POSITION_S1 = 's1';
    POSITION_S2 = 's2';
    POSITION_S3 = 's3';
    POSITION_S4 = 's4';
    POSITION_S5 = 's5';
    POSITION_S6 = 's6';
    POSITION_S7 = 's7';
    POSITION_S8 = 's8';
    POSITION_S9 = 's9';

    EFFECT_E1 = 'e1';
    EFFECT_E2 = 'e2';
    EFFECT_E3 = 'e3';
    EFFECT_E4 = 'e4';
    EFFECT_E5 = 'e5';
    EFFECT_E6 = 'e6';
    EFFECT_E7 = 'e7';
    EFFECT_E8 = 'e8';
    EFFECT_E9 = 'e9';

    EFFECT_SPEED_SLOW = 'slow';
    EFFECT_SPEED_SLOW_VALUE = 4000;
    EFFECT_SPEED_MIDDLE = 'middle';
    EFFECT_SPEED_MIDDLE_VALUE = 2500;
    EFFECT_SPEED_FAST = 'fast';
    EFFECT_SPEED_FAST_VALUE = 1000;

    TYPE_ARTICLE = 1;
    TYPE_CE_ELEMENT = 2;

    connect() {

        super.connect();
        this.initAnimation();

    }

    resizeWindow() {

        if (this.animationElement !== undefined) {
            this.initAnimation();
        }

    }

    scrollWindow() {

        if (this.animationElement !== undefined) {
            this.processAnimation();
        }

    }

    isInAnimationViewport(element, offsetPercent = 0) {

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

    getAnimationXOffset(element, position = 'left') {

        let o = 0;
        const parentWidth = element.parentElement.offsetWidth;
        const elementWidth = element.offsetWidth;

        if (position === 'right') {
            o = parentWidth - elementWidth;
        } else if (position === 'center') {
            o = (parentWidth / 2) - (elementWidth / 2);
        }

        return o;

    }

    getAnimationYOffset(element, position = 'top') {

        let o = 0;
        const parentHeight = element.parentElement.offsetHeight;
        const elementHeight = element.offsetHeight;

        if (position === 'bottom') {
            o = parentHeight - elementHeight;
        } else if (position === 'center') {
            o = (parentHeight / 2) - (elementHeight / 2);
        }

        return o;

    }

    getSpeed(speed) {
        switch (speed) {
            case this.EFFECT_SPEED_SLOW:
                return this.EFFECT_SPEED_SLOW_VALUE;
            case this.EFFECT_SPEED_MIDDLE:
                return this.EFFECT_SPEED_MIDDLE_VALUE;
            case this.EFFECT_SPEED_FAST:
                return this.EFFECT_SPEED_FAST_VALUE;
            default:
                return this.EFFECT_SPEED_MIDDLE_VALUE;
        }
    }

    processAnimation() {

        if (this.animationElement !== undefined) {

            if (this.isInAnimationViewport(this.animationElement.node.parentElement, this.animationElement.viewport)) {

                cancelAnimationFrame(this.processAnimationsScheduled);
                this.processAnimationsScheduled = requestAnimationFrame(() => this.runEffect(this.animationElement));

            }

        }

    }

    animateElement(node, topValue, leftValue, speed) {

        // const startTime = performance.now();
        // const initialTop = parseInt(window.getComputedStyle(node).top, 10);
        // const initialLeft = parseInt(window.getComputedStyle(node).left, 10);
        // const deltaTop = topValue - initialTop;
        // const deltaLeft = leftValue - initialLeft;

        // function animate() {
        //     const elapsed = performance.now() - startTime;
        //     const progress = Math.min(elapsed / speed, 1);
        //
        //     node.style.top = (initialTop + deltaTop * progress) + 'px';
        //     node.style.left = (initialLeft + deltaLeft * progress) + 'px';
        //
        //     if (progress < 1) {
        //         requestAnimationFrame(animate);
        //     }
        // }
        //
        // requestAnimationFrame(animate);

        node.style.transition = `top ${speed}ms linear, left ${speed}ms linear`;
        node.style.top = topValue + 'px';
        node.style.left = leftValue + 'px';

    }

    runEffect(element) {

        if (element.triggered === false) {

            const speed = this.getSpeed(element.speed);

            element.node.style.opacity = 1;

            if (element.animateCssOptions !== '') {

                element.node.style.animationDuration = speed + 'ms';
                element.node.classList.add('animate__animated');
                element.node.classList.add('animate__' + element.animateCssOptions);

            }

            switch (element.effect) {
                case this.EFFECT_E1: {
                    this.animateElement(element.node, this.getAnimationYOffset(element.node, 'top'), this.getAnimationXOffset(element.node, 'left'), speed);
                    break;
                }
                case this.EFFECT_E2: {
                    this.animateElement(element.node, this.getAnimationYOffset(element.node, 'top'), this.getAnimationXOffset(element.node, 'center'), speed);
                    break;
                }
                case this.EFFECT_E3: {
                    this.animateElement(element.node, this.getAnimationYOffset(element.node, 'top'), this.getAnimationXOffset(element.node, 'right'), speed);
                    break;
                }
                case this.EFFECT_E4: {
                    this.animateElement(element.node, this.getAnimationYOffset(element.node, 'bottom'), this.getAnimationXOffset(element.node, 'left'), speed);
                    break;
                }
                case this.EFFECT_E5: {
                    this.animateElement(element.node, this.getAnimationYOffset(element.node, 'bottom'), this.getAnimationXOffset(element.node, 'center'), speed);
                    break;
                }
                case this.EFFECT_E6: {
                    this.animateElement(element.node, this.getAnimationYOffset(element.node, 'bottom'), this.getAnimationXOffset(element.node, 'right'), speed);
                    break;
                }
                case this.EFFECT_E7: {
                    this.animateElement(element.node, this.getAnimationYOffset(element.node, 'center'), this.getAnimationXOffset(element.node, 'left'), speed);
                    break;
                }
                case this.EFFECT_E8: {
                    this.animateElement(element.node, this.getAnimationYOffset(element.node, 'center'), this.getAnimationXOffset(element.node, 'center'), speed);
                    break;
                }
                case this.EFFECT_E9: {
                    this.animateElement(element.node, this.getAnimationYOffset(element.node, 'center'), this.getAnimationXOffset(element.node, 'right'), speed);
                    break;
                }
                default:
                    break;
            }

            element.triggered = true;

        }

    }

    prepareEffect(node, startposition) {

        switch (startposition) {
            case this.POSITION_S1:
                node.style.top = this.getAnimationYOffset(node, 'top') + 'px';
                node.style.left = this.getAnimationXOffset(node, 'left') + 'px';
                break;
            case this.POSITION_S2:
                node.style.top = this.getAnimationYOffset(node, 'top') + 'px';
                node.style.left = this.getAnimationXOffset(node, 'center') + 'px';
                break;
            case this.POSITION_S3:
                node.style.top = this.getAnimationYOffset(node, 'top') + 'px';
                node.style.left = this.getAnimationXOffset(node, 'right') + 'px';
                break;
            case this.POSITION_S4:
                node.style.top = this.getAnimationYOffset(node, 'bottom') + 'px';
                node.style.left = this.getAnimationXOffset(node, 'left') + 'px';
                break;
            case this.POSITION_S5:
                node.style.top = this.getAnimationYOffset(node, 'bottom') + 'px';
                node.style.left = this.getAnimationXOffset(node, 'center') + 'px';
                break;
            case this.POSITION_S6:
                node.style.top = this.getAnimationYOffset(node, 'bottom') + 'px';
                node.style.left = this.getAnimationXOffset(node, 'right') + 'px';
                break;
            case this.POSITION_S7:
                node.style.top = this.getAnimationYOffset(node, 'center') + 'px';
                node.style.left = this.getAnimationXOffset(node, 'left') + 'px';
                break;
            case this.POSITION_S8:
                node.style.top = this.getAnimationYOffset(node, 'center') + 'px';
                node.style.left = this.getAnimationXOffset(node, 'center') + 'px';
                break;
            case this.POSITION_S9:
                node.style.top = this.getAnimationYOffset(node, 'center') + 'px';
                node.style.left = this.getAnimationXOffset(node, 'right') + 'px';
                break;
            default:
                break;
        }

    }

    initAnimation() {

        const node = this.element;

        const effect = this.effectValue;
        const startposition = this.startpositionValue;
        const speed = this.speedValue;
        const viewport = this.viewportValue;
        const hide = this.hideValue;
        const ignoreMotionReduce = this.ignoremotionreduceValue;
        const animateCssOptions = this.animationcssValue;
        const type = this.typeValue;

        if (hide === '1') {
            node.style.opacity = 0;
        }

        if (type === '1') {

            this.prepareEffect(node, startposition);

            let push = true;

            if (ignoreMotionReduce !== '1') {

                const mediaQueryMotionReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
                if (!mediaQueryMotionReduce || mediaQueryMotionReduce.matches === true) {

                    push = false;
                    node.style.display = 'none';

                }

            }

            if (push === true) {

                this.animationElement = {
                    node: node,
                    effect: effect,
                    startposition: startposition,
                    speed: speed,
                    viewport: viewport,
                    animateCssOptions: animateCssOptions,
                    type: this.TYPE_ARTICLE,
                    triggered: false
                };

            }

        } else if (type === '2') {

            this.animationElement = {
                node: node,
                effect: '',
                startposition: '',
                speed: speed,
                viewport: viewport,
                animateCssOptions: animateCssOptions,
                type: this.TYPE_CE_ELEMENT,
                triggered: false
            };

        }

        if (this.animationElement !== undefined && ('requestAnimationFrame' in window)) {
            this.processAnimation();
        }

    }


}