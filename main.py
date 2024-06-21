import requests

api_token = 'BoB5L7m9jHfQHCefs2H4ySjpFlr3UtHvbVSvdhMVjhi69iD1jYUvQpknbM0Q'
url = f'https://api.sportmonks.com/v3/football/fixtures?api_token={api_token}'

response = requests.get(url)

if response.status_code == 200:
    print('GET request successful!')
    data = response.json()
    res = []
    for match in data['data']:
      res.append(match['name'])
    print(res)
else:
    print('GET request failed. Status code:', response.status_code)
    print('Response content:', response.text)




    

