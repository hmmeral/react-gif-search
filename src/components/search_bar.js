import React, { Component } from 'react';

class SearchBar extends Component {

  onInputChanged(term){
    this.props.onTermChanged(term);
  }

  render (){

    return (
         <div>
           <input
             type="text"
             placeholder="Enter text to search for gifs!"
             onChange={ event => this.onInputChanged(event.target.value) } />
        </div>
    );

    // return (
    //   <div className="row">
    //   <div className="col-lg-6 col-lg-offset-3">
    //      <div className = "input-group">
    //        <input
    //          className="form-control"
    //          type="text"
    //          placeholder="Enter text to search for gifs!"
    //          onChange={ event => this.onInputChanged(event.target.value) } />
    //        <span className="input-group-btn">
    //           <button className="btn btn-default" type="button">Go!</button>
    //         </span>
    //      </div>
    //     </div>
    //     </div>
    // );
  }
}

export default SearchBar;
