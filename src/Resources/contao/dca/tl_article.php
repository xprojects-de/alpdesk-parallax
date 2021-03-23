<?php

use Contao\CoreBundle\DataContainer\PaletteManipulator;
use Contao\System;

PaletteManipulator::create()
    ->addLegend('backgroundparallaximage_legend', 'syndication_legend', PaletteManipulator::POSITION_BEFORE, true)
    ->addField('hasParallaxBackgroundImage', 'backgroundparallaximage_legend', PaletteManipulator::POSITION_APPEND)
    ->applyToPalette('default', 'tl_article');

PaletteManipulator::create()
    ->addLegend('animationeffect_legend', 'syndication_legend', PaletteManipulator::POSITION_BEFORE, true)
    ->addField('hasAnimationeffects', 'animationeffect_legend', PaletteManipulator::POSITION_APPEND)
    ->applyToPalette('default', 'tl_article');

$GLOBALS['TL_DCA']['tl_article']['palettes']['__selector__'][] = 'hasParallaxBackgroundImage';
$GLOBALS['TL_DCA']['tl_article']['subpalettes']['hasParallaxBackgroundImage'] = 'singleSRC,size,sizemodus,hAlign,vAlign,vParallax,isParallax';

$GLOBALS['TL_DCA']['tl_article']['palettes']['__selector__'][] = 'hasAnimationeffects';
$GLOBALS['TL_DCA']['tl_article']['subpalettes']['hasAnimationeffects'] = 'alpdeskanimation';

$GLOBALS['TL_DCA']['tl_article']['fields']['hasParallaxBackgroundImage'] = [
    'label' => &$GLOBALS['TL_LANG']['tl_article']['hasParallaxBackgroundImage'],
    'exclude' => true,
    'inputType' => 'checkbox',
    'eval' => ['submitOnChange' => true],
    'sql' => "char(1) NOT NULL default ''"
];

$GLOBALS['TL_DCA']['tl_article']['fields']['singleSRC'] = [
    'label' => &$GLOBALS['TL_LANG']['tl_article']['singleSRC'],
    'exclude' => true,
    'inputType' => 'fileTree',
    'eval' => [
        'filesOnly' => true,
        'fieldType' => 'radio',
        'tl_class' => 'clr',
    ],
    'sql' => "binary(16) NULL"
];

$GLOBALS['TL_DCA']['tl_article']['fields']['size'] = [
    'label' => &$GLOBALS['TL_LANG']['tl_article']['size'],
    'exclude' => true,
    'inputType' => 'imageSize',
    'reference' => &$GLOBALS['TL_LANG']['MSC'],
    'eval' => [
        'rgxp' => 'natural',
        'includeBlankOption' => true,
        'nospace' => true,
        'helpwizard' => true,
        'tl_class' => 'clr w50',
    ],
    'options_callback' => function () {
        return System::getContainer()->get('contao.image.image_sizes')->getOptionsForUser(BackendUser::getInstance());
    },
    'sql' => "varchar(64) NOT NULL default ''"
];

$GLOBALS['TL_DCA']['tl_article']['fields']['sizemodus'] = [
    'label' => &$GLOBALS['TL_LANG']['tl_article']['sizemodus'],
    'exclude' => true,
    'inputType' => 'select',
    'options' => ['auto', 'cover'],
    'reference' => &$GLOBALS['TL_LANG']['tl_article']['sizemodus_options'],
    'eval' => ['tl_class' => 'clr w50'],
    'sql' => "varchar(64) NOT NULL default ''"
];

$GLOBALS['TL_DCA']['tl_article']['fields']['hAlign'] = [
    'label' => &$GLOBALS['TL_LANG']['tl_article']['hAlign'],
    'exclude' => true,
    'inputType' => 'select',
    'options' => ['left', 'center', 'right'],
    'reference' => &$GLOBALS['TL_LANG']['tl_article']['hAlign_options'],
    'eval' => ['tl_class' => 'clr w50'],
    'sql' => "varchar(64) NOT NULL default ''"
];

$GLOBALS['TL_DCA']['tl_article']['fields']['vAlign'] = [
    'label' => &$GLOBALS['TL_LANG']['tl_article']['vAlign'],
    'exclude' => true,
    'inputType' => 'select',
    'options' => ['top', 'center', 'bottom'],
    'reference' => &$GLOBALS['TL_LANG']['tl_article']['vAlign_options'],
    'eval' => ['tl_class' => 'w50'],
    'sql' => "varchar(64) NOT NULL default ''"
];

$GLOBALS['TL_DCA']['tl_article']['fields']['vParallax'] = [
    'label' => &$GLOBALS['TL_LANG']['tl_article']['vParallax'],
    'exclude' => true,
    'inputType' => 'select',
    'options' => ['left', 'right'],
    'reference' => &$GLOBALS['TL_LANG']['tl_article']['vParallax_options'],
    'eval' => ['tl_class' => 'w50', 'includeBlankOption' => true],
    'sql' => "varchar(64) NOT NULL default ''"
];

$GLOBALS['TL_DCA']['tl_article']['fields']['isParallax'] = [
    'label' => &$GLOBALS['TL_LANG']['tl_article']['isParallax'],
    'exclude' => true,
    'inputType' => 'checkbox',
    'eval' => ['tl_class' => 'clr w50 m12'],
    'sql' => "char(1) NOT NULL default ''"
];

$GLOBALS['TL_DCA']['tl_article']['fields']['hasAnimationeffects'] = [
    'label' => &$GLOBALS['TL_LANG']['tl_article']['hasAnimationeffects'],
    'exclude' => true,
    'inputType' => 'checkbox',
    'eval' => ['submitOnChange' => true],
    'sql' => "char(1) NOT NULL default ''"
];

$GLOBALS['TL_DCA']['tl_article']['fields']['alpdeskanimation'] = [
    'label' => &$GLOBALS['TL_LANG']['tl_article']['alpdeskanimation'],
    'exclude' => true,
    'inputType' => 'checkbox',
    'foreignKey' => 'tl_alpdeskanimations.title',
    'eval' => ['multiple' => true, 'tl_class' => 'clr'],
    'sql' => "mediumtext NULL"
];

