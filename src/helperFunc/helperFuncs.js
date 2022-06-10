export const hasAnySelectedFunc = (list) => {
  const hasSeletedValues = list.some((i) => i.selected === true);
  return hasSeletedValues;
};

export const getDataOnQuery = (list, filterType) => {
  let filteredList = list.filter((item) => {
    if (filterType === "") {
      return item;
    } else if (filterType !== "") {
      if (item.name.toLowerCase().includes(filterType.toLowerCase())) {
        return item;
      } else if (item.email.toLowerCase().includes(filterType.toLowerCase())) {
        return item;
      } else if (item.role.toLowerCase().includes(filterType.toLowerCase())) {
        return item;
      }
    }
    return 0;
  });
  return filteredList;
};

export const updateUserListDataFunc = (list, updatedListItems = []) => {
  let newUpdatedList = [...updatedListItems, ...list];
  newUpdatedList = newUpdatedList.filter(
    (item, index, self) =>
      index === self.findIndex((updatedItem) => item.id === updatedItem.id)
  );
  return newUpdatedList;
};
