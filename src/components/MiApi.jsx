import React from 'react'
import { useState, useEffect } from 'react';
import Buscador from './Buscador';


const MiApi = () => {

    //Estados
    const [search, setSearch] = useState('');
    const [pokemones, setPokemones] = useState([]);
    const [ordenAscendente, setOrdenAscendente] = useState(true);

    //useEffect
    useEffect(() => {
        consultarApi();
    }, []);

    const consultarApi = async () => {
        const baseUrl = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
        const response = await fetch(baseUrl);
        const data = await response.json();
        console.log("data completa: ", data)

        //se accede al array de objetos "results" dentro de data
        const { results } = data
        
        const newPokemones = results.map(async (pokemon) => {

            const res = await fetch(pokemon.url)
            const poke = await res.json()
            //console.log("poke: ",poke)

            return {
                id: poke.id,
                name: poke.name,
                img_officialArtwork: poke.sprites.other["official-artwork"].front_default,
            }
        })

        //console.log("4to log:", await Promise.all(newPokemones))
        setPokemones(await Promise.all(newPokemones))
    };

    //Función que captura las búsquedas
    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    const funcionBuscar = () => {
        if (search !== "") {
            const route = `https://pokeapi.co/api/v2/pokemon/${search}`;
            fetch(route)
                .then((response) => response.json())
                .then((poke) => {
                    const formattedPokemon = {
                        id: poke.id,
                        name: poke.name,
                        img_officialArtwork: poke.sprites.other["official-artwork"].front_default, //Elegida

                    };
                    setPokemones([formattedPokemon]);
                })
                .catch((error) => console.log("Error:", error));
        } else {
            setPokemones([]);
        }
    };
    //Filtrado de datos
    let results = [];
    if (!search) {
        results = pokemones;
    } else {
        results = pokemones.filter((pokemon) => {
            return (
                pokemon.name.toLowerCase().includes(search.toLowerCase()) ||
                String(pokemon.id).includes(search) 
            )
        }
        );
    }

    //ORDEN NUMÉRICO
    const ordenNumerico = () => {
        const listaOrdenada = [...results].sort((a, b) => {
            return ordenAscendente ? a.id - b.id : b.id - a.id;
        });

        setPokemones(listaOrdenada.reverse());
        // Invierte el estado de ordenAscendente
        setOrdenAscendente((prevOrden) => !prevOrden);
    };

    //ORDEN ALFABÉTICO
    const ordenAlfabetico = () => {
        const listaOrdenada = [...results].sort((a, b) => {
            return a.name.localeCompare(b.name);
        });
        setPokemones(listaOrdenada);
    };

    const ordenAlfabeticoReverse = () => {
        const listaOrdenada = [...results].sort((a, b) => {
            return a.name.localeCompare(b.name);
        });
        setPokemones(listaOrdenada.reverse());
    };

    return (
        <>
            <Buscador placeholder="Nombre..." search={search} handleChange={handleChange} onClick={funcionBuscar} />

            <div className='container d-flex justify-content-around'>
                <div className='d-flex align-items-center'>
                    <h5 className='text-pink'>Ordenar por:</h5>
                </div>
                <button type="button" className="btn btn-outline-info text-pink rounded my-3 fw-semibold" onClick={ordenNumerico}>1-9 ⇅</button>
                {/* <button type="button" className="btn btn-outline-info text-white rounded my-3 fw-semibold" onClick={listaNumericaReverse}>9-1 ⇅</button> */}
                <button type="button" className="btn btn-outline-info text-pink rounded my-3 fw-semibold" onClick={ordenAlfabetico}>A-Z</button>
                <button type="button" className="btn btn-outline-info text-pink rounded my-3 fw-semibold" onClick={ordenAlfabeticoReverse}>Z-A</button>
            </div>
            {
                results.map(pokemon => {
                    return (
                        <div key={pokemon.id} className='border border-info rounded bg-info bg-opacity-10 text-light my-3'>
                            <div className='border-end border-info p-3'>
                                <img src={pokemon.img_officialArtwork} alt={`Imagen: ${pokemon.name}`} name={`Imagen: ${pokemon.name}`} className='w-50' />
                                <p>{`#${pokemon.id}`}</p>
                                <h3 style={{ textTransform: "capitalize" }}>{pokemon.name}</h3>
                            </div>
                        </div>

                    )
                })
            }
        </>
    )
}

export default MiApi