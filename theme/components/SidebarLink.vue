<script>
import ParentLayout from '@default-theme/components/SidebarLink.vue';
export default {
    name: 'SidebarLink',
    extends: ParentLayout,
};
</script>

<style lang="stylus">
a.sidebar-link {
    border-left: none;
    border-right: 0rem solid transparent;
    transition: all 0.3s;
    border-top-left-radius: $borderRadius;
    border-bottom-left-radius: $borderRadius;

    &:hover {
        background: lighten($accentColor, 90%);
    }

    &.active {
        border-right-color: $accentColor;
        border-right-width: 0.25rem;
    }

    .sidebar-sub-headers & {
        border-right: none;
    }
}
</style>
