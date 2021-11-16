import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ShowAlbuns extends Component {
  render() {
    const { album: albuns, ArtistaName } = this.props;

    if (albuns.length === 0) {
      return (
        <h3>Nenhum álbum foi encontrado</h3>
      );
    }

    return (
      <section>
        <h3>
          Resultado de álbuns de:
          {' '}
          {ArtistaName}
        </h3>
        <ul>
          {albuns.map(
            ({
              artworkUrl100,
              collectionName,
              artistName,
              collectionId,
            }) => (
              <li className="Album" key={ collectionName }>
                <Link
                  to={ `/album/${collectionId}` }
                  data-testid={ `link-to-album-${collectionId}` }
                >
                  <img src={ artworkUrl100 } alt={ collectionName } />
                  <p>{collectionName}</p>
                  <p>{artistName}</p>
                </Link>
              </li>
            ),
          )}
        </ul>
      </section>
    );
  }
}

ShowAlbuns.propTypes = {
  album: PropTypes.arrayOf(PropTypes.object).isRequired,
  ArtistaName: PropTypes.string.isRequired,
};

export default ShowAlbuns;
