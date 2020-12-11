<?php

use Alpdesk\AlpdeskParallax\Utils\AlpdeskParallaxUtils;

$GLOBALS['TL_DCA']['tl_alpdeskanimations'] = [
    'config' => [
        'dataContainer' => 'Table',
        'ctable' => ['tl_content'],
        'switchToEdit' => true,
        'enableVersioning' => true,
        'sql' => [
            'keys' => [
                'id' => 'primary',
                'title' => 'index'
            ]
        ]
    ],
    'list' => [
        'sorting' => [
            'mode' => 2,
            'fields' => ['title ASC'],
            'flag' => 1,
            'panelLayout' => 'filter,search,limit'
        ],
        'label' => [
            'fields' => ['title'],
            'showColumns' => true,
        ],
        'global_operations' => [
            'all' => [
                'label' => &$GLOBALS['TL_LANG']['MSC']['all'],
                'href' => 'act=select',
                'class' => 'header_edit_all',
                'attributes' => 'onclick="Backend.getScrollOffset()" accesskey="e"'
            ]
        ],
        'operations' => [
            'edit' => [
                'label' => &$GLOBALS['TL_LANG']['tl_alpdeskanimations']['edit'],
                'href' => 'table=tl_content',
                'icon' => 'edit.gif'
            ],
            'editheader' => [
                'label' => &$GLOBALS['TL_LANG']['tl_alpdeskanimations']['editheader'],
                'href' => 'act=edit',
                'icon' => 'header.gif',
            ],
            'copy' => [
                'label' => &$GLOBALS['TL_LANG']['tl_alpdeskanimations']['copy'],
                'href' => 'act=copy',
                'icon' => 'copy.gif',
            ],
            'toggle' => [
                'label' => &$GLOBALS['TL_LANG']['tl_alpdeskanimations']['toggle'],
                'icon' => 'visible.gif',
                'attributes' => 'onclick="Backend.getScrollOffset();"',
                'button_callback' => ['Alpdesk\\AlpdeskParallax\\Utils\\AlpdeskParallaxUtils', 'toggleIcon']
            ],
            'delete' => [
                'label' => &$GLOBALS['TL_LANG']['tl_alpdeskanimations']['delete'],
                'href' => 'act=delete',
                'icon' => 'delete.gif',
                'attributes' => 'onclick="if(!confirm(\'' . $GLOBALS['TL_LANG']['MSC']['deleteConfirm'] . '\'))return false;Backend.getScrollOffset()"',
            ],
        ]
    ],
    'palettes' => [
        'default' => 'title,published;ignoreReducedAnimationMotion;animation_viewport;animation_hide_before_viewport,animation_zindex;animation_startposition,animation_speed,animation_effect,animation_animatecssoptions;cssID'
    ],
    'fields' => [
        'id' => [
            'sql' => "int(10) unsigned NOT NULL auto_increment"
        ],
        'tstamp' => [
            'sql' => "int(10) unsigned NOT NULL default '0'"
        ],
        'title' => [
            'label' => &$GLOBALS['TL_LANG']['tl_alpdeskanimations']['title'],
            'exclude' => true,
            'search' => true,
            'sorting' => true,
            'inputType' => 'text',
            'eval' => ['mandatory' => true, 'tl_class' => 'w50', 'maxlength' => 250],
            'sql' => "varchar(250) NOT NULL default ''"
        ],
        'published' => [
            'label' => &$GLOBALS['TL_LANG']['tl_alpdeskanimations']['published'],
            'exclude' => true,
            'inputType' => 'checkbox',
            'eval' => ['doNotCopy' => true, 'tl_class' => 'w50 m12'],
            'sql' => "char(1) NOT NULL default ''"
        ],
        'ignoreReducedAnimationMotion' => [
            'label' => &$GLOBALS['TL_LANG']['tl_alpdeskanimations']['ignoreReducedAnimationMotion'],
            'exclude' => true,
            'inputType' => 'checkbox',
            'eval' => ['tl_class' => 'clr'],
            'sql' => "char(1) NOT NULL default ''"
        ],
        'animation_viewport' => [
            'label' => &$GLOBALS['TL_LANG']['tl_alpdeskanimations']['animation_viewport'],
            'exclude' => true,
            'inputType' => 'select',
            'options' => &$GLOBALS['TL_LANG']['tl_alpdeskanimations']['animation_viewport_options'],
            'eval' => ['tl_class' => 'w50'],
            'sql' => "varchar(20) NOT NULL default ''"
        ],
        'animation_hide_before_viewport' => [
            'label' => &$GLOBALS['TL_LANG']['tl_alpdeskanimations']['animation_hide_before_viewport'],
            'exclude' => true,
            'inputType' => 'checkbox',
            'eval' => ['tl_class' => 'w50'],
            'sql' => "char(1) NOT NULL default ''"
        ],
        'animation_zindex' => [
            'label' => &$GLOBALS['TL_LANG']['tl_alpdeskanimations']['animation_zindex'],
            'exclude' => true,
            'inputType' => 'checkbox',
            'eval' => ['tl_class' => 'w50'],
            'sql' => "char(1) NOT NULL default ''"
        ],
        'animation_startposition' => [
            'label' => &$GLOBALS['TL_LANG']['tl_alpdeskanimations']['animation_startposition'],
            'exclude' => true,
            'inputType' => 'select',
            'options' => &$GLOBALS['TL_LANG']['tl_alpdeskanimations']['animation_startposition_options'],
            'eval' => ['tl_class' => 'clr'],
            'sql' => "varchar(20) NOT NULL default ''"
        ],
        'animation_speed' => [
            'label' => &$GLOBALS['TL_LANG']['tl_alpdeskanimations']['animation_speed'],
            'exclude' => true,
            'inputType' => 'select',
            'options' => &$GLOBALS['TL_LANG']['tl_alpdeskanimations']['animation_speed_options'],
            'eval' => ['tl_class' => 'w50'],
            'sql' => "varchar(20) NOT NULL default ''"
        ],
        'animation_effect' => [
            'label' => &$GLOBALS['TL_LANG']['tl_alpdeskanimations']['animation_effect'],
            'exclude' => true,
            'inputType' => 'select',
            'options' => &$GLOBALS['TL_LANG']['tl_alpdeskanimations']['animation_effect_options'],
            'eval' => ['includeBlankOption' => true, 'tl_class' => 'w50'],
            'sql' => "varchar(20) NOT NULL default ''"
        ],
        'animation_animatecssoptions' => [
            'label' => &$GLOBALS['TL_LANG']['tl_alpdeskanimations']['animation_animatecssoptions'],
            'exclude' => true,
            'inputType' => 'select',
            'options' => AlpdeskParallaxUtils::$animationCssOptions,
            'eval' => ['includeBlankOption' => true, 'multiple' => false, 'tl_class' => 'clr'],
            'sql' => "varchar(50) NOT NULL default ''"
        ],
        'cssID' => [
            'exclude' => true,
            'inputType' => 'text',
            'eval' => ['multiple' => true, 'size' => 2, 'tl_class' => 'w50 clr'],
            'sql' => "varchar(255) NOT NULL default ''"
        ],
    ]
];
