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

    $jqueryAdded = false;

    $objArticleParallax = ArticleModel::findBy(array('pid=?', 'hasParallaxBackgroundImage=?'), array($objPage->id, 1));
    if ($objArticleParallax !== null) {
      if (!$objLayout->addJQuery) {
        $GLOBALS['TL_JAVASCRIPT'][] = 'assets/jquery/js/jquery.js|static';
        $jqueryAdded = true;
      }
      $GLOBALS['TL_JAVASCRIPT'][] = 'bundles/alpdeskparallax/js/alpdeskparallax.js|async';
      $GLOBALS['TL_CSS'][] = 'bundles/alpdeskparallax/css/alpdeskparallax.css';
    }

    $objArticleAnimations = ArticleModel::findBy(array('pid=?', 'hasAnimationeffects=?'), array($objPage->id, 1));
    if ($objArticleAnimations !== null) {
      if (!$objLayout->addJQuery && $jqueryAdded == false) {
        $GLOBALS['TL_JAVASCRIPT'][] = 'assets/jquery/js/jquery.js|static';
      }
      $GLOBALS['TL_JAVASCRIPT'][] = 'bundles/alpdeskparallax/js/alpdeskanimationeffects.js|async';
      $GLOBALS['TL_CSS'][] = 'bundles/alpdeskparallax/css/alpdeskanimationeffects.css';
    }
  }

  private function getImage($path, $size = '') {
    try {
      $objImageModel = (Validator::isUuid($path)) ? FilesModel::findByUuid($path) : FilesModel::findByPath($path);
      $rootDir = System::getContainer()->getParameter('kernel.project_dir');
      $imageFactory = System::getContainer()->get('contao.image.image_factory');
      return $imageFactory->create($rootDir . '/' . $objImageModel->path, StringUtil::deserialize($size))->getUrl($rootDir);
    } catch (\Exception $ex) {
      return null;
    }
  }

  private function appendAnimationEffect(array $dataItem) {

    if ($dataItem['animation_image'] === '') {
      return null;
    }

    $imageSrc = $this->getImage($dataItem['animation_image']);
    if ($imageSrc === null || $imageSrc === '') {
      return null;
    }

    $templateAnimation = new FrontendTemplate('animation_container');
    $templateAnimation->src = Environment::get('base') . $imageSrc;
    $templateAnimation->viewport = $dataItem['animation_viewport'];
    $templateAnimation->effect = $dataItem['animation_effect'];
    $templateAnimation->speed = $dataItem['animation_speed'];

    return $templateAnimation;
  }

  public function onCompileArticle(FrontendTemplate &$objTemplate, array $arrData): void {

    if (TL_MODE == 'FE' && $arrData['hasParallaxBackgroundImage'] == 1) {
      $tmp = $this->getImage($arrData['singleSRC'], $arrData['size']);
      if ($tmp !== null && $tmp !== '') {
        $templateBackgroundImage = new FrontendTemplate('parallax_container');
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

    if (TL_MODE == 'FE' && $arrData['hasAnimationeffects'] == 1) {
      $elements = $objTemplate->elements;
      $animationItems = StringUtil::deserialize($arrData['animationeffects']);
      if (\is_array($animationItems) && \count($animationItems) > 0) {
        foreach ($animationItems as $animationItem) {
          $effect = $this->appendAnimationEffect($animationItem);
          if ($effect !== null) {
            array_unshift($elements, $effect->parse());
          }
        }
      }
      $objTemplate->elements = $elements;
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

    if (TL_MODE == 'FE' && $objTemplate->type == 'article' && $objTemplate->hasAnimationeffects == 1) {
      $arrClasses = array('has-animationeffects');
      $objTemplate->class .= ' ' . implode(' ', $arrClasses);
    }
  }

}
