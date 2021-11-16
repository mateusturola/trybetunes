import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  addSong,
  getFavoriteSongs,
  removeSong,
} from '../services/favoriteSongsAPI';
import Load from './Load';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      saving: false,
      favorite: false,
      // favoritesList: [],
    };
    this.handleCheck = this.handleCheck.bind(this);
    this.loadFavorites = this.loadFavorites.bind(this);
  }

  componentDidMount() {
    this.loadFavorites();
  }

  handleCheck(album) {
    const { favorite } = this.state;
    const { handler } = this.props;
    if (favorite) {
      this.setState({ saving: true }, () => removeSong(album)
        .then(() => this.setState({ saving: false, favorite: false }, handler)));
    }

    if (!favorite) {
      this.setState({ saving: true }, () => addSong(album)
        .then(() => this.setState({ saving: false, favorite: true }, handler)));
    }
  }

  loadFavorites() {
    const { trackName } = this.props;
    this.setState({ saving: true });
    getFavoriteSongs().then((favorites) => this.setState({
      saving: false,
      favorite: favorites.some((fav) => fav.trackName === trackName),
    }));
  }

  render() {
    const { album, trackName, previewUrl, trackId } = this.props;
    const { saving, favorite } = this.state;
    return (
      <div key={ trackName }>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
        </audio>
        {saving ? (
          <Load />
        ) : (
          <label htmlFor={ `fav-${trackName}` }>
            <input
              type="checkbox"
              id={ `fav-${trackName}` }
              data-testid={ `checkbox-music-${trackId}` }
              onChange={ () => this.handleCheck(album) }
              checked={ favorite }
            />
            Favorita
          </label>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  album: PropTypes.shape({
    artistId: PropTypes.number,
  }).isRequired,
  handler: PropTypes.func.isRequired,
};

export default MusicCard;
