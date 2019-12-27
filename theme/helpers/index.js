const tagColorArr = [
    '#e15b64',
    '#f47e60',
    '#f8b26a',
    '#abbd81',
    '#849b87',
    '#e15b64',
    '#f47e60',
    '#f8b26a',
    '#f26d6d',
    '#67cc86',
    '#fb9b5f',
    '#3498db',
];

export function getOneColor(index = Math.floor(Math.random() * tagColorArr.length)) {
    index = index % tagColorArr.length;
    return tagColorArr[index];
}

export function formatDate(time, fmt = 'yyyy-MM-dd hh:mm:ss') {
    time = time.replace(/-/g, '/');
    const date = new Date(time);
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, date.getFullYear() + '').substr(4 - RegExp.$1.length);
    }

    const o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
    };

    for (const key in o) {
        if (RegExp(`(${key})`).test(fmt)) {
            const str = o[key] + '';
            fmt = fmt.replace(RegExp.$1, str.length === 2 ? str : '0' + str);
        }
    }
    return fmt;
}
