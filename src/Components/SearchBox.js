import React from 'react';
// import Map, {GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react'
import '../App.css';
import Component from '../Components'
import PropTypes from 'prop-types';

export class SearchBox extends React.Component {
  static propTypes = {
    maps: PropTypes.shape({
      places: PropTypes.shape({
        SearchBox: PropTypes.func,
      }),
      event: PropTypes.shape({
        clearInstanceListeners: PropTypes.func,
      }),
    }).isRequired,
    placeholder: PropTypes.string,
    onPlacesChanged: PropTypes.func,
  };

  static defaultProps = {
    placeholder: 'Search...',
    onPlacesChanged: null,
  };


  constructor(props) {
    super(props);
    this.searchInput = React.createRef();

    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    const {
      maps,
      map
    } = this.props;
    var options = {
      componentRestrictions: {country: 'sg'}
    };
    if (map && maps.places){
      this.searchBox = new maps.places.Autocomplete(this.searchInput.current, options);
      map.controls[maps.ControlPosition.TOP_LEFT].push(this.searchBox.current);
      this.searchBox.addListener('place_changed', this.onPlacesChanged);
    }
  }

  componentWillUnmount() {
    const {
      maps: { event },
    } = this.props;

    event.clearInstanceListeners(this.searchBox);
  }

  onPlacesChanged = () => {
    console.log(this.searchBox.getPlace())
  };


  render() {
    return (
      <input
        ref={this.searchInput}
        placeholder={'Search'}
        type="text"
        style={{
          width: '392px',
          height: '48px',
          fontSize: '20px',
          padding: '12px 104px 11px 64px',
        }}
      />
    );
  }
}

export default SearchBox