import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../Components/ MusicCard';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      album: [],
    };
  }

  componentDidMount() {
    const {
      props: {
        match: {
          params: { id },
        },
      },
    } = this;

    getMusics(id).then((data) => this.setState({
      album: data,
      artistName: data[0].artistName,
      collectionName: data[0].collectionName,
    }));
  }

  render() {
    const { album, artistName, collectionName } = this.state;
    const album02 = album.filter((alb) => alb.previewUrl !== undefined);
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <h2 data-testid="album-name">{collectionName}</h2>
          <h3 data-testid="artist-name">{artistName}</h3>
        </div>
        <section>
          {album02.map((alb) => (
            <li key={ alb.trackName }>
              <MusicCard
                previewUrl={ alb.previewUrl }
                trackName={ alb.trackName }
                trackId={ alb.trackId }
                album={ alb }
              />
            </li>
          ))}
        </section>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,
};

export default Album;
