import React from 'react';

class SearchBar extends React.Component {
  onInputChange(term) {
    // Should call something passed from parent component
  }

  render() {
    return (
      <div className="search">
        <input placeholder="Enter text to search for gifs!" onChange={event => this.onInputChange(event.target.value)} />
      </div>
    );
  }
}

export default SearchBar;