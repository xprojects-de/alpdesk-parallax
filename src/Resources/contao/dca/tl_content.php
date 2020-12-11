<?php

use Contao\Input;

if (Input::get('do') == 'alpdeskanimations') {
  $GLOBALS['TL_DCA']['tl_content']['config']['ptable'] = 'tl_alpdeskanimations';
}
