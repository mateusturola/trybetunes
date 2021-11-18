import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../Components/ MusicCard';
import '../Styles/album.css';

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

    getMusics(id).then((data) =>
      this.setState({
        album: data,
        artistName: data[0].artistName,
        collectionName: data[0].collectionName,
        collectionImage: data[0].artworkUrl100,
      })
    );
  }

  render() {
    const { album, artistName, collectionName, collectionImage } = this.state;
    const album02 = album.filter((alb) => alb.previewUrl !== undefined);
    return (
      <>
        <Header />
        <div data-testid="page-album" className="page-album">
          <div className="info-album">
            <img src={collectionImage} alt="collectionName" />
            <div className="album-text">
              <h2 data-testid="album-name">{collectionName}</h2>
              <h3 data-testid="artist-name">{artistName}</h3>
              <p data-testid="artist-name">{`${album02.length} tracks`}</p>
            </div>
          </div>
          <section className="list-musics">
            {album02.map((alb) => (
              <div key={alb.trackName} className="music-track">
                <MusicCard
                  previewUrl={alb.previewUrl}
                  trackName={alb.trackName}
                  trackId={alb.trackId}
                  album={alb}
                />
              </div>
            ))}
          </section>
        </div>
      </>
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
