import ClipboardJS from 'clipboard';
import Clipboard from '@theme/components/Clipboard';

function getName(name) {
    return `__clipboard_${name}`;
}

function getAttribute(el, key) {
    if (el.getAttribute) {
        return el.getAttribute(key);
    }
    if (el.attributes) {
        return el.attributes[key];
    }
    return null;
}

export default function({ Vue }) {
    // 注册到vue原型上
    Vue.prototype.ClipboardJS = ClipboardJS;

    const mixins = {
        created() {
            this[getName('onCopy')] = event => {
                const textRange = getSelection().getRangeAt(0);
                if (String(textRange).length < this[getName('minLength')]) return;

                event.preventDefault();
                if (this[getName('noCopy')]) return;

                const node = document.createElement('div');
                node.appendChild(getSelection().getRangeAt(0).cloneContents());

                const lang = this.$lang;
                const author = this.$frontmatter.author || this.$i18nText('author') || this.$site.title;
                const instance = new Vue({
                    render: h => h(Clipboard, {
                        props: {
                            html: node.innerHTML,
                            lang, author,
                        },
                    }),
                }).$mount();

                const { innerHTML, innerText } = instance.$el;
                if (event.clipboardData) {
                    event.clipboardData.setData('text/html', innerHTML);
                    event.clipboardData.setData('text/plain', innerText);
                } else if (window.clipboardData) {
                    window.clipboardData.setData('text', innerText);
                }
            };
        },

        updated() {
            const role = getAttribute(this.$el, 'role');
            if (role) {
                this.__registerClipboardElement(role === 'content');
            }
        },
        methods: {
            __registerClipboardElement(value) {
                if (!value) return;

                let copyright = this.$frontmatter.copyright || this.$blogConfig.copyright;
                if (!copyright) return;

                if (typeof copyright !== 'object') {
                    copyright = {};
                }
                copyright = Object.assign({
                    noSelect: false,
                    noCopy: false,
                    minLength: 0,
                }, copyright);

                this[getName('minLength')] = copyright.minLength;
                this[getName('noCopy')] = copyright.noCopy;

                const noSelect = copyright.noSelect;
                if (noSelect) {
                    this.$el.style.userSelect = 'none';
                } else {
                    this.$el.addEventListener('copy', this[getName('onCopy')]);
                }
            },
        },

        beforeDestory() {
            this.$el.removeEventListener('copy', this[getName('onCopy')]);
        },
    };

    Vue.mixin(mixins);
}

