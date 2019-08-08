
# Sachi

Sachi is a small JavaScript library, that provide a class for searching the anything with the text. 
this library not used high level algorithm like as artificial intelligence.
so this libraries accuracy may be not better than some libraries. 
this library don't depend to outside server, so you can use this library on offline environment.
in my case, I used this library for static page.

```js
var sachi = new Sachi();

sachi.addCandidate("moo", "moo");
sachi.addCandidate("moco", "moco");
sachi.addCandidate("monaco", "monaco");

sachi.getCandidates("mo"); // ["moo", "moco", "monaco"]
sachi.getCandidates("co"); // ["moco", "monaco"]
sachi.getCandidates("moco"); // ["moco"]
```

## Usage

make a new instance and add some candidates to instance.
`addCandidate` method take two arguments those are searching keyword and value.
value is able to the any type.

```js
var sachi = new Sachi();

sachi.addCandidate("moo", 0);
sachi.addCandidate("moco", 1);
sachi.addCandidate("monaco", 2);
```

if you want to, you can load candidates from JSON data format with `loadFromJSON`.
the candidates before loaded from JSON are not cleared.
the candidates before loaded from JSON are not cleared. but if JSON has a same candidate, it is undefined which is choice when matched.

```js
var http = new XMLHttpRequest();

http.open("GET", "candidates.json", false);
http.send();
sachi.loadFromJSON(http.responseText);
```

if you want to get candidates as JSON, you can use `dumpAsJSON` method.
returned value is useable to `loadFromJSON` method.

```js
sachi.dumpAsJSON(); // "{...}"
```

you can get a candidates with `getCandidates` method.
this method take a string that used to searching.

```js
sachi.getCandidates("mo"); // [0, 1, 2]
sachi.getCandidates("co"); // [1, 2]
sachi.getCandidates("moco"); // [1]
```

## License

Sachi has released under the [MIT License](LICENSE).
