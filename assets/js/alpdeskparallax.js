import {Application} from '@hotwired/stimulus';
import ParallaxController from './controllers/parallax-controller';

import '../css/alpdeskparallax.css';

const alpdeskParallaxApplication = Application.start();
alpdeskParallaxApplication.register('parallax', ParallaxController);

