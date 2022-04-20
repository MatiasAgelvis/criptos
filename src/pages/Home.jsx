import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCoins, nextPageCoins } from "../redux/CriptoDucks";
import { Container, Button } from "react-bootstrap";
import Menu from "../components/Menu";
import ArticleCoin from "../components/ArticleCoin";

const Home = () => {
  const [isLoadingButton, setLoadingButton] = useState(false);

  const dispatch = useDispatch();

  const coins = useSelector((store) => store.coins);

  useEffect(() => {
    dispatch(getAllCoins());
  }, [dispatch]);

  const handleClick = async () => {
    setLoadingButton(true);
    await dispatch(nextPageCoins());
    setLoadingButton(false);
  };

  return (
    <>
      <Menu />
      {coins.data.map((coin) => (
        <ArticleCoin key={coin.id} {...coin} />
      ))}
      <Container>
        <div className="d-grid gap-2">
          <Button
            className="mb-3"
            variant="outline-primary"
            size="lg"
            disabled={isLoadingButton}
            onClick={!isLoadingButton ? handleClick : null}
          >
            {isLoadingButton ? "Loading…" : "More..."}
          </Button>
        </div>
      </Container>
    </>
  );
};

export default Home;
