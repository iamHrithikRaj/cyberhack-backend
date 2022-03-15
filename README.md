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
    "id" : "623090a2e8e04a0cf99e7abd",
    "answer": "answer1",
    "hintTaken": true
}
```



### Get Team's Rank

```bash
curl -X GET https://pure-brook-94362.herokuapp.com/api/v1/team/rank
```