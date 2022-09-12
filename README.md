 Tete-a-tete: A social messaging app

## To run locally:

1. Clone the main repo from github using `git clone <REPO URL>`.
2. Navigate to the back-end folder in terminal using `cd ./back-end`.
3. Run the following npm scripts in your terminal: 
- `npm run setup` 
-  `npm run seed`
3. Run the following npm scripts in your terminal:

- `npm run setup`
- `npm run seed`
- `npm start`

4. The server is now listening for requests and can be accessed through a service like insomnia or a front-end website.
5. Open a new terminal and naviagte to the front end with `cd ./front-end`.
6. Run the following npm scripts in your terminal:

- `npm run dev`
7. Click the link in terminal to run a local instance of the web app.

## Authors/ Github

- Todd Norton / ToddDevRepo
- Joe Gilbert / joeglDev 
- Joe Gilbert / joeglDev
- Solveiga Galatiltyte / solveigag
- Rob Anderson
- Niall Colman

## Endpoints

### POST /login/

- Expected Request Body:

```
 {
     username: "example@email.com",
     password: "password",
     };
```

- Expected Response Body:

```
{
    user :
    {
          user_id: Number,
          screen_name: String,
          bio: String,
          img_url: String,
          topics: Array,
        }
    }
```

### PATCH /users/

- Expected Request Body:

```
{
      bio: String,
      screen_name: String,
      img_url: String,
    }
```

- Expected Response Body:

```
{
    user :
    {
          user_id: Number,
          username: String
          screen_name: String,
          bio: String,
          img_url: String,
          topics: Array,
        }
    }
```

### GET /users/:user_id/topics

- Expected Response Body:

```
{
    user_topics:
        [String, String etc]
}
```

### PATCH /users/:user_id/topics

- Expected Request Body:

```
{
    new_topics:
      [String, String etc]
    }
```

- Expected Response Body:

```
{
    user_topics:
        [String, String etc]
}
```

### POST /users/user_id/conversation

- Expected Request Body:

```
{
    new_conversation: {
        title: String,
        body: String,
        topics: [Single Topic String],
      }
    }
```

- Expected Response Body:

```
{
    new_conversation: {
        conversation_id: Number,
        title: String,
        body: String,
        topics: [String, String etc],
        topic_id: Number,
        user_id: Number
      }
    }
```


