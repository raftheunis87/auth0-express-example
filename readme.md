# auth0-express-example

This is a NodeJS API that supports username and password authentication with JWTs.

## Available APIs

### User APIs

#### POST `/users`

You can do a POST to `/users` to create a new user.

The body must have:

* `username`: The username
* `password`: The password

When doing this call in Postman you have to do the following:

* Body
* raw
* JSON (application/json)

and put the following in the body:

```json
{
    "username": "<just put a username here>",
    "password": "<just put a password here>"
}
```

It returns the following:

```json
{
  "id_token": {jwt}
}
```

The JWT is signed with the secret located at the `config.json` file. That JWT will contain the `username` that was sent.

#### POST `/sessions/create`

You can do a POST to `/sessions/create` to log a user in.

The body must have:

* `username`: The username
* `password`: The password

For example:

```json
{
    "username": "raf",
    "password": "turbo"
}
```

It returns the following:

```json
{
  "id_token": {jwt}
}
```

The JWT is signed with the secret located at the `config.json` file. That JWT will contain the `username` that was sent at signup time.

### Quotes API

#### GET `/api/public/quote`

It returns a String with a quote. It doesn't require authentication.

#### GET `/api/private/quote`

It returns a String with a quote. It requires authentication. 

The JWT must be sent on the `Authorization` header as follows: `Authorization: Bearer {jwt}`

## Running it

Just clone the repository, run `npm install` and then `node server.js`. That's it :).
