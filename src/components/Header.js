import { useContext } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { FetchContext } from "../context/FetchDataContext";

const Header = () => {
  const { searchTerm, onFormSearch, onFormSubmit } = useContext(FetchContext);

  return (
    <header className="my-4">
      <h4>
        <span className="title">Github</span> Jobs
      </h4>
      <section className="header my-4">
        <Form onSubmit={onFormSubmit}>
          <InputGroup>
            <Form.Control
              placeholder="Language/Framework e.g Node"
              value={searchTerm}
              onChange={onFormSearch}
            />
            <Button variant="primary" type="submit">
              Search
            </Button>
          </InputGroup>
        </Form>
      </section>
    </header>
  );
};

export default Header;
