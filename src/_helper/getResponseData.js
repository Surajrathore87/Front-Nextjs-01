export function getResponseData(res) {
  let response;

  if (res.result == 1) {
    response = {
      status: true,
      data: res['data'],
      message: res['message'],
    };
    return { response };
  } else {
    response = {
      status: false,
      data: {},
      message: res['message'],
    };
    return { response };
  }
}