import React, { Component } from 'react';
import Header from '../Components/Header';
import Load from '../Components/Load';
import ShowAlbuns from '../Components/ShowAlbuns';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import '../Styles/search.css'


class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      isDisable: true,
      searching: false,
      beFound: false,
      ArtistaName: '',
      album: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.validadeButton = this.validadeButton.bind(this);
    this.searchAlbuns = this.searchAlbuns.bind(this);
    this.clearInput = this.clearInput.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, this.validadeButton);
  }

  validadeButton() {
    const { searchInput } = this.state;
    if (searchInput.length >= 2) {
      this.setState({ isDisable: false });
    }
  }

  clearInput() {
    this.setState({ searchInput: '', searching: false }, this.validadeButton);
  }

  searchAlbuns() {
    const { searchInput } = this.state;
    this.setState({ searching: true, ArtistaName: searchInput });
    searchAlbumsAPI(searchInput).then((data) =>
      this.setState({ album: data, beFound: true }, () => this.clearInput())
    );
  }

  render() {
    const {
      state: { isDisable, searchInput, searching, beFound, album, ArtistaName },
      handleChange,
      searchAlbuns,
    } = this;

    if (searching) {
      return <Load />;
    }
    return (
      <>
        <Header />
        <div className="search-area">
          <input
            type="text"
            name="searchInput"
            value={searchInput}
            placeholder="Digite o nome do Artista"
            onChange={handleChange}
            data-testid="search-artist-input"
          />
          <button
            type="button"
            disabled={isDisable}
            data-testid="search-artist-button"
            onClick={searchAlbuns}
          >
            Pesquisar
          </button>
        </div>
        {beFound && (
          <div className="albuns">
            <ShowAlbuns album={album} ArtistaName={ArtistaName} />
          </div>
        )}
      </>
    );
  }
}

export default Search;
