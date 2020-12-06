import React from 'react'

// TODO: повесить обработчик на смену категории, сделать рабочую сортировку
// пошаманить со стилями

const Sort = ({ sortTypes, activeSortLabel, selectSortType }) => {
  const [isVisible, setIsVisible] = React.useState(false)
  const sortRef = React.useRef()

  const togglePopup = () => {
    setIsVisible(val => !val)
  }

  const onSelectSortType = type => {
    selectSortType(type)
  }

  const handleOutsideClick = React.useCallback(event => {
    const path = event.path || (event.composedPath && event.composedPath())
    if (!path.includes(sortRef.current)) {
      setIsVisible(false)
    }
  }, [])

  React.useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick)

    return () => {
      document.body.removeEventListener('click', handleOutsideClick)
    }
  }, [handleOutsideClick])

  return (
    <div ref={sortRef} className='sort'>
      <div className='sort__label'>
        <p className='sort__pointer'>Сортировка по:</p>
        <button onClick={togglePopup} className='sort__dropdown-trigger'>
          {activeSortLabel}
        </button>
      </div>

      <div className='sort__popup'>
        {isVisible && (
          <ul className='sort__popup-content dropdown-content'>
            {sortTypes.map((type, index) => (
              <li key={type.type + index}>
                <span onClick={() => onSelectSortType(type)}>{type.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Sort
