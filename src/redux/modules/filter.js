const SET_SORT_BY = 'filters/SET_SORT_BY'

const initialState = {
  sortBy: {
    name: 'алфавиту',
    type: 'title',
    order: 'asc',
  },
}

export default function filtersReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_SORT_BY: {
      return {
        sortBy: payload,
      }
    }
    default:
      return state
  }
}

export const setSortBy = sortBy => ({
  type: SET_SORT_BY,
  payload: sortBy,
})
