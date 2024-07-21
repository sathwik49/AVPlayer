// src/index.ts
import { Hono, Context } from 'hono';
import { cors } from 'hono/cors';

import mainRouter from './routes/mainRouter';

type Bindings = {
  [key in keyof CloudflareBindings]: CloudflareBindings[key];
};

const app = new Hono<{ Bindings: Bindings }>();

app.use(cors());

app.route('/api/v1', mainRouter);

app.get('/', (c) => {
  return c.text('Server');
});

export default app;
