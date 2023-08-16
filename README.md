# wanted-pre-onboarding-backend
원티드 프리온보딩 백엔드 인턴쉽 과제

# 지원자: 유지민

# 실행 방법:
### 0. docker compose
간편한 환경세팅을 위해 docker compose로 express 웹 앱과 mysql db 각각 컨테이너를 local 네트워크에서 실행시켜 사용할 수 있도록 진행했습니다. 
clone받은 프로젝트 root 경로에서 
```
docker-compose up -d 
```
명령어를 입력해주시면 express 웹 앱 이미지와 mysql 8.0 이미지를 받은 후 컨테이너를 실행시킵니다.(mysql db 컨테이너 실행 후 20초 후 express 웹 앱 컨테이너가 실행됩니다. express와 mysql은 호스트 포트 기준 3000번, 3306번에서 실행됩니다.)
### 1. sign up
회원가입 api입니다. 
post 요청을 통해 /auth/join 엔드포인트로 요청을 보냅니다.
```
http://localhost:3000/auth/join
```
요청 body에는 이메일(email)과 비밀번호(password)를 입력해주세요. (이메일은 @를 꼭 포함해주세요. 비밀번호는 8글자 이상이어야합니다.)
```
{
    "email":"wanted@naver.com",
    "password":"123456789"
}
```
![join](https://github.com/keeepmin94/wanted-pre-onboarding-backend/assets/47639565/9347e4d8-643b-4d6f-a590-f9781b995567)

### 2. log in
로그인 api입니다. 
post 요청을 통해 /auth/login 엔드포인트로 요청을 보냅니다.
```
http://localhost:3000/auth/login
```
요청 body에는 이메일(email)과 비밀번호(password)를 입력해주세요. (이메일은 @를 꼭 포함해주세요. 비밀번호는 8글자 이상이어야합니다.)
```
{
    "email":"wanted@naver.com",
    "password":"123456789"
}
```
로그인 성공시 jwt가 응답됩니다.
```
{
    "code": 200,
    "message": "토큰이 발급되었습니다.",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0MkBuYXZlci5jb20iLCJpYXQiOjE2OTIxNDM3NzIsImV4cCI6MTY5MjE0NzM3Mn0.DCNwBOl5Mx4vnGtRFZa-0Y5gRLcq90zkXZSuwsfQ21M"
}
```
![login](https://github.com/keeepmin94/wanted-pre-onboarding-backend/assets/47639565/0a6d91d3-2631-487b-851a-157dc1d72695)

> 이 후의 모든 api 요청 헤더의 Authorization 필드에 jwt토큰을 기입해 요청해주세요. 인증 타입은 **bearer** token입니다.

### 3. create post
게시글 작성 api입니다. 
post 요청을 통해 /post/create 엔드포인트로 요청을 보냅니다.
```
http://localhost:3000/post/create
```
요청 body에는 작성할 게시글 내용(content)을 입력해주세요. Authorization 필드에 jwt토큰이 필요합니다.
```
{
    "content": "new content"
}
```
![create](https://github.com/keeepmin94/wanted-pre-onboarding-backend/assets/47639565/1fbcb281-d2c7-4b49-909a-a96260d2b603)

### 4. get all posts
모든 게시글 조회 api입니다. 
get 요청을 통해 /post/all?page=n&counter=n 엔드포인트로 요청을 보냅니다. Authorization 필드에 jwt토큰이 필요합니다.
```
http://localhost:3000/post/all?page=1&counter=5
```
조회할 페이지(page)와 받아올 게시글 수(counter)는는 Query string으로 넘겨줍니다. 
![getAllPost](https://github.com/keeepmin94/wanted-pre-onboarding-backend/assets/47639565/6826785a-ea43-4b4c-b730-701e780f2497)

### 5. get post
id로 게시글을 조회하는 api입니다. 
get 요청을 통해 /post/:id 엔드포인트로 요청을 보냅니다. Authorization 필드에 jwt토큰이 필요합니다.
```
http://localhost:3000/post/1
```
해당 id를 가진 게시글이 있으면 게시글을 응답하니다.
![getPost](https://github.com/keeepmin94/wanted-pre-onboarding-backend/assets/47639565/ec4c6c33-7630-41c8-8d55-d30b78d4071e)

### 6. edit post
게시글 수정 api입니다. 
patch 요청을 통해 /post/:id 엔드포인트로 요청을 보냅니다.
```
http://localhost:3000/post/1
```
수정할 게시글 id를 URL Param으로 넘겨주고
요청 body에는 작성할 게시글 내용(content)을 입력해주세요. Authorization 필드에 jwt토큰이 필요합니다.
```
{
    "content": "new content"
}
```
![edit](https://github.com/keeepmin94/wanted-pre-onboarding-backend/assets/47639565/dae5fa5a-a744-44af-b1fc-7bbda44f3243)

### 7. delete post
게시글 삭제 api입니다. 
delete 요청을 통해 /post/:id 엔드포인트로 요청을 보냅니다.
```
http://localhost:3000/post/1
```
삭제할 게시글 id를 URL Param으로 넘겨주고
Authorization 필드에 jwt토큰이 필요합니다.
![delete](https://github.com/keeepmin94/wanted-pre-onboarding-backend/assets/47639565/a95fb0c0-96ba-4bd0-ba65-467c16ac96af)


# 테이블 구조:
api 요구사항을 만족할 정도로만 최소한의 db 설계를 했습니다. 추후 access & refresh token, 게시글 댓글 등의 기능을 추가함으로 업데이트할 예정입니다.
<img width="286" alt="스크린샷 2023-08-16 오후 12 26 01" src="https://github.com/keeepmin94/wanted-pre-onboarding-backend/assets/47639565/6a255126-5e4b-4e4a-81a1-c2cdb9a2b9e2">


# API 명세

** 1. 회원가입 **
----
이메일과 비밀번호를 입력해 유저 데이터를 저장합니다.
이메일을 @가 포함되어야하며 비밀번호는 8글자 이상입니다.
(저장시 비밀번호는 단방향 암호화로 해싱되어 저장됩니다.)

* **URL**

  /auth/join

* **Method:**

  `POST` 

* **Data Params**

  `email=[string]`
  `password=[string]`

* **Success Response:**
  
  성공시 201 상태코드 응답

  * **Code:** 201 <br />

 
* **Error Response:**

  이미 존재하는 이메일인 경우 404 에러 응답

  * **Code:** 404 NOT FOUND <br />
    **Content:** "errors": "User's already exist."


---
** 2. 로그인**
----
회원가입 후 저장한 유저 정보(이메일, 비밀번호)를 이용해 로그인. 로그인 성공시 jwt를 응답합니다.

* **URL**

  /auth/login

* **Method:**

  `POST` 
  
* **Data Params**

  `email=[string]`
  `password=[string]`

* **Success Response:**
  
  디스코드 인증 성공시 유저 정보 저장 후 토큰 발급

  * **Code:** 200 <br />
    **Content:** <br />`{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJ3YW50ZWQxQG5hdmVyLmNvbSIsImlhdCI6MTY5MjE1MzYyMCwiZXhwIjoxNjkyMTU3MjIwfQ.GW7aqoWwjwaiOoStNbyRH5Swk140VC8dJoLQTNXq-zA"
}`
 
* **Error Response:**

  유저 정보 없을시, 비밀번호 틀릴시 403에러를 응답합니다.

  * **Code:** 403<br />
    **Content:**
    `{
    "errors": "User's doesn't exist."
}`    
`{
    "errors": "Password doesn't match."
}`

* **Notes:**

최소한의 요구 사항을 만족시키기 위해 access token만 사용했습니다. 추후 보안성을 위해 access token의 만료기간을 줄이고 refresh token을 추가할 예정입니다.

---

** 3. 게시글 작성**
----
  로그인 한 유저에 한하여 게시글 작성합니다. api 요청시 로그인 때 발급받은 jwt를 header에 넣어 요청해야합니다.

* **URL**

  /post/create

* **Method:**

  `POST` 
  

* **Data Params**

  `content=[string]`

* **Authoriaztion**

 **Required:**
  Bearer Token

* **Success Response:**

  * **Code:** 201 <br />
 
* **Error Response:**

  저장 실패시 에러

  * **Code:** 500 Internal Server Error <br />


---

** 4. 게시글 모두 조회**
----
  모든 게시글을 조회합니다. 조회시 Query String으로 조회할 페이지와 조회할 게시글 수를 입력합니다.

* **URL**

  /post/all?page=n&counter=n

* **Method:**

  `GET` 
  
*  **Query String Params**

   **Required:**
 
   `page=[number]`
   `counter=[number]`


* **Authoriaztion**

 **Required:**
  Bearer Token

* **Success Response:**
  
  기부 내역 데이터 존재시 반환

  * **Code:** 200 <br />
    **Content:** <br />`{
    "code": 200,
    "payload": [
        {
            "id": 13,
            "content": "new my content",
            "createdAt": "2023-08-16T02:40:47.000Z",
            "updatedAt": "2023-08-16T02:40:47.000Z",
            "User": {
                "id": 4,
                "email": "wanted1@naver.com"
            }
        },
        {
            "id": 12,
            "content": "new my content",
            "createdAt": "2023-08-16T02:38:50.000Z",
            "updatedAt": "2023-08-16T02:38:50.000Z",
            "User": {
                "id": 2,
                "email": "wanted@naver.com"
            }
        },
        {
            "id": 11,
            "content": "new content12",
            "createdAt": "2023-08-16T01:24:16.000Z",
            "updatedAt": "2023-08-16T01:24:16.000Z",
            "User": {
                "id": 3,
                "email": "wanted2@naver.com"
            }
        },
        {
            "id": 10,
            "content": "new content11",
            "createdAt": "2023-08-16T01:24:13.000Z",
            "updatedAt": "2023-08-16T01:24:13.000Z",
            "User": {
                "id": 3,
                "email": "wanted2@naver.com"
            }
        },
        {
            "id": 9,
            "content": "new content10",
            "createdAt": "2023-08-16T01:24:09.000Z",
            "updatedAt": "2023-08-16T01:24:09.000Z",
            "User": {
                "id": 3,
                "email": "wanted2@naver.com"
            }
        },
        {
            "id": 7,
            "content": "newnewnew content777",
            "createdAt": "2023-08-16T01:24:01.000Z",
            "updatedAt": "2023-08-16T02:06:51.000Z",
            "User": {
                "id": 3,
                "email": "wanted2@naver.com"
            }
        },
        {
            "id": 6,
            "content": "new content7",
            "createdAt": "2023-08-16T01:23:57.000Z",
            "updatedAt": "2023-08-16T01:23:57.000Z",
            "User": {
                "id": 3,
                "email": "wanted2@naver.com"
            }
        },
        {
            "id": 5,
            "content": "new content6",
            "createdAt": "2023-08-16T01:23:54.000Z",
            "updatedAt": "2023-08-16T01:23:54.000Z",
            "User": {
                "id": 3,
                "email": "wanted2@naver.com"
            }
        },
        {
            "id": 4,
            "content": "new content4",
            "createdAt": "2023-08-16T01:23:50.000Z",
            "updatedAt": "2023-08-16T01:23:50.000Z",
            "User": {
                "id": 3,
                "email": "wanted2@naver.com"
            }
        },
        {
            "id": 3,
            "content": "new content3",
            "createdAt": "2023-08-16T01:23:30.000Z",
            "updatedAt": "2023-08-16T01:23:30.000Z",
            "User": {
                "id": 2,
                "email": "wanted@naver.com"
            }
        }
    ]
}`
 
* **Error Response:**

  입력한 query string이 숫자가 아니거나 0일시 에러를 응답합니다

  * **Code:** 400 Bad Request <br />
    **Content:** 
    `"errors": [
        {
            "type": "field",
            "value": "0",
            "msg": "counter must be greater than 0",
            "path": "counter",
            "location": "query"
        }
    ]`

---

** 5. id로 게시글 조회**
----
  게시글 id를 입력하여 게시글을 조회합니다

* **URL**

  /post/:id

* **Method:**

  `GET` 
  
*  **URL Params**

   **Required:**
 
   `id=[number]`


* **Authoriaztion**

 **Required:**
  Bearer Token

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** <br />`
    "payload": {
        "id": 12,
        "content": "new my content",
        "createdAt": "2023-08-16T02:38:50.000Z",
        "updatedAt": "2023-08-16T02:38:50.000Z",
        "User": {
            "id": 2,
            "email": "wanted@naver.com"
        }
    }
    `
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br /> `"errors": "Post [13]id doesn't exist."`

---

** 6. 게시글 수정**
----
  게시글을 수정합니다. 수정은 작성자 본인만 가능합니다.

* **URL**

  /post/:id

* **Method:**

  `PATCH` 
  
*  **URL Params**

   `id=[number]`

* **Data Params**

   **Required:**
 
   `content=[string]`

* **Authoriaztion**

 **Required:**
  Bearer Token

* **Success Response:**
  
  저장 성공시 200 코드와 수정된 게시글 응답

  * **Code:** 200 <br /> `
  "payload": {
        "id": 13,
        "content": "edit to new content number 13",
        "createdAt": "2023-08-16T02:40:47.000Z",
        "updatedAt": "2023-08-16T02:41:16.162Z",
        "UserId": 4
    }`
 
* **Error Response:**

  * **Code:** 500 Internal Server Error <br />
  

---
** 7. 게시글 삭제**
----
  게시글을 삭제합니다. 삭제는 작성자 본인만 가능합니다.

* **URL**

  /post/:id

* **Method:**

  `DELETE` 
  
*  **URL Params**

   `id=[number]`


* **Success Response:**
  
  nft 각 부위별 파츠 응답

  * **Code:** 200 <br />
 
 
* **Error Response:**

  * **Code:** 500 Internal Server Error <br />
