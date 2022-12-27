exports = async function(payload, response) {
  if(payload.body === undefined) {
      response.setStatusCode(400)
    response.setBody(JSON.stringify({code: "no_payload", message: "Could not find payload in the endpoint request body."}));
    }
    
  // Convert the request body from BSON to a JSON object and then pull out relevant fields
  const body = JSON.parse(payload.body.text());
  
  // Execute application logic, such as working with MongoDB
  const cluster = context.services.get('mongodb-atlas');
  const requests = cluster.db("todolist").collection("users");
  try {
    const result = await requests.findOne(body);
    // Respond with an affirmative result
    if(result) {
      response.setStatusCode(200)
    response.setBody(JSON.stringify(result));
    } else {
      response.setStatusCode(400)
    response.setBody(JSON.stringify({code: "no_record", message: "The email or the password is not correct" }));
    }
    
  } catch (err) {
    // If the insert fails for some reason, respond with an error
    response.setStatusCode(500)
    response.setBody(JSON.stringify({code: "system_error", message: `Failed to find the user for the request. ${err}`}))
  }
}
