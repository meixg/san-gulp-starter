import * as san from 'san';
import * as service from '../service';
import template from './List.html!text';

export default san.defineComponent({
    template: template,
    initData: function () {
        const categories = service.categories();
        return {
            aaa: 'aaa',
            categories,
            todos: service.todos()
        };
    },

    route: function () {
        var route = this.data.get('route');
        var todos = service.todos(+(route.query.category || 0));

        this.data.set('todos', todos);
        if (!this.data.get('categories')) {
            this.data.set('categories', service.categories());
        }
    },

    doneTodo: function (index) {
        var todo = this.data.get('todos', index);
        service.doneTodo(todo.id);

        this.data.set('todos.' + index + '.done', true);
    },

    rmTodo: function (index) {
        var todo = this.data.get('todos', index);
        service.rmTodo(todo.id);

        this.data.removeAt('todos', index);
    }
});
