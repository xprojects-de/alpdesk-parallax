<?php

declare(strict_types=1);

use Alpdesk\AlpdeskParallax\Utils\AlpdeskParallaxUtils;
use Contao\DataContainer;
use Contao\DC_Table;

$GLOBALS['TL_DCA']['tl_alpdeskanimations'] = [
    'config' => [
        'dataContainer' => DC_Table::class,
        'ctable' => ['tl_content'],
        'switchToEdit' => true,
        'enableVersioning' => true,
        'sql' => [
            'keys' => [
                'id' => 'primary',
                'title' => 'index',
                'published' => 'index'
            ]
        ]
    ],
    'list' => [
        'sorting' => [
            'mode' => DataContainer::MODE_SORTABLE,
            'fields' => ['title ASC'],
            'flag' => DataContainer::SORT_INITIAL_LETTER_ASC,
            'panelLayout' => 'filter,search,limit'
        ],
        'label' => [
            'fields' => ['title'],
            'showColumns' => true,
        ],
        'global_operations' => [
            'all' => [
                'href' => 'act=select',
                'class' => 'header_edit_all',
                'attributes' => 'onclick="Backend.getScrollOffset()" accesskey="e"'
            ]
        ],
        'operations' => [
            'edit' => [
                'href' => 'table=tl_content',
                'icon' => 'edit.gif'
            ],
            'editheader' => [
                'href' => 'act=edit',
                'icon' => 'header.gif',
            ],
            'copy',
            'toggle' => [
                'href' => 'act=toggle&amp;field=published',
                'icon' => 'visible.svg',
                'showInHeader' => true
            ],
            'delete'
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
            'exclude' => true,
            'search' => true,
            'sorting' => true,
            'inputType' => 'text',
            'eval' => ['mandatory' => true, 'tl_class' => 'w50', 'maxlength' => 250],
            'sql' => "varchar(250) NOT NULL default ''"
        ],
        'published' => [
            'toggle' => true,
            'exclude' => true,
            'flag' => DataContainer::SORT_INITIAL_LETTER_ASC,
            'inputType' => 'checkbox',
            'eval' => ['doNotCopy' => true, 'tl_class' => 'w50 m12'],
            'sql' => "char(1) NOT NULL default ''"
        ],
        'ignoreReducedAnimationMotion' => [
            'exclude' => true,
            'inputType' => 'checkbox',
            'eval' => ['tl_class' => 'clr'],
            'sql' => "char(1) NOT NULL default ''"
        ],
        'animation_viewport' => [
            'exclude' => true,
            'inputType' => 'select',
            'options' => &$GLOBALS['TL_LANG']['tl_alpdeskanimations']['animation_viewport_options'],
            'eval' => ['tl_class' => 'w50'],
            'sql' => "varchar(20) NOT NULL default ''"
        ],
        'animation_hide_before_viewport' => [
            'exclude' => true,
            'inputType' => 'checkbox',
            'eval' => ['tl_class' => 'w50'],
            'sql' => "char(1) NOT NULL default ''"
        ],
        'animation_zindex' => [
            'exclude' => true,
            'inputType' => 'checkbox',
            'eval' => ['tl_class' => 'w50'],
            'sql' => "char(1) NOT NULL default ''"
        ],
        'animation_startposition' => [
            'exclude' => true,
            'inputType' => 'select',
            'options' => &$GLOBALS['TL_LANG']['tl_alpdeskanimations']['animation_startposition_options'],
            'eval' => ['tl_class' => 'clr'],
            'sql' => "varchar(20) NOT NULL default ''"
        ],
        'animation_speed' => [
            'exclude' => true,
            'inputType' => 'select',
            'options' => &$GLOBALS['TL_LANG']['tl_alpdeskanimations']['animation_speed_options'],
            'eval' => ['tl_class' => 'w50'],
            'sql' => "varchar(20) NOT NULL default ''"
        ],
        'animation_effect' => [
            'exclude' => true,
            'inputType' => 'select',
            'options' => &$GLOBALS['TL_LANG']['tl_alpdeskanimations']['animation_effect_options'],
            'eval' => ['includeBlankOption' => true, 'tl_class' => 'w50'],
            'sql' => "varchar(20) NOT NULL default ''"
        ],
        'animation_animatecssoptions' => [
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
        ]
    ]
];
