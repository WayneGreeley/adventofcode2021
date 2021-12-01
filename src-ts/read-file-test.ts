import * as fs from 'fs';
import * as rd from 'readline'
import * as path from 'path'

var filenPath = path.join(__dirname, '..', 'text-assets', 'pokemon.txt');
console.log(`filenPath: ${filenPath}`);
var reader = rd.createInterface(fs.createReadStream(filenPath))

//id,identifier,species_id,height,weight,base_experience,order,is_default
var data: Array<{ 
    pokemonId: number; 
    pokemonIdentifier: string; 
    pokemonSpecies: string; 
    pokemonHeight: string; 
    pokemonWeight: string; 
    pokemonBaseExp: string; 
    pokemonOrder: string; 
    pokemonIsDefault: string
}> = [];

reader.on("line", (l: string) => {
    const tokens = l.split(',');
    const id = parseInt(tokens[0]);
    const pokemonIdentifier = tokens[1];
    const pokemonSpecies = tokens[2];
    const pokemonHeight = tokens[3];
    const pokemonWeight = tokens[4];
    const pokemonBaseExp = tokens[5];
    const pokemonOrder = tokens[6];
    const pokemonIsDefault = tokens[7];
    // console.log(`id: ${id} from ${pokemonIdentifier} to ${pokemonSpecies}`);
    data.push({
        pokemonId: id, 
        pokemonIdentifier, 
        pokemonSpecies, 
        pokemonHeight, 
        pokemonWeight, 
        pokemonBaseExp, 
        pokemonOrder, 
        pokemonIsDefault
    });
})
console.log(`Will be empty data has not yet been read ${data.length}` );

reader.on("close", ()=> {
    console.log(`Data has been read ${data.length}` );
    data.forEach(element => {
        console.log(`id: ${element.pokemonId} from ${element.pokemonIdentifier} to ${element.pokemonSpecies}`)
    });
})