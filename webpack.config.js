const Encore = require('@symfony/webpack-encore');

Encore
    .setOutputPath('src/Resources/public/')
    .setPublicPath('/bundles/alpdeskparallax')
    .setManifestKeyPrefix('')
    .cleanupOutputBeforeBuild()
    .disableSingleRuntimeChunk()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())
    .addEntry('alpdeskparallax', './assets/js/alpdeskparallax.js')
    .addEntry('alpdeskanimationeffects', './assets/js/alpdeskanimationeffects.js')
;

const alpdeskparallax = Encore.getWebpackConfig();

//Encore.reset();

module.exports = [alpdeskparallax];