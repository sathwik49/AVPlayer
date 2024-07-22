import { Context, Hono } from 'hono';
import { cors } from 'hono/cors';
import { config } from 'dotenv';
import mainRouter from './routes/mainRouter';
import { Bindings } from './bindings';


const app = new Hono<{ Bindings: Bindings }>();

app.use(cors());

app.route('/api/v1', mainRouter);


app.get('/', async (c: Context) => {
  return c.text("hi")
});

export default app;
