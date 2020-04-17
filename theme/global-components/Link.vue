<template>
    <a :href="href" class="nav-link external" :class="$style.link" :target="target" :rel="_rel">
        <SvgIcon v-if="icon" :name="icon" class="icon"></SvgIcon>
        <slot>{{ text }}</slot>
        <template v-if="!hideOutboundIcon">
            <OutboundLink v-if="isBlankTarget" />
        </template>
    </a>
</template>

<script>
export default {
    name: 'Link',
    props: {
        href: String,
        icon: String,
        text: String,
        hideOutboundIcon: Boolean,
        target: {
            type: String,
            default: '_blank',
        },
        rel: String,
    },
    computed: {
        isBlankTarget() {
            return this.target === '_blank';
        },
        _rel() {
            if (this.rel) {
                return this.rel;
            }
            return this.isBlankTarget ? 'noopener noreferrer' : '';
        },
    },
};
</script>

<style lang="stylus" module>
.link {
    transition: color 0.3s;
}
</style>
