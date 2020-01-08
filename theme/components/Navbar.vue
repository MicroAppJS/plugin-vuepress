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

    .links {
        background-color: transparent;

        .search-box {
            input {
                background-color: $backgroundColor;
            }

            .suggestions {
                background-color: $backgroundColor;
            }
        }
    }

    .nav-links {
        a:hover, a.router-link-active {
            color: $accentColor;
        }
    }
}
</style>
