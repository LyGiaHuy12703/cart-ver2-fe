import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UserCart = () => {
  const [data, setData] = useState(null);
  const nav = useNavigate();
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get("http://localhost:8080/api/cart/products", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        console.log({ res });
        toast.success(res.data.message);
        setData(res.data.data);
      })
      .catch((e) => {
        console.log({ e });
      });
  };

  const handleDeleteCartItem = (id) => {
    axios
      .delete(`http://localhost:8080/api/cart/item/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        toast.success(res.message);
        getData();
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };
  const calculateTotalPrice = () => {
    return data?.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  };
  const handleCheckout = () => {
    axios
      .post("http://localhost:8080/api/cart/checkout", null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        toast.success(res.data.message);
        nav("/products");
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };
  return (
    <>
      <div className=" d-flex align-items-center justify-content-center ">
        <h1 style={{ fontSize: 40 }}>Cart của tôi</h1>
      </div>
      <div className="container">
        <Table className="mt-3" striped bordered hover>
          <thead>
            <tr>
              <th>Cart.ID</th>
              <th>CartItem.ID</th>
              <th>Hình ảnh</th>
              <th>Tên sản phẩm</th>
              <th>Số lượng</th>
              <th>Đơn giá</th>
              <th>Thành tiền</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          {data && data.length > 0 ? (
            data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.cartId}</td>
                <td>
                  <img
                    src={item.product.photo}
                    alt={item.product.name}
                    width={50}
                  />
                </td>
                <td>{item.product.name}</td>
                <td>{item.quantity}</td>
                <td>{item.product.price.toLocaleString()}</td>
                <td>
                  {(item.quantity * item.product.price).toLocaleString()} đ
                </td>
                <td>
                  {/* Thêm các thao tác nếu cần, như nút xóa hoặc chỉnh sửa */}
                  <button
                    className="btn btn-danger bg-danger text-white"
                    onClick={() => handleDeleteCartItem(item.id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                No rows
              </td>
            </tr>
          )}
        </Table>
        <div className="bg-success p-3 text-white">
          <Container>
            <Row>
              <Col></Col>
              <Col>
                <div className="d-flex justify-content-between">
                  <div>Tổng tiền</div>
                  <div>{calculateTotalPrice()?.toLocaleString()} đ</div>
                  <div>
                    <button
                      className="btn bg-success text-white bg-success"
                      onClick={handleCheckout}
                    >
                      Đặt hàng
                    </button>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};

export default UserCart;
