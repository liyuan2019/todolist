exports = async function(payload, response) {
  if(payload.body === undefined) {
      response.setStatusCode(400)
    response.setBody(`Could not find payload in the endpoint request body.`);
    }
    
  // Convert the request body from BSON to a JSON object and then pull out relevant fields
  const body = JSON.parse(payload.body.text());
  
  // Execute application logic, such as working with MongoDB
  const cluster = context.services.get('mongodb-atlas');
  const requests = cluster.db("todolist").collection("users");
  try {
    const result = await requests.findOne(body);
    // Respond with an affirmative result
    response.setStatusCode(200)
    response.setBody(JSON.stringify(result));
  } catch (err) {
    // If the insert fails for some reason, respond with an error
    response.setStatusCode(500)
    response.setBody(`Failed to find a document for the request. ${err}`)
  }
}
