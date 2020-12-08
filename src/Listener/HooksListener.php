<?php

declare(strict_types=1);

namespace Alpdesk\AlpdeskParallax\Listener;

use Contao\ArticleModel;
use Contao\LayoutModel;
use Contao\PageModel;
use Contao\PageRegular;
use Contao\FrontendTemplate;
use Contao\FilesModel;
use Contao\Controller;
use Contao\Template;
use Contao\Environment;
use Contao\File;
use Contao\StringUtil;
use Contao\Validator;
use Contao\System;

class HooksListener {

  public function onGetPageLayout(PageModel $objPage, LayoutModel $objLayout, PageRegular $objPageRegular): void {

    $objArticle = ArticleModel::findBy(array('pid=?', 'hasParallaxBackgroundImage=?'), array($objPage->id, 1));
    if ($objArticle !== null) {
      if (!$objLayout->addJQuery) {
        $GLOBALS['TL_JAVASCRIPT'][] = 'assets/jquery/js/jquery.js|static';
      }
      $GLOBALS['TL_JAVASCRIPT'][] = 'bundles/alpdeskparallax/js/alpdeskparallax.js|async';
      $GLOBALS['TL_CSS'][] = 'bundles/alpdeskparallax/css/alpdeskparallax.css';
    }
  }

  private function getImage($path, $size) {
    try {
      $objImageModel = (Validator::isUuid($path)) ? FilesModel::findByUuid($path) : FilesModel::findByPath($path);
      $rootDir = System::getContainer()->getParameter('kernel.project_dir');
      $imageFactory = System::getContainer()->get('contao.image.image_factory');
      return $imageFactory->create($rootDir . '/' . $objImageModel->path, StringUtil::deserialize($size))->getUrl($rootDir);
    } catch (\Exception $ex) {
      return null;
    }
  }

  public function onCompileArticle(FrontendTemplate &$objTemplate, array $arrData): void {
    if (TL_MODE == 'FE' && $arrData['hasParallaxBackgroundImage'] == 1) {
      $tmp = $this->getImage($arrData['singleSRC'], $arrData['size']);
      if ($tmp !== null && $tmp !== '') {
        $templateBackgroundImage = new FrontendTemplate('parallax_container');
        Controller::addImageToTemplate($templateBackgroundImage, $arrData);
        $srcImage = new File($tmp);
        $templateBackgroundImage->isParallax = ($arrData['isParallax'] == '1' ? 1 : 0);
        $templateBackgroundImage->src = Environment::get('base') . $srcImage->path;
        $templateBackgroundImage->srcHeight = $srcImage->height;
        $templateBackgroundImage->srcWidth = $srcImage->width;
        $templateBackgroundImage->hAlign = ($arrData['hAlign'] != '') ? $arrData['hAlign'] : 'center';
        $templateBackgroundImage->vAlign = ($arrData['vAlign'] != '') ? $arrData['vAlign'] : 'center';
        $templateBackgroundImage->sizemodus = ($arrData['sizemodus'] != '') ? $arrData['sizemodus'] : 'auto';
        $templateBackgroundImage->vParallax = ($arrData['vParallax'] != '') ? $arrData['vParallax'] : '0';
        $elements = $objTemplate->elements;
        array_unshift($elements, $templateBackgroundImage->parse());
        $objTemplate->elements = $elements;
      }
    }
  }

  public function onParseTemplate(Template $objTemplate) {
    if (TL_MODE == 'FE' && $objTemplate->type == 'article' && $objTemplate->hasParallaxBackgroundImage == 1) {
      $arrClasses = array('has-responsive-background-image');
      if ($objTemplate->isParallax == 1) {
        $arrClasses[] = 'parallax';
      }
      $objTemplate->class .= ' ' . implode(' ', $arrClasses);
    }
  }

}
