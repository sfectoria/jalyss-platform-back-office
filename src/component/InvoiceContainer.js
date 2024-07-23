import React from 'react';
import Container from 'react-bootstrap/Container';
import InvoiceForm from './InvoiceForm';


export default function InvoiceContainer(){
    return (
        <div className="App d-flex flex-column align-items-center justify-content-center w-100">
        <Container>
          <InvoiceForm/>
        </Container>
      </div>
    )
}