import { useEffect, useRef, useState, FormEvent } from "react";
import { Card } from "../../components/Card";
import { api } from "../../services/api";
import styles from "./styles.module.scss";

interface PokemonProps {
  name: string;
  url: string;
}

export function Home() {
  const [perPage, setPerPage] = useState(21);
  const [pokemons, setPokemons] = useState<PokemonProps[]>([]);
  const [searchedPokemons, setSearchedPokemons] = useState<PokemonProps[]>([]);

  useEffect(() => {
    api.get(`/pokemon/?limit=1200`).then((response) => {
      setPokemons(response.data.results);
      setSearchedPokemons(response.data.results);
    });
  }, []);

  const inputRef = useRef<HTMLInputElement>(null);

  function handleSearch(event: FormEvent) {
    event.preventDefault();

    if (inputRef.current?.value !== undefined) {
      const pokemonName = inputRef.current.value.toLowerCase();
      const newPokemons = pokemons.filter((pokemon) =>
        pokemon.name.includes(pokemonName)
      );
      newPokemons.length > 0
        ? setSearchedPokemons(newPokemons)
        : setSearchedPokemons([]);
      setPerPage(21);
    } else {
      setSearchedPokemons(pokemons);
    }
  }

  function handleClearSearch() {
    setPerPage(21);
    setSearchedPokemons(pokemons);
    if (inputRef.current?.value !== undefined) {
      inputRef.current.value = "";
    }
  }

  return (
    <>
      <div className={styles.container}>
        <span>
          +800 <strong>Pokémons</strong> for you choose your favorite
        </span>

        <form className={styles.searchBar}>
          <input
            type="text"
            name=""
            id=""
            placeholder="Search a Pokémon"
            ref={inputRef}
          />

          <div>
            <button type="submit" onClick={handleSearch}>Buscar</button>
            <button type="button" onClick={handleClearSearch}>Limpar</button>
          </div>
        </form>

        <div className={styles.cardsContainer}>
          {searchedPokemons.map((pokemon, index) => {
            if (index < perPage) {
              return <Card key={pokemon.name} url={pokemon.url} />;
            }

          })}
        </div>
        {searchedPokemons.length > 21 && (
          <button
            className={styles.loadMoreButton}
            onClick={() => setPerPage((perPage) => perPage + 21)}
          >
            Load More +
          </button>
        )}
      </div>
    </>
  );
}
