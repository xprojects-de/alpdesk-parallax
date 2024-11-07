<?php

declare(strict_types=1);

namespace Alpdesk\AlpdeskParallax\Listener;

use Contao\ArticleModel;
use Contao\CoreBundle\Routing\ScopeMatcher;
use Contao\LayoutModel;
use Contao\PageModel;
use Contao\PageRegular;
use Contao\FrontendTemplate;
use Contao\FilesModel;
use Contao\Template;
use Contao\Module;
use Contao\Environment;
use Contao\File;
use Contao\StringUtil;
use Contao\Validator;
use Contao\System;
use Contao\ContentModel;
use Alpdesk\AlpdeskParallax\Model\AlpdeskanimationsModel;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;

class HooksListener
{
    private RequestStack $requestStack;
    private ScopeMatcher $scopeMatcher;
    private string $rootDir;

    /**
     * @param RequestStack $requestStack
     * @param ScopeMatcher $scopeMatcher
     * @param string $rootDir
     */
    public function __construct(RequestStack $requestStack, ScopeMatcher $scopeMatcher, string $rootDir)
    {
        $this->requestStack = $requestStack;
        $this->scopeMatcher = $scopeMatcher;
        $this->rootDir = $rootDir;
    }

    /**
     * @return bool
     */
    private function isFrontend(): bool
    {
        if (!$this->requestStack->getCurrentRequest() instanceof Request) {
            return false;
        }

        return $this->scopeMatcher->isFrontendRequest($this->requestStack->getCurrentRequest());
    }

    /**
     * @param PageModel $objPage
     * @param LayoutModel $objLayout
     * @param PageRegular $objPageRegular
     * @return void
     */
    public function onGetPageLayout(PageModel $objPage, LayoutModel $objLayout, PageRegular $objPageRegular): void
    {
        $jqueryAdded = false;

        $objArticleParallax = ArticleModel::findBy(array('tl_article.pid=?', 'tl_article.published=?', 'tl_article.hasParallaxBackgroundImage=?'), array($objPage->id, 1, 1));

        if ($objArticleParallax !== null) {

            if (!$objLayout->addJQuery) {
                $GLOBALS['TL_JAVASCRIPT'][] = 'assets/jquery/js/jquery.js|static';
                $jqueryAdded = true;
            }

            $GLOBALS['TL_JAVASCRIPT'][] = 'bundles/alpdeskparallax/js/alpdeskparallax.js|async';
            $GLOBALS['TL_CSS'][] = 'bundles/alpdeskparallax/css/alpdeskparallax.css';
        }

        $objArticleAnimations = ArticleModel::findBy(array('tl_article.pid=?', 'tl_article.published=?', 'tl_article.hasAnimationeffects=?'), array($objPage->id, 1, 1));

        if ($objArticleAnimations !== null) {

            if (!$objLayout->addJQuery && $jqueryAdded === false) {
                $GLOBALS['TL_JAVASCRIPT'][] = 'assets/jquery/js/jquery.js|static';
            }

            $GLOBALS['TL_JAVASCRIPT'][] = 'bundles/alpdeskparallax/js/alpdeskanimationeffects.js|async';
            $GLOBALS['TL_CSS'][] = 'bundles/alpdeskparallax/css/alpdeskanimationeffects.css';
            $GLOBALS['TL_CSS'][] = 'bundles/alpdeskparallax/css/animate.min.css';
        }

    }

    /**
     * @param string $path
     * @param string $size
     * @return string|null
     */
    private function getImage(string $path, string $size = ''): ?string
    {
        try {

            $objImageModel = (Validator::isUuid($path)) ? FilesModel::findByUuid($path) : FilesModel::findByPath($path);
            if ($objImageModel === null) {
                throw new \Exception();
            }

            $imageFactory = System::getContainer()->get('contao.image.factory');
            if ($imageFactory === null) {
                throw new \Exception();
            }

            return $imageFactory->create($this->rootDir . '/' . $objImageModel->path, StringUtil::deserialize($size))->getUrl($this->rootDir);

        } catch (\Exception $ex) {
            return null;
        }

    }

