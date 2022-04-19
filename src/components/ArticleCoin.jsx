import React, { useState, useEffect } from "react";
import { Container, Card, Button, Badge } from "react-bootstrap";
import { BsStar } from "react-icons/bs";
import '../styles/ArticleCoin.css';
import Trend from 'react-trend';

const ArticleCoin = (props) => {
  const dollarUSLocale = Intl.NumberFormat("en-US");
  const { id, symbol, name, priceUsd, explorer } = props;
  const [prices, setPrices] = useState([])

  useEffect(() => {
    async function getData () {
      let promise = await fetch(`https://api.coincap.io/v2/assets/${id}/history?interval=d1`)
      let results = await promise
      let rawData = await results.json()
      console.log(id, props, rawData.data.map(x => x.priceUsd))
      setPrices(rawData.data.map(x => parseFloat(x.priceUsd)))
    }
    getData()
  }, [name]);

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
            <div className='vsplit-body'>
            <div className='vsplit-left'>

              Price Today : $ {dollarUSLocale.format(priceUsd)}
              <br />
              <br />
              {explorer}

            <br />
            <br />
            <Button variant="outline-info" href={explorer} target="_blank">
              Go to page
            </Button>
            </div>
            <div className='vsplit-right'>
             <Trend data={prices} gradient={['#284CB2', '#35DAF7', '#F96CA8']}/> 
            </div>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default ArticleCoin;
