import SearchFilters from './SearchFilters';
interface CharacterFilters extends SearchFilters {
    name: string;
    status: string;
    gender: string;
    species: string;
}
export default CharacterFilters;
