import { addDividersToList, addHeaderToList, createListViewArray } from './ListViewUtil'

describe('ListViewUtil', () => {
  const LIST = [{ id: 1 }, { id: 2 }, { id: 3 }]
  const HEADER_NAME = 'HEADER_NAME'
  const HEADER = { header: HEADER_NAME }
  const LIST_WITH_HEADER = [HEADER, { id: 1 }, { id: 2 }, { id: 3 }]
  const DIVIDER = { divider: true, inset: true }
  const LIST_WITH_DIVIDERS = [{ id: 1 }, DIVIDER, { id: 2 }, DIVIDER, { id: 3 }]
  const LIST_WITH_HEADER_AND_DIVIDERS = [
    HEADER,
    { id: 1 },
    DIVIDER,
    { id: 2 },
    DIVIDER,
    { id: 3 }
  ]
  const EMPTY_LIST = []

  it('given empty list when addHeaderToList then it should add header to list', () => {
    const actual = addHeaderToList(HEADER_NAME, EMPTY_LIST)
    expect(actual).toEqual([HEADER])
  })

  it('given list when addHeaderToList then it should add header to list', () => {
    const actual = addHeaderToList(HEADER_NAME, LIST)
    expect(actual).toEqual(LIST_WITH_HEADER)
  })

  it('given empty list when addDividersToList then it should add dividers to list', () => {
    const actual = addDividersToList(EMPTY_LIST, DIVIDER)
    expect(actual).toEqual(EMPTY_LIST)
  })

  it('given list when addDividersToList then it should add dividers to list', () => {
    const actual = addDividersToList(LIST, DIVIDER)
    expect(actual).toEqual(LIST_WITH_DIVIDERS)
  })

  it('given list, header and dividers when createListViewArray then should create list view array', () => {
    const actual = createListViewArray(LIST, {
      header: HEADER_NAME,
      withDivider: true
    })

    expect(actual).toEqual(LIST_WITH_HEADER_AND_DIVIDERS)
  })
})
