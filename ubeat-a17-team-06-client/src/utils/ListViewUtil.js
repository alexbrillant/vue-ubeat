import R from 'ramda'

export const createListViewArray = (list, { targetProperty, targetRoute, header, withDivider }) => {
  list = withDivider ? addDividersToList(list) : list
  list = header ? addHeaderToList(header, list) : list

  return list
}

export const addDividersToList = (list, delimiter = { divider: true, inset: true }) => {
  return R.intersperse(delimiter, list)
}

export const addHeaderToList = (header, list) => [{ header }, ...list]
