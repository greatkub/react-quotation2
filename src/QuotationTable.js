import { useState, useRef, useEffect } from "react";
import { Button, Table, Container, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { IoMdTrash } from "react-icons/io";


function QuotationTable({ data, setDataItems }) {
  const [dataRows, setDataRows] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDis, setTotalDis] = useState(0);
  // sumdisc = 0;


  const styles = {
    textCenter: { textAlign: 'center' },
    textRight: { textAlign: 'right' },
    textLeft: { textAlign: 'left' }
  }
  useEffect(() => {
    let sum = 0;
    let sumdisc = 0

    const z = data.map((v, i) => {
      let amount = v.qty * v.ppu
      let amountleft = amount - v.disc // pass
      sum += amount
      sumdisc += parseInt(v.disc)
      return (
        <tr key={i}>
          <td style={styles.textCenter}><IoMdTrash onClick={() => deleteClick(i)} /></td>
          <td style={styles.textLeft}>{v.qty}</td>
          <td>{v.item}</td>
          <td style={styles.textLeft}>{numberWithCommas(v.ppu)}</td>
          <td style={styles.textLeft}>{numberWithCommas(v.disc)}</td>
          <td style={styles.textLeft}>{numberWithCommas(amountleft)}</td>
        </tr>
      );
    });

    setDataRows(z);
    setTotalPrice(sum);
    setTotalDis(sumdisc)

  }, [data]);

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const clearTable = () => {
    setDataItems([]);
    setDataRows([]);
  };

  const deleteClick = (i) => {
    data.splice(i, 1)
    setDataItems([...data])
  }

  return (

    <Container>
      {/* This is quotation table.
      <br />
      Number of items {data.length}
      <br /> */}
      <Row>
        <Col>

          <h1>Quotation</h1>
        </Col>
      </Row>
      <Button onClick={clearTable} variant="dark">Clear</Button>

      {/* <Table striped bordered hover>
        <thead>
          <tr style={{ backgroundColor: "green", color: "white" }}>
            <th>Qty</th>
            <th>Item</th>
            <th>Price/Unit</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>{dataRows}</tbody>
        <tfoot>
          <tr>
            <th colSpan={3}></th>
            <th style={styles.textCenter}>Total</th>
            <th style={styles.textRight}>{numberWithCommas(totalPrice)}</th>
          </tr>
        </tfoot>
      </Table> */}

      <Table striped bordered hover>
        <thead>
          <tr style={{ backgroundColor: "green", color: "white" }}>
            <th></th>
            <th>Qty</th>
            <th>Item</th>
            <th>Price/Unit</th>
            <th>Discount</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>{dataRows}</tbody>
        <tfoot>
          <tr>
            <th colSpan={4}></th>
            <th style={styles.textRight}>Total discount</th>
            <th style={styles.textLeft}>{numberWithCommas(parseInt(totalDis))}</th>
          </tr>
          <tr>
            <th colSpan={4}></th>
            <th style={styles.textRight}>Total amount</th>
            <th style={styles.textLeft}>{numberWithCommas(totalPrice - totalDis)}</th>

          </tr>
        </tfoot>
      </Table>

    </Container>
  );
}

export default QuotationTable;
