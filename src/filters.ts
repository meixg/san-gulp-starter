export function formatDate(value, format) {
    return require('moment')(value).format(format);
}