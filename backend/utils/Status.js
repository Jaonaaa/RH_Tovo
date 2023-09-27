export const response = {
  details: "",
  status: "",
};

export const buildResponse = (status, details = null, data = null) => {
  // for now only
  return {
    details: details,
    data: data,
    status: status,
  };
};
