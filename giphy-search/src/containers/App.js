import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import GifList from '../components/GifList';
import GifModal from '../components/GifModal';
import SearchBar from '../components/SearchBar';
import '../styles/app.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <SearchBar onTermChange={this.props.actions.requestGifs} />
        <GifList gifs={ this.props.gifs } onGifSelect={null} /* Here we should pass an arrow function that takes in a selectedGif variable and calls open modal action instead of null*/ />
        <GifModal /* Check out what props we should pass in the GifModal component */
                  onRequestClose={ () => this.props.actions.closeModal() } />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    gifs: state.gifs.data,
    // Map the redux state to props, which later should be passed to child components (should be two lines)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);