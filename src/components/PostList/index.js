import React, {useState} from 'react';
import PropTypes from 'prop-types';

PostList.propTypes = {
    postList: PropTypes.array,
    searchSubmit: PropTypes.func,
};

PostList.defaultProps = {
    postList: [],
    searchSubmit: null,
}

function PostList(props) {
    const {postList, searchSubmit} = props;
    const [textSearch, setTextSearch] = useState('')

    function handleSubmitSearch (e) {
        const value = e.target.value;
        setTextSearch(value);
        
        if(! value || ! searchSubmit)  return;
        const filterText = {
            q : value,
        }
        searchSubmit(filterText);
    }

    return (
        <div>
            <form>
                <label htmlFor="search">Search</label>
                <input id="search" type="text" value={textSearch} onChange={ handleSubmitSearch } />
            </form>

            <ul>
                { postList.map( (item) => (
                    <li 
                        key={item.id} 
                    > {item.title} 
                    </li>
                )) }
            </ul>
        </div>
    );
}

export default PostList;