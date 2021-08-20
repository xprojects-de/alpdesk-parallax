<?php

declare(strict_types=1);

namespace Alpdesk\AlpdeskParallax\ContaoManager;

use Alpdesk\AlpdeskParallax\AlpdeskParallaxBundle;
use Contao\CoreBundle\ContaoCoreBundle;
use Contao\ManagerPlugin\Bundle\Config\BundleConfig;
use Contao\ManagerPlugin\Bundle\BundlePluginInterface;
use Contao\ManagerPlugin\Bundle\Parser\ParserInterface;

class Plugin implements BundlePluginInterface
{
    public function getBundles(ParserInterface $parser): array
    {
        return [BundleConfig::create(AlpdeskParallaxBundle::class)->setLoadAfter([ContaoCoreBundle::class])];
    }

}
