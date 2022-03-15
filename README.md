# CyberHack Backend API

### Team Login

```bash
curl -X POST https://pure-brook-94362.herokuapp.com/api/v1/team/login
```

```json
{
    "teamName": "CyberPunk1",
    "password": "1234567"
}
```





###  Check Team's Answer

```bash
curl -X POST https://pure-brook-94362.herokuapp.com/api/v1/team/submit
```

```json
{
    "id" : "622eabe38e68ab04e561f633",
    "answer": "answer2"
}
```



### Get Team's Rank

```bash
curl -X GET https://pure-brook-94362.herokuapp.com/api/v1/team/rank
```