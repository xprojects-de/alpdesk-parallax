<?php

declare(strict_types=1);

namespace Alpdesk\AlpdeskParallax\Listener;

use Contao\ArticleModel;
use Contao\CoreBundle\Image\ImageFactoryInterface;
use Contao\CoreBundle\Routing\ScopeMatcher;
use Contao\FrontendTemplate;
use Contao\FilesModel;
use Contao\Environment;
use Contao\Image\ImageInterface;
use Contao\StringUtil;
use Contao\Validator;
use Contao\ContentModel;
use Alpdesk\AlpdeskParallax\Model\AlpdeskanimationsModel;
use Symfony\Component\Asset\Packages;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\ResponseEvent;

class HooksListener
{
    private RequestStack $requestStack;
    private ScopeMatcher $scopeMatcher;
    private string $rootDir;
    private Packages $packages;
    private ImageFactoryInterface $imageFactory;

    private bool $addAssets = false;

    /**
     * @param RequestStack $requestStack
     * @param ScopeMatcher $scopeMatcher
     * @param string $rootDir
     * @param Packages $packages
     * @param ImageFactoryInterface $imageFactory
     */
    public function __construct(
        RequestStack          $requestStack,
        ScopeMatcher          $scopeMatcher,
        string                $rootDir,
        Packages              $packages,
        ImageFactoryInterface $imageFactory
    )
    {
        $this->requestStack = $requestStack;
        $this->scopeMatcher = $scopeMatcher;
        $this->rootDir = $rootDir;
        $this->packages = $packages;
        $this->imageFactory = $imageFactory;
    }

    /**
     * @param ResponseEvent $event
     * @return void
     */
    public function onKernelResponse(ResponseEvent $event): void
    {
        $request = $event->getRequest();

        if (!$this->scopeMatcher->isFrontendRequest($request)) {
            return;
        }

        $response = $event->getResponse();
        $content = $response->getContent();

        if ($this->addAssets === true && $this->isPageTemplate($event) === true) {

            $pos = \strripos($content, '</head>');
            if (false !== $pos) {

                $scriptCss = '<script src="' . $this->packages->getUrl('alpdeskparallax.js', 'alpdesk_parallax') . '"></script>' . "\n";
                $scriptCss .= '<link rel="stylesheet" href="' . $this->packages->getUrl('alpdeskparallax.css', 'alpdesk_parallax') . '">';

                $content = substr($content, 0, $pos) . "\n" . $scriptCss . "\n" . substr($content, $pos);

                $response->setContent($content);

            }

        }

        if ($request->attributes->has('contentModel')) {

            $contentModel = $request->attributes->get('contentModel');

            if (!$contentModel instanceof ContentModel) {
                $contentModel = ContentModel::findByPk($contentModel);
            }

            if ((int)$contentModel->hasAnimationeffects === 1) {

                $animationCss = $contentModel->animation_animatecssoptions;
                if ($animationCss !== null && $animationCss !== '') {

                    $this->addAssets = true;

                    $classes = ((int)$contentModel->animation_hide_before_viewport === 1 ? ' animation-effect-hide' : '');

                    $dataAttributes = \array_filter(
                        [
                            'data-controller' => 'animation',
                            'data-animation-animationcss-value' => $animationCss,
                            'data-animation-hide-value' => ((int)$contentModel->animation_hide_before_viewport === 1 ? 1 : 0),
                            'data-animation-viewport-value' => $contentModel->animation_viewport,
                            'data-animation-type-value' => '2',
                            'data-animation-speed-value' => $contentModel->animation_speed,
                            'data-action' => 'scroll@window->animation#scrollWindow resize@window->animation#resizeWindow'
                        ], static function ($v) {
                        return null !== $v;
                    });

                    $content = \preg_replace_callback('|<([a-zA-Z0-9]+)(\s[^>]*?)?(?<!/)>|', static function ($matches) use ($classes, $dataAttributes) {

                        [$tag, $attributes] = $matches;

                        $attributes = preg_replace('/class="([^"]+)"/', 'class="$1 ' . $classes . '"', $attributes, 1, $count);
                        if (0 === $count) {
                            $attributes .= ' class="' . $classes . '"';
                        }

                        foreach ($dataAttributes as $key => $value) {
                            $attributes .= ' ' . $key . '="' . $value . '"';
                        }

                        return "<{$tag}{$attributes}>";
                    }, $content, 1);

                    $response->setContent($content);

                }

            }

        }

    }

