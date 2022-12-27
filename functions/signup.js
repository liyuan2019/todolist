exports = async function(payload, response) {
  // Convert the request body from BSON to a JSON object and then pull out relevant fields
  const body = JSON.parse(payload.body.text());
  // If the request is missing required fields or something else is wrong, respond with an error
  if (!body) {
    response.setStatusCode(400)
    response.setBody(`Could not find payload in the endpoint request body.`);
  }
  // Execute application logic, such as working with MongoDB
  const cluster = context.services.get('mongodb-atlas');
  const requests = cluster.db("todolist").collection("users");
  try {
    const find = await requests.findOne({"email": body.email})
    if (find) {
      response.setStatusCode(500);
      response.setBody({"code": "email_already_exits", "message": "This email has already been registered."})
    } else {
      const { insertedId } = await requests.insertOne(body);
    // Respond with an affirmative result
    response.setStatusCode(200)
    response.setBody({"code": "successful", "message": `Successfully created a document for the request with _id: ${insertedId}.`});
    }
  } catch (err) {
    // If the insert fails for some reason, respond with an err
    response.setStatusCode(500)
    response.setBody({"code": "system_error", "message": `Failed to create a document for the request. ${err}` })
  }
}
