const Artist = require('../models/artist');

module.exports = (criteria, sortProperty, offset = 0, limit = 20) => {
  const query = Artist.find(buildQuery(criteria))
    .sort({ [sortProperty]: 1 })
    .skip(offset)
    .limit(limit);

  return Promise.all([query, Artist.find(buildQuery(criteria)).count()])
    .then((results) => {
      return {
        all: results[0],
        count: results[1],
        offset: offset,
        limit: limit
      };
    });
};

const buildQuery = (criteria) => {
  const query = {};

  if (criteria.name) {
    query.$text = { $search: criteria.name };
  }

  if (criteria.age) {
    query.age = {
      $gte: criteria.age.min,
      $lte: criteria.age.max
    };
  }

  if (criteria.yearsActive) {
    query.yearsActive = {
      $gte: criteria.yearsActive.min,
      $lte: criteria.yearsActive.max
    };
  }

  return query;
};

//-====================================================================================
import {
  SEARCH_ARTISTS,
  FIND_ARTIST,
  RESET_ARTIST
} from '../actions/types';

const INITIAL_STATE = {
  all: [],
  offset: 0,
  limit: 20
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEARCH_ARTISTS:
      return action.payload;
    case FIND_ARTIST:
      return { ...state, artist: action.payload };
    case RESET_ARTIST:
      return { ...state, artist: null };
    default:
      return state;
  }
};


// ====================================================================================
import _ from 'lodash';
import { hashHistory } from 'react-router';
import {
  SEARCH_ARTISTS,
} from './types';

import SearchArtists from '../../database/queries/SearchArtists';

export const searchArtists = (...criteria) => dispatch =>
  SearchArtistsProxy(...criteria)
    .then((result = []) =>
      dispatch({ type: SEARCH_ARTISTS, payload: result })
    );

const SearchArtistsProxy = (criteria, offset, limit) => {
  const result = SearchArtists(_.omit(criteria, 'sort'), criteria.sort, offset, limit);
  if (!result || !result.then) {
    return new Promise(() => {});
  }
  return result;
};

const refreshSearch = (dispatch, getState) => {
  const { artists: { offset, limit } } = getState();
  const criteria = getState().form.filters.values;

  dispatch(searchArtists({ name: '', ...criteria }, offset, limit));
};

// ======================================================================================
import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Paginator from './Paginator';
import * as actions from '../../actions';

class ArtistIndex extends Component {
  onChange(_id) {
    if (_.contains(this.props.selection, _id)) {
      this.props.deselectArtist(_id);
    } else {
      this.props.selectArtist(_id);
    }
  }

  renderList(artist) {
    const { _id } = artist;
    const classes = `collection-item avatar ${artist.retired && 'retired'}`;

    return (
      <li className={classes} key={_id}>
        <div>
          <input
            id={_id}
            type="checkbox"
            checked={_.contains(this.props.selection, _id)}
            onChange={() => this.onChange(_id)}
          />
          <label htmlFor={_id} />
        </div>
        <img src={artist.image} className="circle" />
        <div>
          <span className="title">
            <strong>{artist.name}</strong>
          </span>
          <p>
            <b>{artist.age}</b> years old
            <br />
            {artist.yearsActive} years active
          </p>
        </div>
        <Link to={`artists/${artist._id}`} className="secondary-content">
           <i className="material-icons">play_arrow</i>
         </Link>
      </li>
    );
  }

  renderPaginator() {
    if (this.props.artists.all.length) {
      return <Paginator />;
    }
  }

  renderEmptyCollection() {
    if (this.props.artists.all.length) { return; }

    return (
      <div className="center-align">
        <h5>No records found!</h5>
        <div>Try searching again</div>
      </div>
    );
  }

  renderRetire() {
    if (this.props.selection.length) {
      return (
        <div>
          <button
            className="btn"
            onClick={() => this.props.setRetired(this.props.selection)}
          >
            Retire
          </button>
          <button
            className="btn"
            onClick={() => this.props.setNotRetired(this.props.selection)}
          >
            Unretire
          </button>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderRetire()}
        <ul className="collection">
          {this.props.artists.all.map(this.renderList.bind(this))}
          {this.renderEmptyCollection()}
        </ul>

        {this.renderPaginator()}
      </div>
    );
  }
}

const mapStateToProps = ({ artists, selection }) => ({ artists, selection });

export default connect(mapStateToProps, actions)(ArtistIndex);
