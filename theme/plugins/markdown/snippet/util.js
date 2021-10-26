module.exports = {
    dedent, testLine, findRegion,
};

function dedent(text) {
    const wRegexp = /^([ \t]*)(.*)\n/gm
    let match; let minIndentLength = null

    while ((match = wRegexp.exec(text)) !== null) {
        const [indentation, content] = match.slice(1)
        if (!content) continue

        const indentLength = indentation.length
        if (indentLength > 0) {
            minIndentLength
                = minIndentLength !== null
                    ? Math.min(minIndentLength, indentLength)
                    : indentLength
        } else break
    }

    if (minIndentLength) {
        text = text.replace(
            new RegExp(`^[ \t]{${minIndentLength}}(.*)`, 'gm'),
            '$1'
        )
    }

    return text
}

function testLine(line, regexp, regionName, end = false) {
    const [full, tag, name] = regexp.exec(line.trim()) || []

    return (
        full
        && tag
        && name === regionName
        && tag.match(end ? /^[Ee]nd ?[rR]egion$/ : /^[rR]egion$/)
    )
}

function findRegion(lines, regionName) {
    const regionRegexps = [
        /^\/\/ ?#?((?:end)?region) ([\w*-]+)$/, // javascript, typescript, java
        /^\/\* ?#((?:end)?region) ([\w*-]+) ?\*\/$/, // css, less, scss
        /^#pragma ((?:end)?region) ([\w*-]+)$/, // C, C++
        /^<!-- #?((?:end)?region) ([\w*-]+) -->$/, // HTML, markdown
        /^#((?:End )Region) ([\w*-]+)$/, // Visual Basic
        /^::#((?:end)region) ([\w*-]+)$/, // Bat
        /^# ?((?:end)?region) ([\w*-]+)$/ // C#, PHP, Powershell, Python, perl & misc
    ]

    let regexp = null
    let start = -1

    for (const [lineId, line] of lines.entries()) {
        if (regexp === null) {
            for (const reg of regionRegexps) {
                if (testLine(line, reg, regionName)) {
                    start = lineId + 1
                    regexp = reg
                    break
                }
            }
        } else if (testLine(line, regexp, regionName, true)) {
            return { start, end: lineId, regexp }
        }
    }

    return null
}
