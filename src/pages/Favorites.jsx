import React, { Component } from 'react';
import MusicCard from '../Components/ MusicCard';
import Header from '../Components/Header';
import Load from '../Components/Load';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import '../Styles/album.css';
import '../Styles/musicCard.css';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      fav: [],
      saving: false,
    };
    this.getFavoriteSongs = this.getFavoriteSongs.bind(this);
    this.handler = this.handler.bind(this);
  }

  componentDidMount() {
    this.getFavoriteSongs();
  }

  handler() {
    this.getFavoriteSongs();
  }

  getFavoriteSongs() {
    this.setState({ saving: true });
    getFavoriteSongs().then((favorites) =>
      this.setState({
        fav: favorites,
        saving: false,
      })
    );
  }

  render() {
    const { fav, saving } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {saving ? (
          <Load />
        ) : (
          <>
            <div className="info-album">
                <h2 className="fav-name">Favoritos</h2>
            </div>
            <section className="list-musics">
              {fav.map((alb) => (
                <div className="music-track">
                  <MusicCard
                    previewUrl={alb.previewUrl}
                    trackName={alb.trackName}
                    artistName={alb.artistName}
                    trackId={alb.trackId}
                    album={alb}
                    handler={this.getFavoriteSongs}
                  />
                </div>
              ))}
            </section>
          </>
        )}
      </div>
    );
  }
}

export default Favorites;

// A atualização do componente pai e filho, foi feita com a ajuda:
// https://www.ti-enxame.com/pt/javascript/como-atualizar-o-estado-do-pai-no-react/823853409/
