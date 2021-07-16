'use strict';

module.exports = (md) => {

  md.renderer.rules.image = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    const hrefIndex = token.attrIndex('src')
    if (hrefIndex >= 0) {
      const alt = token.content || (token.children && token.children[0] && token.children[0].content) || '';
      token.attrSet('alt', alt);
    }
    return self.renderToken(tokens, idx, options)
  }

}