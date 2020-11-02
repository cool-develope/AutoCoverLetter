import React, { useState, useEffect, Fragment } from "react";
import { render } from "react-dom";
import BlogForm from "./components/BlogForm";
import BlogCard from "./components/BlogCard";
import NavHeader from "./components/NavHeader";
import { Row, Col } from 'reactstrap';
import BlogApp from "./components/BlogApp";
import { searchResult, filterResult } from "./utils/builder";
import { getToken } from "./utils/auth";

const App = (props) => {
    const [create, setCreate] = useState(false);
    const [letters, setLetters] = useState([]);
    const [allLetters, setAllLetters] = useState([]);
    const [letter, setLetter] = useState(null);
    const [cletter, setCletter] = useState(null);
    const [method, setMethod] = useState("Create");
    const [loaded, setLoaded] = useState(false);
    const [filter, setFilter] = useState(false);

    const token = getToken();

    const createLetter = (letter) => {
        let fetchMethod = "POST";
        let url = "/api/letter/list/";
        let messageBody = JSON.stringify({
            'title': letter.title,
            'message': letter.message,
            'is_public': letter.is_public,
        });

        if (method == "Update") {
            url = "/api/letter/detail/" + cletter.id + "/";
            if (letter.is_delete) {
                fetchMethod = "DELETE";
                messageBody = "";
            } else {
                fetchMethod = "PUT";
            }
        } else if (method == "Modify") {
            messageBody = JSON.stringify({
                'title': letter.title,
                'message': letter.message,
                'is_public': false,
            });
        }
        const requestOptions = {
            method: fetchMethod,
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': token,
            },
            body: messageBody
        };

        setLoaded(false);
        fetch(url, requestOptions)
            .then(response => {
                if (response.status >= 400) {
                    return console.log("Something went wrong!");
                }
                return response.json();
            })
            .then(data => {
                setLoaded(true);
            }).catch(error => {
                console.log(error);
            });
        getLetters();
    };

    const setSearch = keys => {
        setLetters(searchResult(letters, keys));
        setLetter(letters[0]);
    }

    const clickCreate = (isModal) => {
        setCletter(null);
        setCreate(isModal);
        setMethod("Create");
    }

    const updateCreate = (createType) => {
        setCletter(letter);
        setCreate(!create);
        setMethod(createType);
    }

    const getLetters = () => {
        setLoaded(false);
        fetch("/api/letter/list")
            .then(response => {
                if (response.status >= 400) {
                    return console.log("Something went wrong!");
                }
                return response.json();
            })
            .then(data => {
                setLoaded(true);
                setLetters(data);
                setAllLetters(data);
                setLetter(data[0]);
            });
    }

    useEffect(() => {
        getLetters();
    }, [])

    return (
        !loaded ?
            <Fragment><h1>Loading...</h1></Fragment> :

            (<Fragment>
                <BlogForm method={method} formState={create} toggle={setCreate} letter={cletter} createLetter={createLetter} />
                <NavHeader isOpen={create} setCreate={clickCreate} setSearch={keys => setSearch(keys)} setFilter={() => {
                    if (!filter) setLetters(filterResult(allLetters));
                    else setLetters(allLetters);
                    setLetter(letters[0]);
                    setFilter(!filter);
                }} />
                <Row className="my-2 mx-2 h-100 overflow-hidden">
                    <Col xs="3" style={{ "overflowY": "auto", "height": "900px" }}>
                        {
                            letters?.map(letter => (
                                <BlogCard key={letter.id} letter={letter} setLetter={letter => {
                                    setLetter(letter);
                                    setCletter(letter);
                                }} />
                            ))
                        }
                    </Col>
                    <Col xs="9">
                        <BlogApp letter={letter} updateCreate={updateCreate} />
                    </Col>
                </Row>
            </Fragment>)

    );
}

export default App;

const container = document.getElementById("app");
render(<App />, container)