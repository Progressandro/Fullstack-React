import React, { Component } from 'react';
import { Row, Col, Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Label, Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

function RenderDish({ dish }) {
    if (dish !== null) {

        return (
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }
    else {
        return (
            <div></div>
        );
    }
}

function RenderComments({ comments }) {
    if (comments !== undefined && comments.length > 0) {
        let formattedComments = comments.map((singleComment) => {
            let options = { year: 'numeric', month: 'short', day: 'numeric' };
            return (
                <li key={singleComment.id}>
                    <p>{singleComment.comment}</p>
                    <small>--{singleComment.author}, {new Date(singleComment.date).toLocaleDateString("en-US", options)}</small>
                    <hr />
                </li>
            );
        });

        return (
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {formattedComments}
                </ul>
                <CommentForm />
            </div>
        );
    }
    else {
        return <div></div>;
    }
}

const DishDetail = (props) => {
    if (props.dish !== undefined) {
        let dish = props.dish;
        let comments = (props.comments !== null) ? props.comments : undefined;
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to='/home'>Home</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <Link to='/menu'>Menu</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            {dish.name}
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish={dish} />
                    <RenderComments comments={comments} />
                </div>
            </div>
        );
    }
    else {
        return (
            <div></div>
        );
    }
}


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
class CommentForm extends Component {


    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.handleComment = this.handleComment.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleComment(values) {
        this.toggleModal();
        console.log(JSON.stringify(values));
    }

    render() {
        return (
            <React.Fragment>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span> Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleComment(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" xs={12}>Rating</Label>
                                <Col xs={12}>
                                    <Control.select
                                        name="rating"
                                        className="form-control"
                                        model=".rating"
                                    >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" xs={12}>Your Name</Label>
                                <Col xs={12}>
                                    <Control.text
                                        id="author"
                                        name="author"
                                        className="form-control"
                                        model=".author"
                                        placeholder="Your Name"
                                        validators={{
                                            required,
                                            minLength: minLength(3),
                                            maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        show="touched"
                                        model=".author"
                                        messages={{
                                            required: 'Required.',
                                            minLength: 'Must be greater than 3 characters.',
                                            maxLength: 'Must be 15 characters or less.'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" xs={12}>Comment</Label>
                                <Col xs={12}>
                                    <Control.textarea
                                        id="comment"
                                        name="comment"
                                        className="form-control"
                                        model=".comment"
                                        rows="6"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Button type="submit" color="primary">Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

export default DishDetail;