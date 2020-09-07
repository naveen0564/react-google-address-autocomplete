import React from "react";
import { Col, Row } from "reactstrap";
import { Table } from 'reactstrap';


class Autocomplete extends React.Component {

  componentForm = {
  street_number: "short_name",
  route: "long_name",
  locality: "long_name",
  administrative_area_level_1: "short_name",
  country: "long_name",
  postal_code: "short_name"
};
  constructor(props) {
    super(props);
    this.autocompleteInput = React.createRef();
    this.autocomplete = null;
    this.fillInAddress = this.fillInAddress.bind(this);
  }

  componentDidMount() {
    this.autocomplete = new window.google.maps.places.Autocomplete(
      this.autocompleteInput.current,
      { types: ["geocode"] }
    );
    this.autocomplete.addListener("place_changed", this.fillInAddress);
  }

  
  fillInAddress() {
    // Get the place details from the autocomplete object.
    const place = this.autocomplete.getPlace();
  
    for (const component in this.componentForm) {
      document.getElementById(component).value = "";
      document.getElementById(component).disabled = false;
    }
  
    // Get each component of the address from the place details,
    // and then fill-in the corresponding field on the form.
    for (const component of place.address_components) {
      const addressType = component.types[0];
  
      if (this.componentForm[addressType]) {
        const val = component[this.componentForm[addressType]];
        document.getElementById(addressType).value = val;
      }
    }
  }

  render() {
    return (
      <div className="container">
        <Row className="container-top text-center">
          <Col md={12}>
            <h1 className="header-text">Google Address Autocomplete</h1>
          </Col>
        </Row>
        <Row className="container-top">
          <Col className="text-center" md={12}>
            <input
              ref={this.autocompleteInput}
              id="autocomplete"
              placeholder="Enter your address"
              type="text"
              className="auto-complete"
            />
          </Col>
        </Row>
        <Row className="container-top">
        <Col md={12}>
        <Table id="address">
        <tbody>
            <tr>
              <td className="label">Street Address1</td>
              <td className="slimField">
                <input className="field" id="street_number" disabled />
              </td>
              <td className="label">Street Address2</td>
              <td className="wideField" colSpan="2">
                <input className="field" id="route" disabled />
              </td>
            </tr>
            <tr>
              <td className="label">City</td>
              <td className="wideField" colSpan="3">
                <input className="field" id="locality" disabled />
              </td>
            </tr>
            <tr>
              <td className="label">State</td>
              <td className="slimField">
                <input
                  className="field"
                  id="administrative_area_level_1"
                  disabled
                />
              </td>
              <td className="label">Zip Code</td>
              <td className="wideField">
                <input className="field" id="postal_code" disabled />
              </td>
            </tr>
            <tr>
              <td className="label">Country</td>
              <td className="wideField" colSpan="3">
                <input className="field" id="country" disabled />
              </td>
            </tr>
            </tbody>
          </Table>
        </Col>
        </Row>
      </div>
    );
  }
}

export default Autocomplete;
