import { Context, Hono } from 'hono'
import { cors } from 'hono/cors'
import mainRouter from './routes/mainRoute'
import Bindings from './utils/Bindings'
import { allowedOrigins } from './config/allowedOrigins'


const app = new Hono<{
  Bindings:Bindings
}>()

app.use(cors({
  origin(origin) {
    if (allowedOrigins.includes(origin)) {
      return origin;
    }
    return 'null';
  },
  credentials: true,
}));

app.get('/',(c)=>{
  return c.text('Hello Hono')
})


app.route('/api/v1',mainRouter)

export default app
