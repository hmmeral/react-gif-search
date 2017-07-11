import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import GifList from './gif_list';
import GifModal from './gif_modal';
import * as Actions from '../actions';

class Favorites extends Component {

  componentWillMount() {
    this.props.actions.fetchFavoritedGifs();
  }

  render() {
    return (
      <div>
        <GifList gifs={ this.props.gifs }
                 onGifSelect={ selectedGif => this.props.actions.openModal({selectedGif}) }
                 onFavoriteSelect={ selectedGif => this.props.actions.favoriteGif({selectedGif}) }
                 onFavoriteDeselect={ selectedGif => this.props.actions.unfavoriteGif({selectedGif}) }
                 isAuthenticated={ this.props.authenticated }
                 isFavorite={true} />
        <GifModal modalIsOpen={ this.props.modalIsOpen }
                  selectedGif={ this.props.selectedGif }
                  onRequestClose={ () => this.props.actions.closeModal() } />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    gifs: state.gifs.favorites,
    modalIsOpen: state.modal.modalIsOpen,
    selectedGif: state.modal.selectedGif
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
