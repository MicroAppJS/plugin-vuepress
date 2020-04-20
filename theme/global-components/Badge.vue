<script>
import ParentLayout from '@default-theme/global-components/Badge.vue';
export default {
    extends: ParentLayout,
};
</script>

<style lang="stylus" scoped>
.badge {
    display: inline-block;
    font-size: 14px;
    height: 18px;
    line-height: 18px;
    border-radius: 3px;
    padding: 0 6px;
    color: white;
    background-color: #42b983;

    &.tip, &.green, &.easy {
        background-color: $badgeTipColor;
    }

    &.error, &.red, &.hard {
        background-color: $badgeErrorColor;
    }

    &.warning, &.warn, &.yellow, &.medium {
        background-color: $badgeWarningColor;
    }

    & + & {
        margin-left: 5px;
    }
}
</style>

