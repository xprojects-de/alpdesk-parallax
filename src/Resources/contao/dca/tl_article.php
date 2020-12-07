<?php

use Contao\CoreBundle\DataContainer\PaletteManipulator;
use Contao\System;

PaletteManipulator::create()
        ->addLegend('backgroundparallaximage_legend', 'syndication_legend', PaletteManipulator::POSITION_BEFORE, true)
        ->addField('hasParallaxBackgroundImage', 'backgroundparallaximage_legend', PaletteManipulator::POSITION_APPEND)
        ->applyToPalette('default', 'tl_article');

$GLOBALS['TL_DCA']['tl_article']['palettes']['__selector__'][] = 'hasParallaxBackgroundImage';
$GLOBALS['TL_DCA']['tl_article']['subpalettes']['hasParallaxBackgroundImage'] = 'singleSRC,size,sizemodus,hAlign,vAlign,isParallax';

$GLOBALS['TL_DCA']['tl_article']['fields']['hasParallaxBackgroundImage'] = array
    (
    'label' => &$GLOBALS['TL_LANG']['tl_article']['hasParallaxBackgroundImage'],
    'exclude' => true,
    'inputType' => 'checkbox',
    'eval' => array(
        'submitOnChange' => true,
    ),
    'sql' => "char(1) NOT NULL default ''"
);

$GLOBALS['TL_DCA']['tl_article']['fields']['singleSRC'] = array
    (
    'label' => &$GLOBALS['TL_LANG']['tl_article']['singleSRC'],
    'exclude' => true,
    'inputType' => 'fileTree',
    'eval' => array(
        'filesOnly' => true,
        'fieldType' => 'radio',
        'tl_class' => 'clr',
    ),
    'sql' => "binary(16) NULL"
);

$GLOBALS['TL_DCA']['tl_article']['fields']['size'] = array
    (
    'label' => &$GLOBALS['TL_LANG']['tl_article']['size'],
    'exclude' => true,
    'inputType' => 'imageSize',
    'reference' => &$GLOBALS['TL_LANG']['MSC'],
    'eval' => array(
        'rgxp' => 'natural',
        'includeBlankOption' => true,
        'nospace' => true,
        'helpwizard' => true,
        'tl_class' => 'clr w50',
    ),
    'options_callback' => function () {
      return System::getContainer()->get('contao.image.image_sizes')->getOptionsForUser(BackendUser::getInstance());
    },
    'sql' => "varchar(64) NOT NULL default ''"
);

$GLOBALS['TL_DCA']['tl_article']['fields']['sizemodus'] = array
    (
    'label' => &$GLOBALS['TL_LANG']['tl_article']['sizemodus'],
    'exclude' => true,
    'inputType' => 'select',
    'options' => array('auto', 'cover'),
    'reference' => &$GLOBALS['TL_LANG']['tl_article']['sizemodus_options'],
    'eval' => array('tl_class' => 'clr w50'),
    'sql' => "varchar(64) NOT NULL default ''"
);

$GLOBALS['TL_DCA']['tl_article']['fields']['hAlign'] = array
    (
    'label' => &$GLOBALS['TL_LANG']['tl_article']['hAlign'],
    'exclude' => true,
    'inputType' => 'select',
    'options' => array('left', 'center', 'right'),
    'reference' => &$GLOBALS['TL_LANG']['tl_article']['hAlign_options'],
    'eval' => array('tl_class' => 'clr w50'),
    'sql' => "varchar(64) NOT NULL default ''"
);

$GLOBALS['TL_DCA']['tl_article']['fields']['vAlign'] = array
    (
    'label' => &$GLOBALS['TL_LANG']['tl_article']['vAlign'],
    'exclude' => true,
    'inputType' => 'select',
    'options' => array('top', 'center', 'bottom'),
    'reference' => &$GLOBALS['TL_LANG']['tl_article']['vAlign_options'],
    'eval' => array('tl_class' => 'w50'),
    'sql' => "varchar(64) NOT NULL default ''"
);

$GLOBALS['TL_DCA']['tl_article']['fields']['isParallax'] = array
    (
    'label' => &$GLOBALS['TL_LANG']['tl_article']['isParallax'],
    'exclude' => true,
    'inputType' => 'checkbox',
    'eval' => array(
        'tl_class' => 'clr w50 m12'
    ),
    'sql' => "char(1) NOT NULL default ''"
);
