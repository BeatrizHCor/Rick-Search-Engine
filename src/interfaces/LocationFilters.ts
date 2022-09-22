import SearchFilters from './SearchFilters';

interface LocationFilters extends SearchFilters {
    name: string;
    type: string;
    dimension: string;
}

export default LocationFilters;
