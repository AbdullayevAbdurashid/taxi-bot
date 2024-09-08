export const getNameById = (id, data) => {
    const item = data.find((item) => item.id === id);
    return item ? item.name_uz.toLowerCase() : "";
  };
