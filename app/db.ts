import mysql from 'mysql2/promise'


const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

export async function query(sql: string, params: any[]) {
  const [rows] = await pool.execute(sql, params)
  return rows
}