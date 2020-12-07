<?php

declare(strict_types=1);

namespace Alpdesk\AlpdeskParallax\DependencyInjection;

use Symfony\Component\Config\FileLocator;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\HttpKernel\DependencyInjection\Extension;
use Symfony\Component\DependencyInjection\Loader\YamlFileLoader;

class AlpdeskParallaxExtension extends Extension {

  public function load(array $mergedConfig, ContainerBuilder $container) {
    $loader = new YamlFileLoader($container, new FileLocator(__DIR__ . '/../Resources/config'));
    $loader->load('services.yml');
  }

}
