<?php

declare(strict_types=1);

use Contao\CoreBundle\DataContainer\PaletteManipulator;
use Contao\System;
use Contao\BackendUser;

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
    'exclude' => true,
    'inputType' => 'checkbox',
    'eval' => ['submitOnChange' => true],
    'sql' => "char(1) NOT NULL default ''"
];

$GLOBALS['TL_DCA']['tl_article']['fields']['singleSRC'] = [
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
    'options_callback' => static function () {
        return System::getContainer()->get('contao.image.sizes')->getOptionsForUser(BackendUser::getInstance());
    },
    'sql' => "varchar(64) NOT NULL default ''"
];

$GLOBALS['TL_DCA']['tl_article']['fields']['sizemodus'] = [
    'exclude' => true,
    'inputType' => 'select',
    'options' => ['auto', 'cover'],
    'reference' => &$GLOBALS['TL_LANG']['tl_article']['sizemodus_options'],
    'eval' => ['tl_class' => 'clr w50'],
    'sql' => "varchar(64) NOT NULL default ''"
];

$GLOBALS['TL_DCA']['tl_article']['fields']['hAlign'] = [
    'exclude' => true,
    'inputType' => 'select',
    'options' => ['left', 'center', 'right'],
    'reference' => &$GLOBALS['TL_LANG']['tl_article']['hAlign_options'],
    'eval' => ['tl_class' => 'clr w50'],
    'sql' => "varchar(64) NOT NULL default ''"
];

$GLOBALS['TL_DCA']['tl_article']['fields']['vAlign'] = [
    'exclude' => true,
    'inputType' => 'select',
    'options' => ['top', 'center', 'bottom'],
    'reference' => &$GLOBALS['TL_LANG']['tl_article']['vAlign_options'],
    'eval' => ['tl_class' => 'w50'],
    'sql' => "varchar(64) NOT NULL default ''"
];

$GLOBALS['TL_DCA']['tl_article']['fields']['vParallax'] = [
    'exclude' => true,
    'inputType' => 'select',
    'options' => ['left', 'right'],
    'reference' => &$GLOBALS['TL_LANG']['tl_article']['vParallax_options'],
    'eval' => ['tl_class' => 'w50', 'includeBlankOption' => true],
    'sql' => "varchar(64) NOT NULL default ''"
];

$GLOBALS['TL_DCA']['tl_article']['fields']['isParallax'] = [
    'exclude' => true,
    'inputType' => 'checkbox',
    'eval' => ['tl_class' => 'clr w50 m12'],
    'sql' => "char(1) NOT NULL default ''"
];

$GLOBALS['TL_DCA']['tl_article']['fields']['hasAnimationeffects'] = [
    'exclude' => true,
    'inputType' => 'checkbox',
    'eval' => ['submitOnChange' => true],
    'sql' => "char(1) NOT NULL default ''"
];

$GLOBALS['TL_DCA']['tl_article']['fields']['alpdeskanimation'] = [
    'exclude' => true,
    'inputType' => 'checkbox',
    'foreignKey' => 'tl_alpdeskanimations.title',
    'eval' => ['multiple' => true, 'tl_class' => 'clr'],
    'sql' => "mediumtext NULL"
];

