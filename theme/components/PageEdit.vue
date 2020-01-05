<script>
import ParentLayout from '@default-theme/components/PageEdit.vue';
export default {
    name: 'PageEdit',
    extends: ParentLayout,
    lastUpdated() {
        return this.$page.lastUpdatedFormat;
    },
};
</script>
