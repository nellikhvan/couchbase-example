
# couchbase-example

 1. Install a Couchbase Server. Couchbase server will be running on `http://localhost:8091`. 
 - Create bucket `couchbase` 
 - Create full text index `couchbase`
 
 2. Install Node.js

 3. Make a directory, clone this repo, install dependencies, start the application.  Run this command to install dependencies

    ```bash
    npm install
    ```
    
 4. Run `npm run build` to fill couchbase with data from assets.js file
 
 5. Start the application.  From a terminal:

    `npm run start`

 6. Endpoint available at http://localhost:8080/api/?search=test
 
 7. The expected response presented in json format:
    ```
    {
        "name": "Test",
        "description": "Test"
    }
    ```