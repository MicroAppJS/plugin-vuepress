const moment = require('moment');

const defaultOptions = {
    siteTitle: ($page, $site) => $page.localeConfig.title || $site.title,
    title: ($page, $site) => $page.title || $page.localeConfig.title || $site.title,
    description: ($page, $site) => {
        const desc = $page.frontmatter.description || $page.frontmatter.summary;
        if (!desc && !$page.frontmatter.home) {
            const removeMd = require('remove-markdown');
            const strippedContent = $page._strippedContent;
            if (strippedContent) {
                return removeMd(
                    strippedContent
                        .trim()
                        .replace(/^#+\s+(.*)/igm, '')
                        .replace(/:::/igm, '')
                        .replace(/\s+/igm, ' ')
                        .trim()
                ).slice(0, 200);
            }
        }
        const _desc = desc || $page.localeConfig.description || $site.themeConfig.description || $site.description;
        return _desc && _desc.trim();
    },
    keywords: ($page, $site) => {
        const categories = [].concat($page.frontmatter.categories || []);
        const tags = [].concat($page.frontmatter.tags || []);
        const keys = [].concat(categories, tags);
        if (keys.length) {
            return keys.join(',');
        }
        return $page.frontmatter.keywords || $page.localeConfig.keywords || $site.themeConfig.keywords || $site.keywords;
    },
    author: ($page, $site) => {
        const name = $page.frontmatter.author || $page.localeConfig.author || $site.themeConfig.author || $site.title;
        return {
            name,
        };
    },
    tags: $page => $page.frontmatter.tags,
    twitterCard: () => 'summary_large_image',
    type: ($page, $site) => {
        const type = $page.type || $site.type || $site.themeConfig.type || 'doc';
        return [ 'blog', 'post', 'article' ].some(key => type.startsWith(key)) ? 'article' : 'website';
    },
    url: ($page, $site, path) => {
        const siteUrl = $site.themeConfig.siteUrl || $site.siteUrl;
        return (siteUrl || '') + path;
    },
    image: ($page, $site) => {
        if ($page.frontmatter.banner) {
            const banner = $page.frontmatter.banner;
            const siteUrl = $site.themeConfig.siteUrl || $site.siteUrl;
            if (!banner.startsWith(siteUrl)) {
                return (siteUrl || '') + $page.frontmatter.banner;
            }
            return banner;
        }
    },
    publishedAt: $page => {
        if ($page.frontmatter.date) {
            return moment($page.frontmatter.date).utc().toISOString();
        }
        if ($page.birthTimestamp) {
            return moment($page.birthTimestamp).utc().toISOString();
        }
        return (new Date()).toISOString();
    },
    modifiedAt: $page => {
        if ($page.lastUpdatedTimestamp) {
            return moment($page.lastUpdatedTimestamp).utc().toISOString();
        }
        return (new Date()).toISOString();
    },
    customMeta: () => {},

    defaultMeta(add, ctx) {
        const { author, tags, $page, $site } = ctx;

        add('X-UA-Compatible', 'IE=Edge,chrome=1', 'http-equiv');

        // <!-- Alternative links -->
        const locales = $site.locales || {};
        const siteUrl = $site.themeConfig.siteUrl || $site.siteUrl || '';
        for (const path in locales) {
            const item = locales[path] || {};
            const lang = item.lang;
            if (lang) {
                add('alternative', lang, 'link', {
                    rel: 'alternative', hreflang: lang,
                    href: siteUrl + path,
                });
            }
        }

        // RSS
        const blogConfig = $site.themeConfig.blogConfig || {};
        if (blogConfig.rss) {
            add('alternate', 'rss', 'link', {
                rel: 'alternate', title: $page.localeConfig.title || $site.title,
                href: siteUrl + '/rss.xml',
            });
        }

        // Basics.
        add('article:published_time', ctx.publishedAt);
        add('article:modified_time', ctx.modifiedAt);
        add('og:site_name', ctx.siteTitle);
        add('og:title', ctx.title);
        add('og:description', ctx.description);
        add('og:type', ctx.type);
        add('og:url', ctx.url);
        add('og:image', ctx.image);
        add('twitter:title', ctx.title);
        add('twitter:description', ctx.description);
        add('twitter:url', ctx.url);
        add('twitter:card', ctx.twitterCard);
        add('twitter:image', ctx.image);

        // Author.
        if (author) {
            add('twitter:label1', 'Written by');
            add('twitter:data2', author.name);
            if (author.twitter) {
                add('twitter:creator', author.twitter);
            }
        }

        // Tags.
        if (tags) {
            add('twitter:label2', 'Filed under');
            let _tags = tags;
            if (!Array.isArray(tags)) {
                _tags = tags.split(',');
            }
            add('twitter:data2', _tags.join(','));
            _tags.forEach(tag => add('article:tag', tag));
        }

        // keywords
        add('keywords', ctx.keywords);

        // description
        if (!$page.frontmatter.home) {
            add('description', ctx.description);
        }
    },
};

module.exports = (options = {}, ctx) => {
    options = Object.assign(defaultOptions, options);

    return {
        name: 'seo',
        extendPageData($page) {
            const $site = ctx.siteConfig;
            $page.localeConfig = localeConfig($page, $site) || {};

            // In Vuepress core, permalinks are built after enhancers.
            const pageClone = Object.assign(Object.create(Object.getPrototypeOf($page)), $page);
            pageClone.buildPermalink();

            const meta = $page.frontmatter.meta || [];
            const addMeta = getAddMeta(meta);
            const optionArgs = [ $page, $site, pageClone.path ];
            const metaContext = {
                $page, $site,
                siteTitle: options.siteTitle(...optionArgs),
                title: options.title(...optionArgs),
                description: options.description(...optionArgs),
                keywords: options.keywords(...optionArgs),
                author: options.author(...optionArgs),
                tags: options.tags(...optionArgs),
                twitterCard: options.twitterCard(...optionArgs),
                type: options.type(...optionArgs),
                url: options.url(...optionArgs),
                image: options.image(...optionArgs),
                publishedAt: options.publishedAt(...optionArgs),
                modifiedAt: options.modifiedAt(...optionArgs),
            };

            options.defaultMeta(addMeta, metaContext);
            options.customMeta(addMeta, metaContext);
            $page.frontmatter.meta = meta;
        },
    };
};

function getAddMeta(meta) {
    return (name, content, attribute = null, attrs = {}) => {
        if (!content) return;
        if (!attribute) attribute = [ 'article:', 'og:' ].some(type => name.startsWith(type)) ? 'property' : 'name';
        meta.push({ ...attrs, [attribute]: name, content, 'data-auto-meta': true });
    };
}

function localeConfig($page, $site) {
    const { locales = {} } = $site;
    let targetLang;
    let defaultLang;
    for (const path in locales) {
        if (path === '/') {
            defaultLang = locales[path];
        } else if ($page.path.indexOf(path) === 0) {
            targetLang = locales[path];
        }
    }
    return targetLang || defaultLang || {};
}
