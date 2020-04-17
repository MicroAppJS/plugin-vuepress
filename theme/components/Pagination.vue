<template>
    <component
        :is="comp"
        v-if="comp"
        :value="page"
        :page-count="pageCount"
        :click-handler="clickCallback"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'pagination'"
        :page-class="'page-item'"
    ></component>
</template>

<script>
export default {
    name: 'Pagination',
    props: {
        total: Number,
        currentPage: Number,
        limit: {
            type: Number,
            default: 10,
        },
    },
    data() {
        return {
            comp: null,
        };
    },
    computed: {
        page() {
            return this.currentPage;
        },
        pageCount() {
            return Math.ceil(this.total / this.limit);
        },
    },
    mounted() {
        import(/* webpackChunkName: "vuejs-paginate" */ 'vuejs-paginate').then(comp => (this.comp = comp.default || comp));
    },
    methods: {
        clickCallback(pageNum) {
            this.$emit('select', pageNum);
        },
    },
};
</script>

<style lang="stylus">
.pagination {
    display: inline-block;
    padding-left: 0;
    margin: 20px 0;
    border-radius: $borderRadius;
    transition: all 0.3s;
    box-shadow: $boxShadow;

    &:hover {
        box-shadow: $boxShadowHover;
    }
}

.pagination > li {
    display: inline;
    outline: none;
}

.pagination > li > a, .pagination > li > span {
    transition: color 0.2s, background-color 0.2s;
    outline: none;
    position: relative;
    float: left;
    padding: 3px 12px;
    margin-left: -1px;
    line-height: 1.42857143;
    color: $accentColor;
    text-decoration: none;
    background-color: $backgroundColor;
    border: 1px solid #ddd;
}

.pagination > li:first-child > a, .pagination > li:first-child > span {
    margin-left: 0;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
}

.pagination > li:last-child > a, .pagination > li:last-child > span {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
}

.pagination > li > a:hover, .pagination > li > span:hover, .pagination > li > a:focus, .pagination > li > span:focus {
    z-index: 3;
    color: $accentColor;
    background-color: #eee;
    border-color: #ddd;
}

.pagination > .active > a, .pagination > .active > span, .pagination > .active > a:hover, .pagination > .active > span:hover, .pagination > .active > a:focus, .pagination > .active > span:focus {
    z-index: 2;
    color: $whiteColor;
    cursor: default;
    background-color: $accentColor;
    border-color: $accentColor;
}

.pagination > .disabled > span, .pagination > .disabled > span:hover, .pagination > .disabled > span:focus, .pagination > .disabled > a, .pagination > .disabled > a:hover, .pagination > .disabled > a:focus {
    color: rgba($textColor, 0.65);
    cursor: not-allowed;
    background-color: $backgroundColor;
    border-color: #ddd;
}

.pagination-lg > li > a, .pagination-lg > li > span {
    padding: 10px 16px;
    font-size: 18px;
    line-height: 1.3333333;
}

.pagination-lg > li:first-child > a, .pagination-lg > li:first-child > span {
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
}

.pagination-lg > li:last-child > a, .pagination-lg > li:last-child > span {
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
}

.pagination-sm > li > a, .pagination-sm > li > span {
    padding: 5px 10px;
    font-size: 12px;
    line-height: 1.5;
}

.pagination-sm > li:first-child > a, .pagination-sm > li:first-child > span {
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
}

.pagination-sm > li:last-child > a, .pagination-sm > li:last-child > span {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
}
</style>
