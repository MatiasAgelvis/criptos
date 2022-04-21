// TODO
// price of shiba too small to display
// implement star button
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPrices } from "../redux/CriptoDucks";
import { Container, Card, Button, Badge } from "react-bootstrap";
import { BsStar } from "react-icons/bs";
import "../styles/ArticleCoin.css";
import Trend from "react-trend";

function looseRound(number, factor = 0.8) {
  return number % 1 >= factor ? Math.ceil(number) : Math.floor(number);
}

function simplifyTimeLabel(timer, unit) {
  console.log(timer, unit);
  // minutes (m)
  if (unit == "m" && timer >= 60) {
    timer = looseRound(timer / 60, 0.95);
    unit = "h";
  }
  // hours (h)
  if (unit == "h" && timer >= 24) {
    timer = looseRound(timer / 24, 0.9);
    unit = "d";
  }
  // days (d)
  if (unit == "d" && timer >= 30) {
    timer = looseRound(timer / 30, 0.85);
    unit = "M";
  }
  // months (M)
  if (unit == "M" && timer >= 12) {
    timer = looseRound(timer / 12, 0.8);
    unit = "Y";
  }

  return [timer, unit];
}

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

  useEffect(() => {
    if (prices) {
      let [timer, unit] = simplifyTimeLabel(
        prices.slice(-slice).length * interval.match(/\d+/)[0],
        interval.match(/[A-Za-z]/)[0]
      );

      setTimeFactor(timer);

      let timeUnits = {
        m: "Minute",
        h: "Hour",
        d: "Day",
        M: "Month",
        Y: "Year",
      };

      setTimeLabel(timeUnits[unit] + (timer > 1 ? "s" : ""));
    }
  }, [interval, prices, slice]);

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
                        {timeFactor} {timeLabel} Ago
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
