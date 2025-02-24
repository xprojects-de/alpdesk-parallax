import {Application} from '@hotwired/stimulus';
import ParallaxController from './controllers/parallax-controller';
import AnimationController from './controllers/animation-controller';

import '../css/animate.min.css';
import '../css/alpdeskparallax.css';

const alpdeskParallaxApplication = Application.start();
alpdeskParallaxApplication.register('parallax', ParallaxController);
alpdeskParallaxApplication.register('animation', AnimationController);

