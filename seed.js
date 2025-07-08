require('dotenv').config();

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { connect, Pokemon, Usuario } = require('./models');

const populaBancoDados = async () => {
    connect();

    const pokemons = [
        {
            id: 1,
            nome: 'Bulbasaur',
            altura: 7,
            peso: 69,
            imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
            ataques: 'overgrow, chlorophyll',
            estatisticas: {
                hp: 45,
                attack: 49,
                defense: 49,
                'special-attack': 65,
                'special-defense': 65,
                speed: 45
            },
        },
        {
            id: 4,
            nome: 'Charmander',
            altura: 6,
            peso: 85,
            imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
            ataques: 'blaze, solar-power',
            estatisticas: {
                hp: 39,
                attack: 52,
                defense: 43,
                'special-attack': 60,
                'special-defense': 50,
                speed: 65
            },
        },
        {
            id: 7,
            nome: 'Squirtle',
            altura: 5,
            peso: 90,
            imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png',
            ataques: 'torrent, rain-dish',
            estatisticas: {
                hp: 44,
                attack: 48,
                defense: 65,
                'special-attack': 50,
                'special-defense': 64,
                speed: 43
            },
        },
        {
            id: 25,
            nome: 'Pikachu',
            altura: 4,
            peso: 60,
            imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
            ataques: 'static, lightning-rod',
            estatisticas: {
                hp: 35,
                attack: 55,
                defense: 40,
                'special-attack': 50,
                'special-defense': 50,
                speed: 90
            },
        },
        {
            id: 39,
            nome: 'Jigglypuff',
            altura: 5,
            peso: 55,
            imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/39.png',
            ataques: 'cute-charm, competitive',
            estatisticas: {
                hp: 115,
                attack: 45,
                defense: 20,
                'special-attack': 45,
                'special-defense': 25,
                speed: 20
            },
        },
        {
            id: 52,
            nome: 'Meowth',
            altura: 4,
            peso: 42,
            imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/52.png',
            ataques: 'pickup, technician',
            estatisticas: {
                hp: 40,
                attack: 45,
                defense: 35,
                'special-attack': 40,
                'special-defense': 40,
                speed: 90
            },
        },
        {
            id: 133,
            nome: 'Eevee',
            altura: 3,
            peso: 65,
            imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png',
            ataques: 'run-away, adaptability',
            estatisticas: {
                hp: 55,
                attack: 55,
                defense: 50,
                'special-attack': 45,
                'special-defense': 65,
                speed: 55
            },
        },
        {
            id: 150,
            nome: 'Mewtwo',
            altura: 20,
            peso: 1220,
            imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png',
            ataques: 'pressure, unnerve',
            estatisticas: {
                hp: 106,
                attack: 110,
                defense: 90,
                'special-attack': 154,
                'special-defense': 90,
                speed: 130
            },
        },
        {
            id: 151,
            nome: 'Mew',
            altura: 4,
            peso: 40,
            imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/151.png',
            ataques: 'synchronize',
            estatisticas: {
                hp: 100,
                attack: 100,
                defense: 100,
                'special-attack': 100,
                'special-defense': 100,
                speed: 100
            },
        },
        {
            id: 143,
            nome: 'Snorlax',
            altura: 21,
            peso: 4600,
            imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/143.png',
            ataques: 'immunity, thick-fat',
            estatisticas: {
                hp: 160,
                attack: 110,
                defense: 65,
                'special-attack': 65,
                'special-defense': 110,
                speed: 30
            },
        }
    ];

    await Pokemon.insertMany(pokemons);

    await Usuario.create({
        email: 'teste@teste.com.br',
        nome: 'Usuário Teste',
        senha: await bcrypt.hash('123456', 10)
    });

    await mongoose.disconnect();

};

populaBancoDados();