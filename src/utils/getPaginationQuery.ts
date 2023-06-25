export function getPaginationQuery(
  tableName: string,
  page?: number,
  limit?: number
) {
  let query: string;
  if (page && limit) {
    query = `SELECT * FROM ${tableName} ORDER BY id DESC LIMIT ${limit} OFFSET ${
      page * limit
    }`;
  } else if (page) {
    query = `SELECT * FROM ${tableName} ORDER BY id DESC LIMIT 10 OFFSET ${page * 10}`;
  } else if (limit) {
    query = `SELECT * FROM ${tableName} ORDER BY id DESC LIMIT ${limit}`;
  } else {
    query = `SELECT * FROM ${tableName} ORDER BY id DESC`;
  }
  return query;
}
