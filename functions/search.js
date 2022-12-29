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
  // define pipeline
    const agg = [
      { $search: { text: { query: body, path: { "wildcard": "data.tasks.*" }, } } },
      { $project: { _id: 0, data: 1 } },
    ];
  try {
     // run pipeline
    const result = await requests.aggregate(agg);
    // Respond with an affirmative result
    if(result) {
      response.setStatusCode(200)
      response.setBody(JSON.stringify(result));
    } else {
      response.setStatusCode(400)
      response.setBody(JSON.stringify({code: "no_record", message: "No search result." }));
    }
  } catch (err) {
    response.setStatusCode(500)
    response.setBody(JSON.stringify({code: "system_error", message: `Search error. ${err}`}))
  }
}