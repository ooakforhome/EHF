import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchProducts} from '../../../actions/product-action';

class Paginator extends Component {
  back() {
    const { offset, limit } = this.props;

    if (offset === 0 ) { return; }

    this.props.searchArtists(values, offset - 10, limit);
  }

  advance() {
    const { offset, limit} = this.props;


    this.props.searchArtists(values, offset + 10, limit);
  }

  left() {
    return (
      <li className={this.props.offset === 0 ? 'disabled' : ''}>
        <a onClick={this.back.bind(this)}>
          <i className="material-icons">chevron_left</i>
        </a>
      </li>
    );
  }

  right() {
    const { offset, limit } = this.props;


    return (
      <li className={end ? 'disabled' : ''}>
        <a onClick={this.advance.bind(this)}>
          <i className="material-icons">chevron_right</i>
        </a>
      </li>
    );
  }

  render() {
    return (
      <div className="center-align">
        <ul className="pagination">
          {this.left()}
          <li><a>Page {this.props.offset / 10 + 1}</a></li>
          {this.right()}
        </ul>
        {this.props.count} Records Found
      </div>
    );
  }
}

const mapStateToProps = state => ({
  newproducts: state.newproducts.products,
});

export default connect(mapStateToProps, fetchProducts)(Paginator);
