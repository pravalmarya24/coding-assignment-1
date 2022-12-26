let express = require("express");
let { open } = require("sqlite");
let sqlite3 = require("sqlite3");
let path = require("path");
let app = express();
app.use(express.json());

let dbPath = path.join(__dirname, "todoApplication.db");

let db = null;

let initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, function () {
      console.log("Server is Running at http://localhost:3000/");
    });
  } catch (error) {
    console.log(`DB Error:${error.message}`);
    process.exit(1);
  }
};
initializeDBAndServer();

app.get("/todos/", async (request, response) => {
  const { status } = request.query;
  let getTodoQuery = `
        SELECT *
        FROM 
            todo
        WHERE
            status= '${status}';`;
  let todoList = await db.all(getTodoQuery);
  response.send(todoList);
});

app.get("/todos/", async (request, response) => {
  const { priority } = request.query;
  let getTodoPriorityQuery = `
        SELECT *
        FROM 
            todo
        WHERE
            priority= '${priority}';`;
  let todoListPriority = await db.all(getTodoPriorityQuery);
  response.send(todoListPriority);
});

app.get("/todos/", async (request, response) => {
  const { priority, status } = request.query;
  const getPriorityAndstatusQuery = `
        SELECT *
        FROM
            todo
        WHERE
            priority= '${priority}'
            AND status= '${status}';`;
  const statusPriorityList = await db.all(getPriorityAndstatusQuery);
  response.send(statusPriorityList);
});

app.get("/todos/", async (request, response) => {
  const { search_q } = request.query;
  const getSearchQuery = `
            SELECT *
            FROM todo
            WHERE 
               title LIKE '%${search_q}%';`;
  const searchQueryList = await db.all(getSearchQuery);
  response.send(searchQueryList);
});

app.get("todo/", async (request, response) => {
  const { category, status } = request.query;
  const getCategoryQuery = `
        SELECT *
        FROM todo
        WHERE
            category= '${category}'
            AND status= '${status}';`;
  const categoryList = await db.all(getCategoryQuery);
  response.send(categoryList);
});

app.get("todo/", async (request, response) => {
  const { category } = request.query;
  const getCategoryListQuery = `
        SELECT *
        FROM todo
        WHERE
            category= '${category}';`;
  const categoryArray = await db.all(getCategoryListQuery);
  response.send(categoryArray);
});

app.get("todo/", async (request, response) => {
  const { category, priority } = request.query;
  const getPriorityListQuery = `
        SELECT *
        FROM todo
        WHERE
            category= '${category}'
            AND priority= '${priority}';`;
  const priorityArray = await db.all(getPriorityListQuery);
  response.send(priorityArray);
});
