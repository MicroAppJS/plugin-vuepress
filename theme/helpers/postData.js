// 过滤博客数据
export function filterPosts(posts, isTimeline) {
    return posts.filter(item => {
        const { title, frontmatter: { home, date, private: isPrivate, __type__ } } = item;
        if (__type__ !== 'post') { // 判断是不是 post
            return false;
        }
        return isTimeline === true
            ? !(home === true || title === undefined || date === undefined || isPrivate === true)
            : !(home === true || title === undefined || isPrivate === true);
    });
}

// 排序博客数据
export function sortPostsByStickyAndDate(posts) {
    return posts.sort((prev, next) => {
        const prevSticky = prev.frontmatter.sticky;
        const nextSticky = next.frontmatter.sticky;
        if (prevSticky && nextSticky) {
            return prevSticky === nextSticky ? compareDate(prev, next) : (prevSticky - nextSticky);
        } else if (prevSticky && !nextSticky) {
            return -1;
        } else if (!prevSticky && nextSticky) {
            return 1;
        }
        return compareDate(prev, next);
    });
}

// 按时间排序，如果没有 Date 属性则过滤掉
export function sortPostsByDate(posts) {
    return posts.sort((prev, next) => {
        return compareDate(prev, next);
    });
}

// 比对时间
export function compareDate(a, b) {
    return getTimeNum(b) - getTimeNum(a);
}

// 获取时间的数字类型
export function getTimeNum(obj) {
    let date = obj.frontmatter.date || obj.birthTimestamp || obj.lastUpdatedTimestamp || Date.now();
    if (typeof date === 'string' && date.includes('.')) { // 简单去时区
        date = date.split('.')[0];
    }
    obj.date = new Date(date);
    return obj.date.getTime();
}
