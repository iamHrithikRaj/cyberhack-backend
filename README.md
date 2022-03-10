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





###  Increment Team's Rank

```bash
curl -X POST https://pure-brook-94362.herokuapp.com/api/v1/team/submit
```

```json
{
    "points": 110
}
```





### Get Team's Score

```bash
curl -X GET https://pure-brook-94362.herokuapp.com/api/v1/team/rank
```

