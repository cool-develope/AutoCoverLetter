import React from 'react';
import {
    Card, CardSubtitle, CardBody, CardTitle
} from 'reactstrap';
import CardText from 'reactstrap/lib/CardText';
import { getUser } from "../utils/auth";

const BlogCard = (props) => {
    const { letter, setLetter } = props;
    const username = getUser()["name"];

    return (
        <Card className="my-1" onClick={() => setLetter(letter)}>
            <CardBody>
                <CardTitle className="font-weight-bold">{ letter['title'] }</CardTitle>
                <CardSubtitle className="font-italic">Created { letter['created_at'].substring(0, 10) } by { username }</CardSubtitle>
                <CardText>{ letter['message'].substring(0, 150) } .....</CardText>
            </CardBody>
        </Card>
    )
} 

export default BlogCard;