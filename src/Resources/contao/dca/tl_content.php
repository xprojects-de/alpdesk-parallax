<?php

use Contao\Input;
use Contao\DataContainer;
use Contao\Controller;
use Contao\CoreBundle\DataContainer\PaletteManipulator;
use Alpdesk\AlpdeskParallax\Utils\AlpdeskParallaxUtils;

if (Input::get('do') === 'alpdeskanimations') {
    $GLOBALS['TL_DCA']['tl_content']['config']['ptable'] = 'tl_alpdeskanimations';
}

Controller::loadLanguageFile('tl_alpdeskanimations');

$GLOBALS['TL_DCA']['tl_content']['config']['onload_callback'][] = static function (DataContainer $dc): void {
    foreach ($GLOBALS['TL_DCA'][$dc->table]['palettes'] as $key => $palette) {
        PaletteManipulator::create()
            ->addLegend('animationeffect_legend', 'expert_legend', PaletteManipulator::POSITION_AFTER, true)
            ->addField('hasAnimationeffects', 'animationeffect_legend', PaletteManipulator::POSITION_APPEND)
            ->applyToPalette($key, $dc->table);
    }
};

$GLOBALS['TL_DCA']['tl_content']['palettes']['__selector__'][] = 'hasAnimationeffects';
$GLOBALS['TL_DCA']['tl_content']['subpalettes']['hasAnimationeffects'] = 'animation_hide_before_viewport,animation_viewport,animation_speed,animation_animatecssoptions';

$GLOBALS['TL_DCA']['tl_content']['fields']['hasAnimationeffects'] = [
    'label' => &$GLOBALS['TL_LANG']['tl_content']['hasAnimationeffects'],
    'exclude' => true,
    'inputType' => 'checkbox',
    'eval' => ['submitOnChange' => true],
    'sql' => "char(1) NOT NULL default ''"
];

$GLOBALS['TL_DCA']['tl_content']['fields']['animation_viewport'] = [
    'label' => &$GLOBALS['TL_LANG']['tl_alpdeskanimations']['animation_viewport'],
    'exclude' => true,
    'inputType' => 'select',
    'options' => &$GLOBALS['TL_LANG']['tl_alpdeskanimations']['animation_viewport_options'],
    'eval' => ['tl_class' => 'w50'],
    'sql' => "varchar(20) NOT NULL default ''"
];

$GLOBALS['TL_DCA']['tl_content']['fields']['animation_hide_before_viewport'] = [
    'label' => &$GLOBALS['TL_LANG']['tl_alpdeskanimations']['animation_hide_before_viewport'],
    'exclude' => true,
    'inputType' => 'checkbox',
    'eval' => ['tl_class' => 'clr'],
    'sql' => "char(1) NOT NULL default ''"
];

$GLOBALS['TL_DCA']['tl_content']['fields']['animation_speed'] = [
    'label' => &$GLOBALS['TL_LANG']['tl_alpdeskanimations']['animation_speed'],
    'exclude' => true,
    'inputType' => 'select',
    'options' => &$GLOBALS['TL_LANG']['tl_alpdeskanimations']['animation_speed_options'],
    'eval' => ['tl_class' => 'w50'],
    'sql' => "varchar(20) NOT NULL default ''"
];

$GLOBALS['TL_DCA']['tl_content']['fields']['animation_animatecssoptions'] = [
    'label' => &$GLOBALS['TL_LANG']['tl_alpdeskanimations']['animation_animatecssoptions'],
    'exclude' => true,
    'inputType' => 'select',
    'options' => AlpdeskParallaxUtils::$animationCssOptions,
    'eval' => ['includeBlankOption' => true, 'multiple' => false, 'tl_class' => 'clr'],
    'sql' => "varchar(50) NOT NULL default ''"
];
