<?php

declare(strict_types=1);

namespace Alpdesk\AlpdeskParallax\Utils;

use Contao\Backend;
use Contao\Controller;
use Contao\Image;
use Contao\Input;
use Contao\Database;
use Contao\StringUtil;
use Contao\System;

class AlpdeskParallaxUtils extends Backend
{
    public static array $animationCssOptions = [
        'Attention Seekers' => [
            'bounce',
            'flash',
            'pulse',
            'rubberBand',
            'shakeX',
            'shakeY',
            'headShake',
            'swing',
            'tada',
            'wobble',
            'jello',
            'heartBeat',
        ],
        'Back entrances' => [
            'backInDown',
            'backInLeft',
            'backInRight',
            'backInUp',
        ],
        'Back exits' => [
            'backOutDown',
            'backOutLeft',
            'backOutRight',
            'backOutUp',
        ],
        'Bouncing entrances' => [
            'bounceIn',
            'bounceInDown',
            'bounceInLeft',
            'bounceInRight',
            'bounceInUp',
        ],
        'Bouncing exits' => [
            'bounceOut',
            'bounceOutDown',
            'bounceOutLeft',
            'bounceOutRight',
            'bounceOutUp',
        ],
        'Fading Entrances' => [
            'fadeIn',
            'fadeInDown',
            'fadeInDownBig',
            'fadeInLeft',
            'fadeInLeftBig',
            'fadeInRight',
            'fadeInRightBig',
            'fadeInUp',
            'fadeInTopLeft',
            'fadeInTopRight',
            'fadeInBottomLeft',
            'fadeInBottomRight',
        ],
        'Fading Exits' => [
            'fadeOut',
            'fadeOutDown',
            'fadeOutDownBig',
            'fadeOutLeft',
            'fadeOutLeftBig',
            'fadeOutRight',
            'fadeOutRightBig',
            'fadeOutUp',
            'fadeOutUpBig',
            'fadeOutTopLeft',
            'fadeOutTopRight',
            'fadeOutBottomRight',
            'fadeOutBottomLeft',
        ],
        'Flippers' => [
            'flip',
            'flipInX',
            'flipInY',
            'flipOutX',
            'flipOutY',
        ],
        'Lightspeed' => [
            'lightSpeedInRight',
            'lightSpeedInLeft',
            'lightSpeedOutRight',
            'lightSpeedOutLeft',
        ],
        'Rotating Entrances' => [
            'rotateIn',
            'rotateInDownLeft',
            'rotateInDownRight',
            'rotateInUpLeft',
            'rotateInUpRight',
        ],
        'Rotating Exits' => [
            'rotateOut',
            'rotateOutDownLeft',
            'rotateOutDownRight',
            'rotateOutUpLeft',
            'rotateOutUpRight',
        ],
        'Sliding Entrances' => [
            'slideInUp',
            'slideInDown',
            'slideInLeft',
            'slideInRight',
        ],
        'Sliding Exits' => [
            'slideOutUp',
            'slideOutDown',
            'slideOutLeft',
            'slideOutRight',
        ],
        'Zooming Entrances' => [
            'zoomIn',
            'zoomInDown',
            'zoomInLeft',
            'zoomInRight',
            'zoomInUp',
        ],
        'Zooming Exits' => [
            'zoomOut',
            'zoomOutDown',
            'zoomOutLeft',
            'zoomOutRight',
            'zoomOutUp',
        ],
        'Specials' => [
            'hinge',
            'jackInTheBox',
            'rollIn',
            'rollOut',
        ],
    ];

    /**
     * @param $row
     * @param $href
     * @param $label
     * @param $title
     * @param $icon
     * @param $attributes
     * @return string
     */
    public function toggleIcon($row, $href, $label, $title, $icon, $attributes): string
    {
        if (Input::get('tid') !== null && Input::get('tid') !== '') {

            Database::getInstance()->prepare("UPDATE tl_" . Input::get('do') . " SET tstamp=" . time() . ", published='" . (Input::get('state') ? 1 : '') . "' WHERE id=?")->execute(Input::get('tid'));
            Controller::redirect(System::getReferer());

        }

        $href .= '&amp;tid=' . $row['id'] . '&amp;state=' . ($row['published'] ? '' : 1);
        if (!$row['published']) {
            $icon = 'invisible.gif';
        }

        return '<a href="' . self::addToUrl($href) . '" title="' . StringUtil::specialchars($title) . '" ' . $attributes . '>' . Image::getHtml($icon, $label) . '</a> ';

    }

}
