/* eslint no-unused-expressions: 0, one-var: 0 */
import Breadcrumb from '../';
import {mount} from 'enzyme';

describe('<Breadcrumb />', function() {

  const breadcrumb = [
    {title: 'Home', to: '/home'},
    {title: 'Contracts', to: '/contracts'},
    {title: 'Items', to: '/items'}
  ];

  it('renders breadcrumb items as children', function() {
    const wrapper = mount(<Breadcrumb items={breadcrumb} />);
    const links = ['Home', 'Contracts', 'Items'];
    wrapper.find('.breadcrumb-item').forEach((item, index) => {
      expect(item.text()).to.eql(links[index]);
    });
  });

  it('each item displays its title', function() {
    const wrapper = mount(<Breadcrumb items={breadcrumb} />);
    const titles = ['Home', 'Contracts', 'Items'];
    wrapper.find('.breadcrumb-item').forEach((item, index) => {
      expect(item.at(0).text()).to.eql(titles[index]);
    });
  });

  it('renders just the title if to-attribute is not present', function() {
    const customBreadcrumb = [{title: 'Plain text'}];
    const wrapper = mount(<Breadcrumb items={customBreadcrumb} />);
    expect(wrapper.find('.breadcrumb-item').at(0).find('a')).to.have.length(0);
    expect(wrapper.find('.breadcrumb-item').at(0).find('span')).to.have.length(1);
  });

});
