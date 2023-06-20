interface ResponseObjectInterface {
  message: string;
  data: Record<any, any>;
}

export function getResponseObject(
  message: string,
  data: Record<any, any>
): ResponseObjectInterface {
  return {
    message,
    data,
  };
}
