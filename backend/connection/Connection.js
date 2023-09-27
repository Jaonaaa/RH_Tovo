import Pool from "pg";

export const getConnectionPg = async () => {
  Pool.Pool;
  let client = new Pool.Client({
    user: "postgres",
    host: "localhost",
    database: "rh_tovo",
    password: "popo",
    port: 5432,
  });
  // client.on("connect", () => {
  //   console.log("Connection established");
  // });
  await client.connect();
  // client.on("end", () => {
  //   console.log("Connection ended");
  // });
  return client;
};

export default getConnectionPg;
