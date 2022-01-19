import { useState, useRef, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import QuotationTable from "./QuotationTable";

import { Container, Row, Col, Form, Button } from "react-bootstrap";
import useLocalStorage from 'react-localstorage-hook';


function App() {
  const itemRef = useRef();
  const ppuRef = useRef();
  const qtyRef = useRef();
  const discountRef = useRef();

  // discountRef.current.value = 0


  // const [dataItems, setDataItems] = useState([]);
  const [dataItems, setDataItems] = useLocalStorage("dataItems", []);


  const dummyProductList = [
    { id: "p001", name: 'Macbook Air m1', price: 32900 },
    { id: "p002", name: 'Macbook Pro m1', price: 42000 },
    { id: "p003", name: 'Macbook 16 inch m1 max', price: 124900 },
    { id: "p004", name: 'Homepod Mini', price: 3300 },
    { id: "p005", name: 'Ipad mini', price: 17900 },
    { id: "p006", name: 'Ipad Air', price: 19900 }
  ];

  const productChange = (e) => {
    const pid = itemRef.current.value;
    const product = dummyProductList.find((e) => e.id == pid);
    ppuRef.current.value = product.price
  }

  const options = dummyProductList.map(v => {
    return <option value={v.id}>{v.name}</option>
  })



  const addItem = () => {
    if (itemRef.current.value == "") {
      alert("Item name is empty");
      return;
    }
    // let quiPrice = qtyRef.current.value * ppuRef.current.value
    // let quiDis = qtyRef.current.value * discountRef.current.value
    // if (ppuRef.current.value < discountRef.current.value) {
    //   alert("The discount is more than the product price, fill it again to prevent negative number.");
    //   return;
    // }
    if (discountRef.current.value == "") {
      discountRef.current.value = 0
    }
    if (qtyRef.current.value == "") {
      qtyRef.current.value = 0
    }
    if (ppuRef.current.value == "") {
      ppuRef.current.value = 0
    }


    const pid = itemRef.current.value
    const product = dummyProductList.find(e => e.id == pid)

    var itemObj = {
      pid: pid,
      item: product.name,
      ppu: ppuRef.current.value,
      qty: qtyRef.current.value,
      disc: discountRef.current.value
    };

    // function whereIsIndex(arr) {
    //   for (var i = 0; i < arr.length; i++) {
    //     if (arr[i].pid == pid && arr[i].ppu == ppuRef.current.value) {
    //       return i;
    //     }
    //   }
    //   // When not found in above loop then return -1, not found!
    //   return -1;
    // }

    // const index = whereIsIndex(dataItems)
    //get index of productid in array
    const index = dataItems.map(i => i.pid && i.ppu).indexOf(pid && ppuRef.current.value)
    console.log(index)


    if (index == -1) {
      const amount = qtyRef.current.value * ppuRef.current.value

      console.log("no", amount)

      if (amount >= discountRef.current.value) {
        dataItems.push(itemObj);
      } else {
        alert("The discount is more than the total price, Please add it again with appropriate discount.")
      }

    } else {
      console.log("yes")
      // if(dataItems[index].ppu != ppuRef.current.value ) {
      //   dataItems.push(itemObj);
      // }else {
      const amount = (parseInt(dataItems[index].qty) + parseInt(qtyRef.current.value)) * parseInt(dataItems[index].ppu)
      // }
      // dataItems[index].qty = parseInt(dataItems[index].qty) + parseInt(qtyRef.current.value)
      // dataItems[index].disc =  parseInt(dataItems[index].disc) + parseInt(discountRef.current.value)

      if (amount >= parseInt(dataItems[index].disc) + parseInt(discountRef.current.value)) {
        dataItems[index].qty = parseInt(dataItems[index].qty) + parseInt(qtyRef.current.value)
        dataItems[index].disc = parseInt(dataItems[index].disc) + parseInt(discountRef.current.value)
      } else {
        alert("The discount is more than the total price, Please add it again with appropriate discount.")
        // alert(amount)

      }

      // console.log("boo", amount)

      console.log(dataItems[index].qty)

    }

    // dataItems.push(itemObj);
    setDataItems([...dataItems]);
    console.log("after", dataItems);

    // for (var i = 0; i < dataItems.length; i++) {
    //   console.log(dataItems[i])
    //   const areTherePid = (e) => e == pid
    //   console.log(dataItems[i].findIndex(areTherePid));

    // }


  };

  return (
    <Container>
      <Row>
        <Col xs={4}>

          <Form>
            <Form.Group className="mb-3" controlId="formItem">
              <Form.Label>Item</Form.Label>
              <Form.Select aria-label="Default select example" ref={itemRef} onChange={productChange}>
                {options}
              </Form.Select>

            </Form.Group>
            <Form.Group className="mb-3" controlId="formItem">
              <Form.Label>Price</Form.Label>
              <Form.Control type="text" placeholder="0" ref={ppuRef}>

              </Form.Control>

            </Form.Group>
            <Form.Group className="mb-3" controlId="formItem">
              <Form.Label>Quantity</Form.Label>
              <Form.Control type="text" placeholder="0" ref={qtyRef}>

              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formItem">
              <Form.Label>Discount</Form.Label>
              <Form.Control type="text" placeholder="0" ref={discountRef}>

              </Form.Control>
            </Form.Group>

            <Button variant="outline-dark" onClick={addItem}>
              Add
            </Button>
          </Form>
        </Col>
        <Col>


          <div id="outputPanel" style={{ float: "right", width: "100%" }}>
            <QuotationTable data={dataItems}
              setDataItems={setDataItems} />
          </div>


          {/* </div> */}
        </Col>
      </Row>

    </Container>
  );
}

export default App;
