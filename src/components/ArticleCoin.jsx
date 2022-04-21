import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPrices } from "../redux/CriptoDucks";
import { Container, Card, Button, Badge } from "react-bootstrap";
import { BsStar } from "react-icons/bs";
import "../styles/ArticleCoin.css";
import Trend from "react-trend";

const ArticleCoin = (props) => {
  const dollarUSLocale = Intl.NumberFormat("en-US");
  const { id, symbol, name, priceUsd, explorer } = props;

  const dispatch = useDispatch();
  const prices = useSelector((store) => store.coins.prices[id]);
  const interval = useSelector((store) => store.interval.interval);
  const slice = useSelector((store) => store.interval.slice);

  const [timeLabel, setTimeLabel] = useState("");
  const [timeFactor, setTimeFactor] = useState(1);

  useEffect(() => {
    dispatch(getPrices(id, interval));
  }, [id, interval, dispatch]);

  // console.log(prices)

  useEffect(() => {
    if (interval.includes("m")) {
      setTimeLabel("Minutes");
    }
    if (interval.includes("h")) {
      setTimeLabel("Hours");
    }
    if (interval.includes("d")) {
      setTimeLabel("Days");
    }
    setTimeFactor(interval.match(/\d+/)[0]);
  }, [interval]);

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
                <BsStar
                  className="Icon__favorite"
                  onClick={() => console.log("ADD TO FAVORITE", id)}
                />
              </div>
            </Card.Title>
            <div className="vsplit-body">
              <div className="vsplit-left">
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
              <div className="vsplit-right">
                {prices ? (
                  <div>
                    <Trend
                      data={prices.slice(-slice)}
                      gradient={["#284CB2", "#35DAF7", "#F96CA8"]}
                      strokeLinecap="round"
                      autoDraw
                      autoDrawDuration={3000}
                      autoDrawEasing="ease-in"
                      smooth
                      radius={1000}
                      strokeWidth={3}
                    />
                    <div className="trend-labels d-flex justify-content-between opacity-75">
                      <span>
                        {prices.length * timeFactor} {timeLabel} Ago
                      </span>
                      <span>Now</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="spinner-grow text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default ArticleCoin;
