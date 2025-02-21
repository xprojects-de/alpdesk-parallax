import {Application} from '@hotwired/stimulus';
import AnimationController from './controllers/animation-controller';

import '../css/animate.min.css';
import '../css/alpdeskanimationeffects.css';

const alpdeskAnimationApplication = Application.start();
alpdeskAnimationApplication.register('animation', AnimationController);


