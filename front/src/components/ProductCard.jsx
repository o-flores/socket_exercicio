import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';

const { io } = require("socket.io-client");
const socket = io('http://localhost:3001');

function ProductCard({ name, value, id, img }) {
  const [price, setPrice] = useState(value);
  const [disabled, setDisabled] = useState(false);

  function handleClick() {
    socket.emit('increaseValue', { id, price });
    if (price >= 100) setDisabled(true);
    else setDisabled(false);
  }

  useEffect(() => {
    socket.on('refreshValue', (data) => {
      if (data._id === id) setPrice(data.value);
    });
    if (price >= 100) setDisabled(true);
  }, [id, price]);

  return (
    <Card>
      <Card.Img src={img} style={{ width: '220px' }} />
      <Card.Body>
        <Card.Title><span>{name}</span></Card.Title>
        <Card.Text>
          Valor: <span>{price}</span>
        </Card.Text>
        <Button disabled={disabled} onClick={handleClick}>Dar um lance</Button>
      </Card.Body>
    </Card>
  )
}

export default ProductCard;