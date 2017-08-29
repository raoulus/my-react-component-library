import React, {PropTypes} from 'react';

const currencyMapping = {
  USD: '$',
  EUR: '€'
};

/**
 * Render a number as a price. Position of currency is controlled
 * by locale.
 */
export default class Price extends React.Component {
  static propTypes = {
    value: PropTypes.number,
    currency: PropTypes.oneOf([
      'EUR', 'USD'
    ]),
    locale: PropTypes.oneOf([
      'en', 'de', 'en-us'
    ]).isRequired,
    decimalPlaces: PropTypes.number,
    /**
     * gets displayed when value is falsy (0, undefined, null)
     */
    fallback: PropTypes.string
  }

  static defaultProps = {
    decimalPlaces: 0,
    currency: 'EUR',
    locale: 'en'
  };

  render() {
    const {currency, decimalPlaces, fallback, locale} = this.props;
    const currencySign = currencyMapping[currency];
    const currencyTag = (<span key="currency" className="currency" dangerouslySetInnerHTML={{__html: currencySign}}></span>);
    let {value} = this.props;

    if (!value && fallback) {
      return <span className="price">{fallback}</span>;
    }

    value = value || 0;

    let price = [numberFormatting(value, locale, decimalPlaces)];

    if (['en-us', 'en'].includes(locale)) {
      price.unshift(currencyTag);
    } else {
      price.push(currencyTag);
    }

    return (<span className="price">{price}</span>);
  }
}

function numberFormatting(number, locale, decimalPlaces) {
  return <span key="number">{format(number, locale, decimalPlaces)}</span>;
}

function format(n, locale = 'en', decimalPlaces = 0) {
  const fractionalCapacity = Math.pow(10, decimalPlaces);
  const rounded = Math.round(n * fractionalCapacity) / fractionalCapacity;
  const roundedAsString = String(parseFloat(rounded).toFixed(decimalPlaces));
  const currenctSeparator = roundedAsString.indexOf('.') > -1 ? '.' : ',';
  const [integer, fractional] = String(roundedAsString).split(currenctSeparator);

  let result = formatThousands(integer, locale);

  if (fractional) {
    const separator = ['en-us', 'en'].indexOf(locale) > -1 ? '.' : ',';
    result = result.concat(separator, fractional);
  }
  return result;
}

function formatThousands(value, locale) {
  let sep = '$1.';
  if (['en-us', 'en'].indexOf(locale) !== -1) {
    sep = '$1,';
  }
  return String(Math.floor(value)).replace(/(\d)(?=(\d{3})+$)/g, sep);
}
