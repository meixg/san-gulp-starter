define(function (require) {
    var List = require('./todo/List');

    return {
        init: function () {
            var list = new List();
            list.attach('#wrap');
        }
    };

});
