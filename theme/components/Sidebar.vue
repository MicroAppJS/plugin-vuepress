<script>
import ParentLayout from '@default-theme/components/Sidebar.vue';
export default {
    name: 'Sidebar',
    extends: ParentLayout,
};
</script>

<style lang="stylus">
.sidebar {
    background-color: transparent;
    font-size: 14px;
    transition: all 0.3s;

    .sidebar-sub-headers {
        margin-right: 1rem;

        a.sidebar-link.active {
            font-weight: 600;
            color: #fff;
            background-color: alpha($accentColor, 0.95);
            box-sizing: border-box;
            border-radius: $borderRadius;
        }
    }
}

.sidebar-open .sidebar {
    background-color: rgba($backgroundColor, 0.98);
}
</style>
