<template>
    <div class="theme-container">
        <div class="theme-default-content">
            <h1>{{ $frontmatter.title }}</h1>
            <p>{{ $frontmatter.description }}</p>
            <hr />
            <p>
                原文链接：
                <NavLink :item="redirectLink" line>{{ redirectLink }}</NavLink>
            </p>
            <p>Redirect...</p>
        </div>
    </div>
</template>

<script>
import NavLink from '@theme/components/NavLink.vue';
export default {
    name: 'RedirectLayout',
    components: {
        NavLink,
    },
    computed: {
        redirectLink() {
            return this.$frontmatter.redirectLink || '/';
        },
    },
    mounted() {
        this.$router.replace(this.redirectLink);
    },
};
</script>
