import {Controller} from '@hotwired/stimulus';

export default class ParallaxController extends Controller {

    static values = {
        isparallax: String,
        src: String,
        srcheight: String,
        srcwidth: String,
        sizemodus: String,
        valign: String,
        halign: String,
        vparallax: String
    }

    parallaxElement = undefined;
    processParallaxScheduled;
    factor = 0.25;

    connect() {

        super.connect();
        this.initParallax();

    }

    resizeWindow() {

        if (this.parallaxElement !== undefined) {
            this.initParallax();
        }

    }

    scrollWindow() {

        if (this.parallaxElement !== undefined) {
            this.scrollParallax();
        }

    }

    isInParallaxViewport(element) {

        const elementTop = element.getBoundingClientRect().top + window.scrollY;
        const elementBottom = elementTop + element.offsetHeight;
        const viewportTop = window.scrollY;
        const viewportBottom = viewportTop + window.innerHeight;

        return elementBottom > viewportTop && elementTop < viewportBottom;

    }

    getParallaxScrollOffset(element) {

        const elementTop = element.getBoundingClientRect().top + window.scrollY;
        let diff = elementTop - window.innerHeight;

        return diff < 0 ? 0 : diff;

    }

    prepareBackgroundYAlign(nodeHeight, srcHeight, vAlign, sizeModus) {

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

    scrollParallax() {

        if (
            this.parallaxElement !== undefined &&
            this.isparallaxValue === '1' &&
            this.isInParallaxViewport(this.parallaxElement.parent)
        ) {

            cancelAnimationFrame(this.processParallaxScheduled);
            this.processParallaxScheduled = requestAnimationFrame(() => this.setPosition(this.parallaxElement));

        }

    }

    setPosition(element) {

        if (element.parent.getBoundingClientRect().top > window.innerHeight) {
            return;
        }

        const scrollOffset = window.scrollY - this.getParallaxScrollOffset(element.parent);
        let motion = element.givenVAlign + (this.factor * scrollOffset);

        if (element.vAlign === 'bottom' && element.sizeModus !== 'cover') {
            motion = element.givenVAlign - (this.factor * scrollOffset);
        }

        element.node.style.backgroundPositionY = motion + 'px';

        let motion_h = element.givenHAlign;
        if (element.givenVParallax === 'left' && element.hAlign !== 'center') {
            motion_h = (-motion) + 'px';
        } else if (element.givenVParallax === 'right' && element.hAlign !== 'center') {
            motion_h = (window.innerWidth - motion) + 'px';
        }

        element.node.style.backgroundPositionX = motion_h;

    }

    initParallax() {

        const node = this.element;

        const parallaxActive = this.isparallaxValue;
        const sizeModus = this.sizemodusValue;
        const hAlign = this.halignValue;
        const vAlign = this.valignValue;
        const src = this.srcValue;
        const srcHeight = this.srcheightValue;

        node.style.backgroundImage = `url(${src})`;
        node.style.backgroundSize = sizeModus;

        if (parallaxActive === '1' && ('requestAnimationFrame' in window)) {

            const elementH = node.parentElement.offsetHeight;
            let coverH = sizeModus === 'cover' ? elementH + (elementH * this.factor) + (this.factor * window.innerHeight) : 0;

            if (sizeModus === 'cover') {

                node.style.height = coverH + 'px';
                node.style.top = -(coverH - elementH) + 'px';
                node.style.backgroundPositionY = '0%';

            }

            this.valignValue = this.prepareBackgroundYAlign(node.offsetHeight, srcHeight, vAlign, sizeModus).toString();
            this.halignValue = hAlign;

            this.parallaxElement = {
                node: node,
                parent: node.parentElement,
                vAlign: vAlign,
                hAlign: hAlign,
                sizeModus: sizeModus,
                coverH: coverH,
                elementH: elementH,
                givenVAlign: this.valignValue,
                givenHAlign: this.halignValue,
                givenVParallax: this.vparallaxValue,
            };

            this.scrollParallax();

        } else {

            node.style.backgroundPositionX = hAlign;
            node.style.backgroundPositionY = vAlign;

        }

    }

}