    /**
     * @param int $animationItemId
     * @return FrontendTemplate|null
     */
    private function appendAnimationEffect(int $animationItemId): ?FrontendTemplate
    {
        if ($animationItemId <= 0) {
            return null;
        }

        $animationModel = AlpdeskanimationsModel::findBy(array('id=?', 'published=?'), array($animationItemId, 1));
        if ($animationModel === null) {
            return null;
        }

        $contentModel = ContentModel::findBy(array('tl_content.pid=?', 'tl_content.ptable=?', 'tl_content.invisible!=?'), array($animationModel->id, 'tl_alpdeskanimations', 1));
        if ($contentModel === null) {
            return null;
        }

        $animationContentElements = [];
        foreach ($contentModel as $element) {
            $animationContentElements[] = $element->id;
        }

        $templateAnimation = new FrontendTemplate('animation_container');
        $cssID = '';
        $cssClass = '';

        $cssIDClass = StringUtil::deserialize($animationModel->cssID);
        if (\is_array($cssIDClass) && \count($cssIDClass) === 2) {

            $cssID = $cssIDClass[0];
            $cssClass = $cssIDClass[1];

        }

        $templateAnimation->cssID = $cssID;
        $templateAnimation->cssClass = $cssClass;
        $templateAnimation->viewport = $animationModel->animation_viewport;
        $templateAnimation->startposition = $animationModel->animation_startposition;
        $templateAnimation->effect = $animationModel->animation_effect;
        $templateAnimation->speed = $animationModel->animation_speed;
        $templateAnimation->hide = ((int)$animationModel->animation_hide_before_viewport === 1);
        $templateAnimation->foreground = ((int)$animationModel->animation_zindex === 1);
        $templateAnimation->ignoreReducedAnimationMotion = ((int)$animationModel->ignoreReducedAnimationMotion === 1);
        $templateAnimation->animationContentElements = $animationContentElements;
        $templateAnimation->animationCss = '';

        $animationCss = $animationModel->animation_animatecssoptions;
        if ($animationCss !== null && $animationCss !== '') {
            $templateAnimation->animationCss = $animationCss;
        }

        return $templateAnimation;

    }

    /**
     * @param FrontendTemplate $objTemplate
     * @param array $arrData
     * @param Module $module
     * @throws \Exception
     */
    public function onCompileArticle(FrontendTemplate $objTemplate, array $arrData, Module $module): void
    {
        $isFrontend = $this->isFrontend();

        if ($isFrontend && (int)$arrData['hasParallaxBackgroundImage'] === 1) {

            $tmp = $this->getImage($arrData['singleSRC'], $arrData['size']);
            if ($tmp !== null && $tmp !== '') {

                $templateBackgroundImage = new FrontendTemplate('parallax_container');

                $srcImage = new File($tmp);

                $templateBackgroundImage->isParallax = ((int)$arrData['isParallax'] === 1 ? 1 : 0);
                $templateBackgroundImage->src = Environment::get('base') . $srcImage->path;
                $templateBackgroundImage->srcHeight = $srcImage->height;
                $templateBackgroundImage->srcWidth = $srcImage->width;
                $templateBackgroundImage->hAlign = ($arrData['hAlign'] !== '') ? $arrData['hAlign'] : 'center';
                $templateBackgroundImage->vAlign = ($arrData['vAlign'] !== '') ? $arrData['vAlign'] : 'center';
                $templateBackgroundImage->sizemodus = ($arrData['sizemodus'] !== '') ? $arrData['sizemodus'] : 'auto';
                $templateBackgroundImage->vParallax = ($arrData['vParallax'] !== '') ? $arrData['vParallax'] : '0';
                $elements = $objTemplate->elements;

                \array_unshift($elements, $templateBackgroundImage->parse());

                $objTemplate->elements = $elements;
            }
        }

        if ($isFrontend && (int)$arrData['hasAnimationeffects'] === 1) {

            $elements = $objTemplate->elements;
            if (\array_key_exists('alpdeskanimation', $arrData) && $arrData['alpdeskanimation'] !== '') {

                $animationItems = StringUtil::deserialize($arrData['alpdeskanimation']);
                if (\is_array($animationItems) && \count($animationItems) > 0) {
                    foreach ($animationItems as $animationItem) {
                        $effect = $this->appendAnimationEffect((int)$animationItem);
                        if ($effect !== null) {
                            \array_unshift($elements, $effect->parse());
                        }
                    }
                }
            }

            $objTemplate->elements = $elements;
        }

    }

