import React from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

import VideoContext from '../../context/VideoContext';
import {
    clearInputValue,
    isValidInputValue,
    setValidationHint,
} from '../../helpers/auxiliaryFunctions';

import './searchBar.css';

const SearchBar = () => {
    const [state, setState] = React.useState([]);

    const { setUrl } = React.useContext(VideoContext);

    const handleChange = (e) => {
        const { value } = e.target;
        setState(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setUrl([state]);
        clearInputValue('.form__field--input');
    };

    return (
        <Form className="form shadow p-3 mb-5 bg-white rounded" onSubmit={handleSubmit}>
            <FormGroup className="form__field">
                <Input
                    id="searchBar"
                    name="searchBar"
                    className="form__field--input"
                    placeholder="Please enter your link here"
                    type="text"
                    title="Please enter your link here"
                    value={state.value}
                    onChange={handleChange}
                    required
                />
                <Label for="searchBar" className="form__field--label">
                    Enter your link
                </Label>
            </FormGroup>
            {setValidationHint(state)}
            <Button className="form__button" disabled={!isValidInputValue(state)}>
                Add Video !
            </Button>
        </Form>
    );
};

export default SearchBar;
