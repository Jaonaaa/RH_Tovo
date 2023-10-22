import Client from "pg";

export const reponse_p = {
  id: 1,
  id_question_reponse_p: 10,
  label: "",
  correct: true,
};
/**
 *
 * @param {Client.Client} client
 * @returns
 */
export const getReponses = async (client = null, id_question_reponse_p) => {
  let inner = false;
  if (client == null) {
    client = await getConnectionPg();
    inner = true;
  }
  let response = [];
  try {
    //
    let result = await client.query(
      "SELECT * FROM reponse_p where id_question_reponse_p = $1",
      [id_question_reponse_p]
    );
    response = result.rows;
  } catch (err) {
    response = buildResponse("error", err.details);
  } finally {
    if (inner) client.end();
  }
  return response;
};
/**
 *
 * @param {Client.Client} client
 * @returns
 */
export const registerReponses = async (
  client = null,
  id_question_reponse_p,
  { label, correct }
) => {
  let inner = false;
  if (client == null) {
    client = await getConnectionPg();
    inner = true;
  }
  try {
    await client.query("INSERT INTO reponse_p VALUES (default,$1,$2,$3)", [
      id_question_reponse_p,
      label,
      correct,
    ]);
  } catch (err) {
    throw new Error(err);
  } finally {
    if (inner) client.end();
  }
};
