import React from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

import VideoContext from "../../context/VideoContext";

import { isValidInputValue, setValidationHint } from "../../helpers/auxiliaryFunctions";

import "./searchBar.css";

const SearchBar = () => {
  const [state, setState] = React.useState("");

  const context = React.useContext(VideoContext);

  if (!context) return null;

  const { setUrl } = context;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setState(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setUrl([state]);
    setState("");
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
          value={state}
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
