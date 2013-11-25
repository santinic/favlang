It just takes the lang with the max number of projects.
In case of draw, it takes the first one.
It doesn't do oauth, so you can run it just few times before
getting your IP banned.

To run it:
```
$ npm install lodash request
$ node favlang.js username
```

But this almost does it too:

    python -c 'import requests, functools, operator, sys, collections; y=dict(functools.reduce(operator.add, map(collections.Counter, [requests.get("https://api.github.com/repos/"+sys.argv[1]+"/"+x["name"]+"/languages").json() for x in requests.get("https://api.github.com/users/"+sys.argv[1]+"/repos").json()] ))); print sorted(y, key=y.get,reverse=True)' autoscatto
