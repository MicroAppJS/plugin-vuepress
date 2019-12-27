<script>
import ParentLayout from '@default-theme/components/Navbar.vue';
export default {
    name: 'Navbar',
    extends: ParentLayout,
};
</script>


<style lang="stylus">
.navbar {
    box-shadow: $boxShadow;

    a:not(:hover)>.icon {
        color: #999;
    }

    .nav-links a:hover, .nav-links a.router-link-active {
        color: $accentColor;
    }
}
</style>
