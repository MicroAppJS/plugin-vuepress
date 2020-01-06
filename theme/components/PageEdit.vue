<script>
import ParentLayout from '@default-theme/components/PageEdit.vue';
export default {
    name: 'PageEdit',
    extends: ParentLayout,
    computed: {
        lastUpdated() {
            return this.$page.lastUpdatedFormat;
        },
    },
};
</script>
