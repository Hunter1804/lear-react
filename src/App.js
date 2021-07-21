import { Route, Switch } from 'react-router-dom';
import './App.css';
import Clock from './components/Clock/index';
import Header from './components/Header/index';
import NotFound from './components/NotFound/index';
import TodoList from './components/TodoList/index.js';
import ProductFeature from './features/Products/index.jsx';
import Counter from './features/Counter/index';
import MagicColor from './components/MagicColor/index';
import CartFeature from './features/Carts';

function App() {
    // useEffect(() => {
    //     const fetchProduct = async () => {
    //         const data = await productApi.getAll();
    //         console.log(data);
    //     };
    //     fetchProduct();
    // }, []);

    // const [todoList, setTodoList] = useState([
    //     { id: '1', title: 'abcaca' },
    //     { id: '2', title: 'abcaca123123' },
    // ]);

    // const [posts, setPosts] = useState([]);

    // const [paginate, setPaginate] = useState({
    //     _page: 1,
    //     _limit: 10,
    //     _totalRows: 11,
    // });

    // const [filter, setFilter] = useState({
    //     _page: 1,
    //     _limit: 10,
    //     title_like: '',
    // });

    // ko đc dùng async cho efect vì yêu cầu chạy theo thư tụ muốn dùng async thì phải viết function in efect
    // có thể dùng nhiều useEffect và nó sẽ chay theo thứ tự
    // useEffect(() => {
    //     async function callApiGetTodoList() {
    //         try {
    //             const query = queryString.stringify(filter);
    //             const url = 'http://js-post-api.herokuapp.com/api/posts?' + query;
    //             const response = await fetch(url);
    //             const responseJson = await response.json();
    //             const { data, pagination } = responseJson;

    //             setPosts(data);
    //             setPaginate(pagination);
    //         } catch (error) {
    //             console.log('fetch error: ' + error.message);
    //         }
    //     }
    //     callApiGetTodoList();
    // }, [filter]); // chỉ chạy khi filter thay đổi

    // useEffect( () => {

    //   console.log('call post APi')
    // }) // luôn luôn chạy khi component đc render

    // useEffect( () => {

    // code here
    //return  code clear khi can // tuong duong component unmount
    //   console.log('call todo APi')
    // }, []) // chạy 1 lần

    // function onChangePage(page) {
    //     console.log({ page });
    //     setFilter({ ...paginate, _page: page });
    // }

    // function clickTodoItem(item) {
    //     const newTodo = todoList.filter((todo) => todo.id !== item.id);
    //     setTodoList(newTodo);
    // }

    // function addTodoList(itemTodo) {
    //     const newItem = {
    //         id: todoList.length + 1,
    //         ...itemTodo,
    //     };

    //     const newTodoList = [...todoList];
    //     newTodoList.push(newItem);
    //     setTodoList(newTodoList);
    // }

    // function handleSearchForm(newValue) {
    //     console.log(newValue);
    //     setFilter({
    //         ...filter,
    //         _page: 1,
    //         title_like: newValue.q,
    //     });
    // }

    return (
        <div className="App">
            <Header />

            {/* chi render path dau tine thoan man trne url */}
            <Switch>
                <Route path="/todo" component={TodoList} />
                {/* <Route path="/add-todo" component={addTodoList} /> */}
                <Route path="/clock" component={Clock} />
                <Route path="/product" component={ProductFeature} />
                <Route path="/counter" component={Counter} />

                <Route path="/magic-color" component={MagicColor} />
                <Route path="/cart" component={CartFeature} />

                <Route component={NotFound} />
            </Switch>

            {/* <Route path="/color-box" component={ColorBox} />
            <Route path="/todo-form" component={TodoForm} />
            <Route path="/post" component={PostList} />

            <h2>Footer</h2> */}
            {/* <Clock />
      <ColorBox/>
      <TodoForm submitForm={addTodoList} />
      <TodoList todos={ todoList }  clickTodo={clickTodoItem} />
      
      <PostList postList={posts} searchSubmit={handleSearchForm} />
      <Paginate paginate = {paginate} onChangePage={onChangePage} />

      <MagicColor /> */}
        </div>
    );
}

export default App;
