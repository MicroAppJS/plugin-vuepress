const { fs, logger, path } = require('@vuepress/shared-utils')
const { dedent, findRegion } = require('./util');

module.exports = function snippet (md, options = {}) {
  const fence = md.renderer.rules.fence
  const root = options.root || process.cwd()

  md.renderer.rules.fence = (...args) => {
    const [tokens, idx, , { loader }] = args
    const token = tokens[idx]
    const [src, regionName] = token.src ? token.src.split('#') : ['']
    if (src) {
      if (loader) {
        loader.addDependency(src)
      }
      const isAFile = fs.lstatSync(src).isFile()
      if (fs.existsSync(src) && isAFile) {
        let content = fs.readFileSync(src, 'utf8')

        if (regionName) {
          const lines = content.split(/\r?\n/)
          const region = findRegion(lines, regionName)

          if (region) {
            content = dedent(
              lines
                .slice(region.start, region.end)
                .filter(line => !region.regexp.test(line.trim()))
                .join('\n')
            )
          }
        }

        token.content = content
      } else {
        token.content = isAFile ? `Code snippet path not found: ${src}` : `Invalid code snippet option`
        token.info = ''
        logger.error(token.content)
      }
    }
    return fence(...args)
  }

  function parser (state, startLine, endLine, silent) {
    const { $relativePath } = state.md || {};
    const CH = '<'.charCodeAt(0)
    const pos = state.bMarks[startLine] + state.tShift[startLine]
    const max = state.eMarks[startLine]

    // if it's indented more than 3 spaces, it should be a code block
    if (state.sCount[startLine] - state.blkIndent >= 4) {
      return false
    }

    for (let i = 0; i < 3; ++i) {
      const ch = state.src.charCodeAt(pos + i)
      if (ch !== CH || pos + i >= max) return false
    }

    // must be `<<< /ab/b`
    if (state.src.charCodeAt(pos + 3) !== ' '.charCodeAt(0)) {
      return false;
    }

    if (silent) {
      return true
    }

    const start = pos + 3
    const end = state.skipSpacesBack(max, pos)

    /**
     * raw path format: "/path/to/file.extension#region {meta}"
     *    where #region and {meta} are optionnal
     *
     * captures: ['/path/to/file.extension', 'extension', '#region', '{meta}']
     */
    const rawPathRegexp = /^(.+?(?:\.([a-z]+))?)(?:(#[\w-]+))?(?: ?({\d+(?:[,-]\d+)*}))?$/

    // 通过 @ 识别根目录
    const rawPath = state.src.slice(start, end).trim();
    const [filename = '', extension = '', region = '', meta = ''] = (rawPathRegexp.exec(rawPath) || []).slice(1)
    let _filename = filename;
    try {
      _filename = require.resolve(_filename);
    } catch (error) {
      _filename = _filename.replace(/^@/, root).trim();
    }

    state.line = startLine + 1

    const token = state.push('fence', 'code', 0)
    token.info = extension + meta
    token.src = ($relativePath 
      ? path.resolve(root, path.dirname($relativePath), _filename)  // 相对路径
      : path.resolve(root, _filename)) + region
    // token.src = path.resolve(root, filename) + region
    token.markup = '```'
    token.map = [startLine, startLine + 1]

    return true
  }

  md.block.ruler.before('fence', 'snippet', parser)
}
