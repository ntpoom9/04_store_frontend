import React, { useState } from 'react';
import axios from "axios";
import { Container, Row, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function AddProductForm() {
    const initProductState = {
        name: "",
        category: "",
        price: "",
        tags: [],
    }
    const [product, setProduct] = useState(initProductState);
    const [submited, setSubmited] = useState();

    //ให้ค่าเปลี่ยนตาม
    const handleInputChange = (event) => {
        let { name, value } = event.target;
        //split แยก string เป็น array
        if (name === "tags") {
            value = value.split(",");
        }
        setProduct({ ...product, [name]: value });
    };
    const saveProduct = () => {
        //prepare parameter for add product
        const param = {
            name: product.name,
            category: product.category,
            price: product.price,
            tags: product.tags,
        };
        //call api และส่งค่าไป
        axios.post("http://localhost:5000/api/products", param).then((response) => {
            console.log(response.data);
            setProduct(initProductState);
            setSubmited(true);
        }).catch((error) => {
            console.log(error);
        });
    };

    const newProduct = () => {
        setProduct(initProductState);
        setSubmited(true);
    }

    return (
        <Container>
            <Row>
                <h3>Add New Product</h3>
                {submited ? (
                    <>
                        <Alert color="success"><FontAwesomeIcon icon={faCheck}> </FontAwesomeIcon> You have submited successfully !!</Alert>
                        <Button className='btn btn-success' onClick={newProduct}>Add new product</Button>
                    </>
                ) : (
                    <>
                        <Form>
                            <FormGroup>
                                <Label for="Product Name">Product Name</Label>
                                <Input type='text' name="name" id="productName" value={product.name || ""} onChange={handleInputChange} placeholder='Enter product name.' />
                            </FormGroup>
                            <FormGroup>
                                <Label for="Product Name">Product Category</Label>
                                <Input type='text' name="category" id="productCategory" value={product.category || ""} onChange={handleInputChange} placeholder='Enter product category.' />
                            </FormGroup>
                            <FormGroup>
                                <Label for="Product Name">Product Price</Label>
                                <Input type='text' name="price" id="productPrice" value={product.price || ""} onChange={handleInputChange} placeholder='Enter product price.' />
                            </FormGroup>
                            <FormGroup>
                                <Label for="Product Name">Product Tags</Label>
                                <Input type='text' name="tags" id="productTags" value={product.tags || ""} onChange={handleInputChange} placeholder='Enter product tags.' />
                            </FormGroup>
                            <Button className='btn btn-success' onClick={saveProduct}>Add new product</Button>
                        </Form>
                    </>
                )}


            </Row>
        </Container>
    )
}

export default AddProductForm