    public function onGetArticle(ArticleModel $articleModel): void
    {
        if (!$this->requestStack->getCurrentRequest() instanceof Request) {
            return;
        }

        if (!$this->scopeMatcher->isFrontendRequest($this->requestStack->getCurrentRequest())) {
            return;
        }

        $customClasses = [];

        if ((int)$articleModel->hasParallaxBackgroundImage === 1) {

            $this->addAssets = true;

            $customClasses = ['has-responsive-background-image'];

            if ((int)$articleModel->isParallax === 1) {
                $customClasses[] = 'parallax';
            }

        }

        if ((int)$articleModel->hasAnimationeffects === 1) {

            $this->addAssets = true;
            $customClasses[] = 'has-animationeffects';

        }

        if (\count($customClasses) > 0) {

            $articleModelClasses = StringUtil::deserialize($articleModel->cssID, true);
            $articleModelClasses[1] .= ' ' . \implode(' ', $customClasses);
            $articleModel->cssID = \serialize($articleModelClasses);

        }

    }

    /**
     * @param FrontendTemplate $objTemplate
     * @param array $arrData
     * @return void
     * @throws \Exception
     */
    public function onCompileArticle(FrontendTemplate $objTemplate, array $arrData): void
    {
        if (!$this->requestStack->getCurrentRequest() instanceof Request) {
            return;
        }

        if (!$this->scopeMatcher->isFrontendRequest($this->requestStack->getCurrentRequest())) {
            return;
        }

        if ((int)$arrData['hasParallaxBackgroundImage'] === 1) {

            $imageInterface = $this->getImage($arrData['singleSRC'], $arrData['size']);
            if ($imageInterface !== null) {

                $this->addAssets = true;

                $templateBackgroundImage = new FrontendTemplate('parallax_container');

                $templateBackgroundImage->isParallax = ((int)$arrData['isParallax'] === 1 ? 1 : 0);
                $templateBackgroundImage->src = Environment::get('base') . $imageInterface->getUrl($this->rootDir);
                $templateBackgroundImage->srcHeight = $imageInterface->getDimensions()->getSize()->getHeight();
                $templateBackgroundImage->srcWidth = $imageInterface->getDimensions()->getSize()->getWidth();
                $templateBackgroundImage->hAlign = ($arrData['hAlign'] !== '') ? $arrData['hAlign'] : 'center';
                $templateBackgroundImage->vAlign = ($arrData['vAlign'] !== '') ? $arrData['vAlign'] : 'center';
                $templateBackgroundImage->sizemodus = ($arrData['sizemodus'] !== '') ? $arrData['sizemodus'] : 'auto';
                $templateBackgroundImage->vParallax = ($arrData['vParallax'] !== '') ? $arrData['vParallax'] : '0';

                $templateBackgroundImageContent = $templateBackgroundImage->getResponse()->getContent();

                $elements = $objTemplate->elements;

                \array_unshift($elements, $templateBackgroundImageContent);

                $objTemplate->elements = $elements;

            }

        }

        if ((int)$arrData['hasAnimationeffects'] === 1) {

            $elements = $objTemplate->elements;

            if (\array_key_exists('alpdeskanimation', $arrData) && $arrData['alpdeskanimation'] !== '') {

                $animationItems = StringUtil::deserialize($arrData['alpdeskanimation']);
                if (\is_array($animationItems) && \count($animationItems) > 0) {

                    $this->addAssets = true;

                    foreach ($animationItems as $animationItem) {

                        $effectResponse = $this->appendAnimationEffect((int)$animationItem);
                        if ($effectResponse instanceof Response) {
                            \array_unshift($elements, $effectResponse->getContent());
                        }

                    }

                }

            }

            $objTemplate->elements = $elements;

        }

    }

    /**
     * @param ResponseEvent $event
     * @return bool
     */
    private function isPageTemplate(ResponseEvent $event): bool
    {
        $request = $event->getRequest();
        $response = $event->getResponse();

        if (
            !$this->scopeMatcher->isFrontendMainRequest($event) ||
            $request->isXmlHttpRequest() ||
            (!$response->isSuccessful() && !$response->isClientError())
        ) {
            return false;
        }

        if (
            'html' !== $request->getRequestFormat() ||
            !str_contains((string)$response->headers->get('Content-Type'), 'text/html') ||
            false !== stripos((string)$response->headers->get('Content-Disposition'), 'attachment;')
        ) {
            return false;
        }

        if (false === strripos($response->getContent(), '</body>')) {
            return false;
        }

        return true;

    }

    /**
     * @param string $path
     * @param string $size
     * @return ImageInterface|null
     */
    private function getImage(string $path, string $size = ''): ?ImageInterface
    {
        try {

            $objImageModel = (Validator::isUuid($path)) ? FilesModel::findByUuid($path) : FilesModel::findByPath($path);
            if ($objImageModel === null) {
                throw new \Exception();
            }

            return $this->imageFactory->create($this->rootDir . '/' . $objImageModel->path, StringUtil::deserialize($size));

        } catch (\Exception) {
            return null;
        }

    }

    /**
     * @param int $animationItemId
     * @return Response|null
     */
    private function appendAnimationEffect(int $animationItemId): ?Response
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
            [$cssID, $cssClass] = $cssIDClass;
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

        return $templateAnimation->getResponse();

    }

}
