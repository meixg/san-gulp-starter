import List from './todo/List.san';

export function init() {
    var list = new List();
    list.attach(document.getElementById('wrap'));
}
