import React from "react";
import { Container, Card, Button, Badge } from "react-bootstrap";
import { BsStar } from "react-icons/bs";
import '../styles/ArticleCoin.css';

const ArticleCoin = (props) => {
  const dollarUSLocale = Intl.NumberFormat("en-US");
  const { id, symbol, name, priceUsd, explorer } = props;

  return (
    <>
      <Container className="mt-2">
        <Card bg="dark" text="white" className="mb-2">
          <Card.Body>
            <Card.Title className="Card__title">
              <div>
                {name} <Badge bg="secondary">{symbol}</Badge>
              </div>
              <div>
                <BsStar  className="Icon__favorite" onClick={() => console.log('ADD TO FAVORITE',id)} />
              </div>
            </Card.Title>
            <Card.Subtitle>
              Price Today : $ {dollarUSLocale.format(priceUsd)}
              <br />
              <br />
              {explorer}
            </Card.Subtitle>
            <br />
            <Button variant="outline-info" href={explorer} target="_blank">
              Go to page
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default ArticleCoin;
