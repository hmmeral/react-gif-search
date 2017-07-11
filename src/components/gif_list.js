import React from 'react';

import GifItem from './gif_item';

const GifList = (props) => {

    const gifItems = props.gifs.map ( (gif) => {
        return (
          <GifItem
            key={gif.id}
            gif={gif}
            onGifSelect={props.onGifSelect}
            onFavoriteSelect={props.onFavoriteSelect}
            onFavoriteDeselect={props.onFavoriteDeselect}
            isAuthenticated={props.isAuthenticated}
            isFavorite={props.isFavorite} />
         );
    });

    if(!props.gifs){
        return <div>No data</div>
    }

    return (
      <div className="gif-list">
        {gifItems}
      </div>
    );
}

export default GifList;
