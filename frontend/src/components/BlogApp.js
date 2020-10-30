import React from 'react';
import { Jumbotron, Input, Button } from 'reactstrap';
import { getUser, isLogin } from '../utils/auth.js';
import { convert } from '../utils/builder.js'

const BlogApp = (props) => {
    const { letter, updateCreate } = props;
    const username = getUser()['name'];

    return (
        <Jumbotron className="m-1 p-2">
            <h1>{ letter?.title || ""}</h1>
            <Input type="textarea" className="font-weight-light" value={ convert(letter?.message || "") } rows="25" onChange={() => ""}/>
            <hr className="my-2" />
            {
                isLogin() ?
                (username == letter?.username ?
                <Button className="btn btn-success" onClick={ updateCreate }>Update</Button>:
                <Button className="btn btn-success" onClick={ updateCreate }>Modify</Button>):
                <Button className="btn btn-secondary" disabled>Disable</Button>
            }
            
            <Button className="btn btn-info float-right">Copy</Button>
        </Jumbotron>
    );
};

export default BlogApp;