import { Context } from 'hono';
import { env } from 'hono/adapter';

const fetchMongo = async (url: string, data: object, apiKey: string) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': apiKey,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  return response.json();
};

export const findDocuments = async (c: Context, filter: object,collection:string) => {
  const { MONGO_FIND_URL, API_KEY,DATABASE,DATASOURCE } = env(c)
  
  const data = {
    collection,
    database:DATABASE,
    dataSource:DATASOURCE,
    filter,
  };
  return fetchMongo(MONGO_FIND_URL, data, API_KEY);
};

export const insertDocument = async (c: Context, document: object,collection:string) => {
  const { MONGO_INSERT_URL, API_KEY,DATABASE,DATASOURCE  } = c.env;
  const data = {
    collection,
    database:DATABASE,
    dataSource:DATASOURCE,
    document,
  };
  return fetchMongo(MONGO_INSERT_URL, data, API_KEY);
};
