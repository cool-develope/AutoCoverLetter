import React, { useState, useEffect, Fragment } from "react";
import { render } from "react-dom";
import BlogForm from "./components/BlogForm";
import BlogCard from "./components/BlogCard";
import NavHeader from "./components/NavHeader";
import { Container, Row, Col } from 'reactstrap';
import BlogApp from "./components/BlogApp";

const App = (props) => {
    const [create, setCreate] = useState(false);
    const [letters, setLetters] = useState([]);
    const [letter, setLetter] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [placeholder, setPlaceholder] = useState("Loading");

    const createLetter = (letter) => {

    };

    const clickCreate = (isModal) => {
        setCreate(isModal);
        setLetter(null);
    }

    useEffect(() => {
        fetch("/api/letter/list")
        .then(response => {
            if (response.status > 400) {
                return setPlaceholder("Something went wrong!");
            }
            return response.json();
        })
        .then(data => {
            setLoaded(true);
            setLetters(data);    
        });
    }, [])

    return (
        <Fragment>
            <BlogForm formState={create} toggle={setCreate} letter={letter} createLetter={createLetter} />
            <NavHeader isOpen={create} setCreate={clickCreate}/>
            <Row className="mx-auto">
                <Col xs="3">
                    {
                        letters.map(letter => (
                            <BlogCard key={letter.id} letter={letter} setLetter={setLetter} />
                        ))
                    }
                </Col>
                <Col xs="9">
                    <BlogApp letter={ letter|| letters[0] } />
                </Col>
            </Row>
        </Fragment>
    );
}

export default App;

const container = document.getElementById("app");
render(<App />, container)