import path from 'path'
import { Options } from 'sequelize/types/sequelize'

interface DatabaseConfig {
  connection: 'mysql' | 'sqlite'
  connections: Record<string, Options>
}

const databaseConfig: DatabaseConfig = {
  connection: 'mysql' as 'mysql' | 'sqlite',

  connections: {
    mysql: {
      dialect: 'mysql',
      host: 'localhost' as string,
      port: Number(3306),
      username: 'root' as string,
      password: 'qwerty99' as string,
      database: 'vdm' as string,
    },

    sqlite: {
      dialect: 'sqlite',
      storage: path.join(__dirname, '..', '..', 'database', 'db.sqlite3'),
    },
  },
}

export default databaseConfig
