import React, { Fragment } from 'react'
import { Form } from 'react-bootstrap'

export default function CategoryDropdown(props) {
    const categories = props.categories
    const populateDropdownCategory = (categories) => {
        if (categories) {
            return categories.map(category => <option key={category.id} value={category.name.name}>{category.name.name}</option>)
        }
    }
    const addSelectedCategory = (category) => {
        props.handleAddSectedCategoryToState(category)
    }
    return (
        <Fragment>
            <Form.Group controlId="category">
                <Form.Label>Select Category:</Form.Label>
                <Form.Control onChange={ (e) => addSelectedCategory(e.target.value) } as="select">
                    <option value="">Select Category</option>
                    { categories ? populateDropdownCategory(categories) : ( <option value="no data">No Data at this moment</option> ) } 
                </Form.Control>
            </Form.Group>
        </Fragment>
    )
}
