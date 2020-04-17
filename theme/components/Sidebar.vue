<script>
import ParentLayout from '@default-theme/components/Sidebar.vue';
export default {
    name: 'Sidebar',
    extends: ParentLayout,
};
</script>

<style lang="stylus">
.sidebar {
    .sidebar-sub-headers {
        margin-right: 1rem;

        a.sidebar-link.active {
            // font-weight: 600;
            // color: $whiteColor;
            // background-color: alpha($accentColor, 0.95);
            // box-sizing: border-box;
            // border-radius: $borderRadius;
        }
    }
}
</style>
