import getConnectionPg from "../../connection/Connection.js";
import { buildResponse } from "../../utils/Status.js";

export const question = {
  id: 0,
  type: "",
};

export const addQuestionType = async (type) => {
  const client = await getConnectionPg();
  let response = {};
  try {
    //
    await client.query("INSERT INTO question VALUES (default,$1)", [type]);

    response = buildResponse("good", "Type de Question enregistrér");
  } catch (err) {
    response = buildResponse("error", err.details);
  } finally {
    client.end();
  }
  return response;
};
