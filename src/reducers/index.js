const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all',
    filteredHeroes: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle',
                filteredHeroes: state.activeFilter === 'all' ? action.payload : action.payload.filter(item => item.element === state.activeFilter)
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HERO_CREATED':
            let newCreatedHeroList = [...state.heroes, action.payload]
            return {
                ...state,
                heroes: newCreatedHeroList,
                filteredHeroes: state.activeFilter === 'all' ? newCreatedHeroList : newCreatedHeroList.filter(item => item.element === state.activeFilter)
            }
        case 'HERO_DELETED':
            const newHeroList = state.heroes.filter(item => item.id !== action.payload);
            return {
                ...state,
                heroes: newHeroList
            }
        case 'ACTIVE_FILTER_CHANGED':
            return {
                ...state,
                activeFilter: action.payload,
                filteredHeroes: action.payload === 'all' ? state.heroes : state.heroes.filter(item => item.element === action.payload)
            }
        default: return state
    }
}

export default reducer;