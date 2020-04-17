import ExcerptContent from './components/ExcerptContent.js';

export default ({ Vue }) => {
    // <CustomContent :page-key="post.excerptKey"></CustomContent>
    Vue.component('ExcerptContent', ExcerptContent);
};
