export function setParams(params) {
  return {
    params: params, paramsSerializer: (params) => {
      // Sample implementation of query string building
      let result = '';
      Object.keys(params).forEach((key) => {
        result += `${key}=${encodeURIComponent(params[key])}&`;
      });
      return result.substr(0, result.length - 1);
    },
  }
}