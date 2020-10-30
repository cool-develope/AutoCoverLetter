import React from 'react';
import { Jumbotron } from 'reactstrap';
import { convert } from '../utils/builder.js'

const BlogApp = (props) => {
    const { letter } = props;

    return (
        <Jumbotron className="m-1 p-2">
            <h1>{ letter?.title || ""}</h1>
            <p className="font-weight-light">{ letter?.message || ""}</p>
            <hr className="my-2" />
            <p>{ convert(letter?.message) || "" }</p>
        </Jumbotron>
    );
};

export default BlogApp;