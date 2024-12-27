# API for Sharing Stories

> API designed for posting and sharing short stories, similar to tweet-style posts.

## Endpoint
`http://127.0.0.1:3000/api`
### Register
- URL
    - `/register`
- Method
    - `POST`
- Request Body
    - `name` as `string`
    - `email` as `string`, must be unique
    - `password` as `string`, must be at least 8 characters
- Response
```
{
	"error": false,
	"message": "User created"
}
```

### Login
- URL
    - `/login`
- Method
    - `POST`
- Request Body
    - `email` as `string`
    - `password` as `string`
- Response
```
{
	"error": false,
	"message": "Success",
	"loginResult": {
		"userId": 127,
		"name": "Thana Nami",
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTI3LCJuYW1lIjoiVGhhbmEgTmFtaSIsImVtYWlsIjoidGhhbmFuYW1pQGdtYWlsLmNvbSIsImlhdCI6MTczNTMwNDc1MywiZXhwIjoxNzM1MzA4MzUzfQ.iCALRmtTAyAJcWOGLqwmW04yK5wph1H2_xVGF0UjMH0"
	}
}
```
