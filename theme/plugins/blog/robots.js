module.exports = (options, ctx) => {
    const { fs, logger, path, _ } = require('@micro-app/shared-utils');
    const robotstxt = require('generate-robotstxt');

    if (!_.isPlainObject(options)) {
        options = {};
    }

    const { themeConfig, siteConfig } = ctx;
    const siteUrl = options.siteUrl || themeConfig.siteUrl || siteConfig.siteUrl;
    if (!siteUrl) {
        logger.warn('[robots]', '"siteUrl" must be required!');
    }
    const blogConfig = themeConfig.blogConfig || {};

    // Get options
    const {
        allowAll = false, // Allow All: false by default
        disallowAll = false, // Disallow all: false by default
        sitemap = '/sitemap.xml', // Default sitemap is sitemap.xml
        policies, // Default policies is null
        outputFile = 'robots.txt', // Default robots is robots.txt
    } = options;

    return {
        name: 'robots',
        async generated(pagePaths) {
            logger.info('Generating robots.txt ...');

            if (ctx.isProd === true) {
                const robotsTxt = path.resolve(
                    ctx.outDir, outputFile
                );

                // Get all policies togeter; If none provided, it will allow all except path: /admin
                const policyArray = [];

                const disallowAllPolicy = {
                    userAgent: '*',
                    disallow: '/',
                };
                const allowAllPolicy = {
                    userAgent: '*',
                    disallow: '',
                };

                if (disallowAll) {
                    policyArray.push(disallowAllPolicy);
                } else {
                    if (allowAll) {
                        policyArray.push(allowAllPolicy);
                    } else {
                        // allowAll and disallowAll not provided, then use policies
                        if (typeof policies !== 'undefined' && policies.length > 0) {
                            policies.forEach(policy => {
                                policyArray.push(policy);
                            });
                        } else {
                            policyArray.push(allowAllPolicy);
                        }
                    }
                }

                const params = {
                    policy: policyArray,
                    host: siteUrl,
                };
                if (blogConfig.sitemap) {
                    let _sitemap = sitemap;
                    if (typeof blogConfig.sitemap.outFile === 'string') {
                        _sitemap = `/${blogConfig.sitemap.outFile}`;
                    }
                    const sitemapUrl = siteUrl + _sitemap;
                    params.sitemap = sitemapUrl.replace(/\/\//g, '/');
                }

                robotstxt(params).then(content => {
                    // All good, save the file
                    fs.writeFileSync(robotsTxt, content);
                    return content;
                }).catch(error => {
                    // Something wrong
                    throw error;
                });
            } else {
                logger.info('You need robots.txt file only in the production server.');
            }
        },
    };
};
