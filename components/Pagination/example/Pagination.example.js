import React from 'react';
import Pagination from 'my-react-component-library/components/Pagination';

export default class Demo extends React.Component {

  constructor(props) {
    super();
    this.state = {
      activePage: 1,
      totalItemsCount: 25,
      itemsCountPerPage: 1
    };
    this.handlePageChange = ::this._handlePageChange;
  }

  _handlePageChange(pageNumber) {
    this.setState({activePage: pageNumber});
  }

  render() {
    return (
      <div>
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={this.state.itemsCountPerPage}
          totalItemsCount={this.state.totalItemsCount}
          onChange={this.handlePageChange}
          prevPageText="&nbsp;"
          nextPageText="&nbsp;"
        />
      </div>
    );
  }

}
