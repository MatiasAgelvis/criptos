import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPrices } from "../redux/CriptoDucks";
import { Container, Card, Button, Badge } from "react-bootstrap";
import { BsStar } from "react-icons/bs";
import '../styles/ArticleCoin.css';
import Trend from 'react-trend';

const ArticleCoin = (props) => {
  const dollarUSLocale = Intl.NumberFormat("en-US");
  const { id, symbol, name, priceUsd, explorer } = props;

  const dispatch = useDispatch();
  const prices = useSelector((store) => store.coins.prices);
  const interval = useSelector((store) => store.interval.interval);

  useEffect(() => {
    dispatch(getPrices(id, interval));
  }, [id, interval, dispatch]);

  // useEffect(() => {
  //   console.log(id, id in prices)
  // }, [prices]);

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
            {id in prices? <Trend data={prices[id]} gradient={['#284CB2', '#35DAF7', '#F96CA8']} strokeLinecap='round' autoDraw autoDrawDuration={3000} autoDrawEasing="ease-in" smooth radius={1000} strokeWidth={3}/>  
            : <div className="text-center">
              <div className="spinner-grow text-primary" role="status"><span className="visually-hidden">Loading...</span></div>
              </div>
             }
            </div>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default ArticleCoin;
