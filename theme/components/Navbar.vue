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
    background-color: rgba($backgroundColor, 0.85);

    .links {
        background-color: transparent;
    }

    .nav-links {
        a:hover, a.router-link-active {
            color: $accentColor;
        }
    }
}
</style>
