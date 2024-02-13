export const htmlForm = `<form action="/jwt/connect" method="post">
<label for="email">Email
<input type="text" id="email" name="email"></label>
<label for="password">Password
<input type="password" id="password" name="password"></label>
<input type="submit" value="Submit">
</form>

<form action="/jwt/createUser" method="post">
<label for="username">Username
<input type="text" id="username" name="username"></label>
<label for="email">Email
<input type="email" id="email" name="email"></label>
<label for="password">Password
<input type="password" id="password" name="password"></label>
<input type="submit" value="Submit">
</form>
`

export const htmlForm2 = `<form action="/jwt/checkJWT" method="post">
<label for="token">Token
<input type="text" id="token" name="token"></label>
<input type="submit" value="Submit">
</form>`
