<template>
    <RouterLink
        v-if="isInternal"
        class="nav-link"
        :class="$style.link"
        :line="line"
        :to="link"
        :exact="exact"
        @focusout.native="focusoutAction"
    >
        <SvgIcon v-if="item.icon" :name="item.icon" class="icon"></SvgIcon>
        <slot>{{ item.text }}</slot>
    </RouterLink>
    <a
        v-else
        :href="link"
        class="nav-link external"
        :class="$style.link"
        :line="line"
        :target="target"
        :rel="rel"
        @focusout="focusoutAction"
    >
        <SvgIcon v-if="item.icon" :name="item.icon" class="icon"></SvgIcon>
        <slot>{{ item.text }}</slot>
        <template v-if="!hideOutboundIcon">
            <OutboundLink v-if="isBlankTarget" />
        </template>
    </a>
</template>

<script>
import { isExternal, isMailto, isTel, ensureExt } from '@default-theme/util';
export default {
    name: 'NavLink',
    props: {
        item: {
            required: true,
            type: [ String, Object ],
        },
        line: Boolean,
        hideOutboundIcon: Boolean,
    },
    computed: {
        link() {
            if (typeof this.item === 'string') {
                return ensureExt(this.item);
            }
            return ensureExt(this.item.link);
        },
        exact() {
            if (this.$site.locales) {
                return Object.keys(this.$site.locales).some(rootLink => rootLink === this.link);
            }
            return this.link === '/';
        },
        isNonHttpURI() {
            return isMailto(this.link) || isTel(this.link);
        },
        isBlankTarget() {
            return this.target === '_blank';
        },
        isInternal() {
            return !isExternal(this.link) && !this.isBlankTarget;
        },
        target() {
            if (this.isNonHttpURI) {
                return null;
            }
            if (this.item.target) {
                return this.item.target;
            }
            return isExternal(this.link) ? '_blank' : '';
        },
        rel() {
            if (this.isNonHttpURI) {
                return null;
            }
            if (this.item.rel) {
                return this.item.rel;
            }
            return this.isBlankTarget ? 'noopener noreferrer' : '';
        },
    },
    methods: {
        focusoutAction() {
            this.$emit('focusout');
        },
    },
};
</script>

<style lang="stylus" module>
.link {
    transition: color 0.3s;

    &[line] {
        &:before {
            content: '';
            position: absolute;
            left: 51%;
            right: 51%;
            bottom: 0;
            background: lighten($accentColor, 8%);
            height: 2px;
            transition-property: left, right;
            transition-duration: 0.3s;
            transition-timing-function: ease-out;
        }

        &:hover:before {
            left: 0;
            right: 0;
        }
    }
}
</style>
