<?php

declare(strict_types=1);

use Alpdesk\AlpdeskParallax\Model\AlpdeskanimationsModel;

$GLOBALS['TL_MODELS']['tl_alpdeskanimations'] = AlpdeskanimationsModel::class;

$GLOBALS['BE_MOD']['content']['alpdeskanimations'] = [
    'tables' => ['tl_alpdeskanimations', 'tl_content']
];