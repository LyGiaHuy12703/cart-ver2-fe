import { useState } from "react";
import { Button, Card } from "react-bootstrap";

const ProductCard = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleChangeData = (productId) => {
    onAddToCart({
      productId: productId,
      quantity: quantity,
    });
  };

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img
        variant="top"
        src={product.photo} // Correct field name
        alt={product.name}
        style={{ height: "200px", objectFit: "cover", padding: "10px" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title style={{ fontSize: "16px" }}>{product.name}</Card.Title>
        <Card.Text
          className="text-muted"
          style={{ fontSize: "18px", fontWeight: "bold" }}
        >
          {product.price.toLocaleString()} đ
        </Card.Text>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <br />
        <Button
          variant="info"
          className="mt-auto text-white"
          onClick={() => handleChangeData(product.productId)}
        >
          Thêm vào giỏ
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
