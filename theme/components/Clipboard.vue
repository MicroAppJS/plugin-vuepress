<template>
    <div>
        <p>
            <span>{{ text.beforeAuthor }} {{ author }} {{ text.afterAuthor }}</span>
            <a :href="location">{{ decodeURIComponent(location) }}</a>
        </p>&#10;&#10;<div v-html="html" />
    </div>
</template>

<script>
const i18n = {
    'en-US': {
        author: 'author',
        beforeAuthor: 'Copyright © ',
        afterAuthor: '\nLink: ',
    },
    'zh-CN': {
        author: '作者',
        beforeAuthor: '著作权归',
        afterAuthor: '所有。\n链接：',
    },
};
export default {
    props: {
        html: String,
        lang: String,
        author: String,
    },
    created() {
        this.text = this.getI18nValue(i18n);
        this.location = String(location).replace(/#.+$/, '');
    },
    methods: {
        getI18nValue(source) {
            return this.lang in source ? source[this.lang] : source['en-US'];
        },
    },
};
</script>