    /**
     * @param Template $objTemplate
     * @return void
     */
    public function onParseTemplate(Template $objTemplate): void
    {
        $isFrontend = $this->isFrontend();

        if ($isFrontend && $objTemplate->type === 'article' && (int)$objTemplate->hasParallaxBackgroundImage === 1) {

            $arrClasses = array('has-responsive-background-image');

            if ((int)$objTemplate->isParallax === 1) {
                $arrClasses[] = 'parallax';
            }

            $objTemplate->class .= ' ' . \implode(' ', $arrClasses);
        }

        if ($isFrontend && $objTemplate->type === 'article' && (int)$objTemplate->hasAnimationeffects === 1) {

            $arrClasses = array('has-animationeffects');
            $objTemplate->class .= ' ' . \implode(' ', $arrClasses);

        }

    }

    /**
     * @param ContentModel $element
     * @param string $buffer
     * @param $el
     * @return string
     */
    public function onGetContentElement(ContentModel $element, string $buffer, $el): string
    {
        if ((int)$element->hasAnimationeffects === 1 && $this->isFrontend()) {

            $matchesJs = [];
            if (isset($GLOBALS['TL_JAVASCRIPT'])) {
                $matchesJs = \array_filter($GLOBALS['TL_JAVASCRIPT'], static function ($v) {
                    return \strpos($v, 'alpdeskanimationeffects.js');
                });
            }

            if (\count($matchesJs) === 0) {
                $GLOBALS['TL_JAVASCRIPT'][] = 'bundles/alpdeskparallax/js/alpdeskanimationeffects.js|async';
            }

            $matchesCss = [];
            if (isset($GLOBALS['TL_CSS'])) {
                $matchesCss = \array_filter($GLOBALS['TL_CSS'], static function ($v) {
                    return \strpos($v, 'alpdeskanimationeffects.css');
                });
            }

            if (\count($matchesCss) === 0) {
                $GLOBALS['TL_CSS'][] = 'bundles/alpdeskparallax/css/alpdeskanimationeffects.css';
                $GLOBALS['TL_CSS'][] = 'bundles/alpdeskparallax/css/animate.min.css';
            }

            $animationCss = $element->animation_animatecssoptions;
            if ($animationCss !== null && $animationCss !== '') {

                $classes = 'animation-effect-ce' . ((int)$element->animation_hide_before_viewport === 1 ? ' animation-effect-hide' : '');

                $dataAttributes = \array_filter([
                    'data-animationcss' => $animationCss,
                    'data-hide' => ((int)$element->animation_hide_before_viewport === 1 ? 1 : 0),
                    'data-viewport' => $element->animation_viewport,
                    'data-speed' => $element->animation_speed], static function ($v) {
                    return null !== $v;
                });

                $buffer = \preg_replace_callback('|<([a-zA-Z0-9]+)(\s[^>]*?)?(?<!/)>|', static function ($matches) use ($classes, $dataAttributes) {
                    $tag = $matches[1];
                    $attributes = $matches[2];

                    $attributes = preg_replace('/class="([^"]+)"/', 'class="$1 ' . $classes . '"', $attributes, 1, $count);
                    if (0 === $count) {
                        $attributes .= ' class="' . $classes . '"';
                    }

                    foreach ($dataAttributes as $key => $value) {
                        $attributes .= ' ' . $key . '="' . $value . '"';
                    }

                    return "<{$tag}{$attributes}>";
                }, $buffer, 1);
            }
        }

        return $buffer;

    }

}
