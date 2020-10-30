import React, { useState, useEffect, Fragment } from "react";
import { render } from "react-dom";
import BlogForm from "./components/BlogForm";
import BlogCard from "./components/BlogCard";
import NavHeader from "./components/NavHeader";
import { Row, Col } from 'reactstrap';
import BlogApp from "./components/BlogApp";

const App = (props) => {
    const [create, setCreate] = useState(false);
    const [letters, setLetters] = useState([]);
    const [letter, setLetter] = useState(null);
    const [cletter, setCletter] = useState(null);
    const [method, setMethod] = useState("Create");
    const [loaded, setLoaded] = useState(false);
    const [placeholder, setPlaceholder] = useState("Loading");

    const createLetter = (letter) => {

    };

    const clickCreate = (isModal) => {
        setCletter(null);
        setCreate(isModal);
        setMethod("Create");
    }

    const updateCreate = () => {
        setCletter(letter);
        setCreate(!create);
        setMethod("Update");
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
            setLetter(data[0]);  
        });
    }, [])

    return (
        <Fragment>
            <BlogForm method={method} formState={create} toggle={setCreate} letter={cletter} createLetter={createLetter} />
            <NavHeader isOpen={create} setCreate={clickCreate}/>
            <Row className="mx-auto">
                <Col xs="3">
                    {
                        letters.map(letter => (
                            <BlogCard key={letter.id} letter={letter} setLetter={letter => {
                                setLetter(letter);
                                setCletter(letter);
                            }} />
                        ))
                    }
                </Col>
                <Col xs="9">
                    <BlogApp letter={ letter } updateCreate={ updateCreate }/>
                </Col>
            </Row>
        </Fragment>
    );
}

export default App;

const container = document.getElementById("app");
render(<App />, container)