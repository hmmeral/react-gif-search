import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';

import SearchBar from '../components/search_bar';
import GifList from '../components/gif_list';
import GifModal from '../components/gif_modal';

import '../styles/app.css';
import _ from 'lodash';

class Home extends Component {

  render (){
    const requestGifs = _.debounce(this.props.actions.requestGifs , 500);

    return (
        <div>
          <SearchBar onTermChanged={ requestGifs } />

          <GifList
            gifs={ this.props.gifs }
            onGifSelect={ selectedGif => this.props.actions.openModal({selectedGif}) }
            onFavoriteSelect={ selectedGif => this.props.actions.favoriteGif({selectedGif}) }
            onFavoriteDeselect={ selectedGif => this.props.actions.unfavoriteGif({selectedGif}) }
            isAuthenticated={ this.props.authenticated } />

          <GifModal
            modalIsOpen={ this.props.modalIsOpen }
            selectedGif={ this.props.selectedGif }
            onRequestClose={ () => this.props.actions.closeModal() } />
        </div>
    );
  }

}

function mapStateToProps (state){
  return {
    authenticated: state.auth.authenticated,
    gifs: state.gifs.data,
    modalIsOpen: state.modal.modalIsOpen,
    selectedGif: state.modal.selectedGif
  };
}

function mapDispatchToProps (dispatch){
  return {
    actions : bindActionCreators (Actions, dispatch)
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (Home);
