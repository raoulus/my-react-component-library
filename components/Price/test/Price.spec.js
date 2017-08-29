import {render} from 'enzyme';
import Price from '../';

describe('<Price />', function() {

  let props;

  describe('for 1 USD', function() {

    before(function() {
      props = {
        value: 1,
        currency: 'USD',
        locale: 'de'
      };
    });

    it('should render 1.00$', function() {
      const wrapper = render(<Price {...props} />);
      expect(wrapper.text()).to.equal('1$');
    });
  });
  describe('for 1000 EUR', function() {
    before(function() {
      props = {
        value: 1000,
        currency: 'EUR',
        locale: 'de'
      };
    });

    it('should render 1,000€', function() {
      const wrapper = render(<Price {...props} />);
      expect(wrapper.text()).to.equal('1.000€');
    });
  });
  describe('for 1000056.56 EUR', function() {
    before(function() {
      props = {
        value: 1000056.56,
        currency: 'EUR',
        locale: 'de'
      };
    });

    it('should render 1,000,056€', function() {
      const wrapper = render(<Price {...props} />);
      expect(wrapper.text()).to.equal('1.000.057€');
    });
  });

  describe('for 1000056.56 EUR with decimal places', function() {
    before(function() {
      props = {
        value: 1000056.56,
        currency: 'EUR',
        decimalPlaces: 2,
        locale: 'de'
      };
    });

    it('should render 1.000.056,56€', function() {
      const wrapper = render(<Price {...props} />);
      expect(wrapper.text()).to.equal('1.000.056,56€');
    });
  });

  describe('for 1000056.56 $ with decimal places', function() {
    before(function() {
      props = {
        value: 1000056.56,
        currency: 'USD',
        decimalPlaces: 2,
        locale: 'en'
      };
    });

    it('should render $1,000,056.56', function() {
      const wrapper = render(<Price {...props} />);
      expect(wrapper.text()).to.equal('$1,000,056.56');
    });
  });

  describe('for 77.3567 $ with decimal places', function() {
    before(function() {
      props = {
        value: 77.3567,
        currency: 'USD',
        decimalPlaces: 4,
        locale: 'en'
      };
    });

    it('should render $77.3567', function() {
      const wrapper = render(<Price {...props} />);
      expect(wrapper.text()).to.equal('$77.3567');
    });
  });

  describe('for a falsy value', function() {

    before(function() {
      props = {
        value: null,
        currency: 'USD',
        locale: 'de'
      };
    });

    it('should render 0 when value is null', function() {
      const wrapper = render(<Price {...props} />);
      expect(wrapper.text()).to.equal('0$');
    });
  });
});
