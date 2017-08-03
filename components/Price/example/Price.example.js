import React from 'react';
import Price from 'my-react-component-library/components/Price';

export default class Demo extends React.Component {

  render() {
    const css = {display: 'inline-block', width: '50%'};
    return <div>
      <p style={css}>
        <b>DE</b><br />
        <Price value={1200} locale="de" /><br />
        <Price value={1200} locale="de" decimalPlaces={2} /><br />
        <Price value={1200} locale="de" decimalPlaces={2} currency="USD" /><br />
        <Price value={null} locale="de" decimalPlaces={2} currency="USD" /><br />
        <Price value={null} locale="de" decimalPlaces={2} currency="USD" fallback="-" />
      </p>
      <p style={css}>
        <b>EN</b><br />
        <Price value={1200} locale="en" /><br />
        <Price value={1200} locale="en" decimalPlaces={2} /><br />
        <Price value={1200} locale="en" decimalPlaces={2} currency="USD" /><br />
        <Price value={null} locale="en" decimalPlaces={2} currency="USD" /><br />
        <Price value={null} locale="en" decimalPlaces={2} currency="USD" fallback="-" />
      </p>
    </div>;
  }

}
