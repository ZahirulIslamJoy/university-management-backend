import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  NODE_ENV:process.env.NODE_ENV,
  port: process.env.PORT,
  databaseUrl: process.env.DATABASE_URL,
  salt:process.env.SALT_ROUNDS,
  defaultPass:process.env.DEFAULT_PASS ,
  acessToken: process.env.AUTH_ACCESS_TOKEN_SECRET,
  reset_pass_ui_link:process.env.RESET_PASS_UI
};
