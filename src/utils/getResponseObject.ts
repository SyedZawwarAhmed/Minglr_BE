interface ResponseObjectInterface {
  message: string;
  data: Record<any, any> | null;
}

export function getResponseObject(
  message: string,
  data: Record<any, any> | null
): ResponseObjectInterface {
  return {
    message,
    data,
  };
}
