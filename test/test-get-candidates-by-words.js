
var assert = require("assert");
var sachi = require("../sachi");

var sa = new sachi.Sachi();

sa.addCandidate("moo", 0);
sa.addCandidate("moco", 1);
sa.addCandidate("monaco", 2);

// should return empty

assert(sa.getCandidatesByWords([]).length == 0);
assert(sa.getCandidatesByWords([""]).length == 0);
assert(sa.getCandidatesByWords(["", ""]).length == 0);

// should return moo, moco and monaco

assert(sa.getCandidatesByWords(["mo"]).length == 3);
assert(0 <= sa.getCandidatesByWords(["mo"]).indexOf(0));
assert(0 <= sa.getCandidatesByWords(["mo"]).indexOf(1));
assert(0 <= sa.getCandidatesByWords(["mo"]).indexOf(2));

// should return moco and monaco

assert(sa.getCandidatesByWords(["co"]).length == 2);
assert(0 <= sa.getCandidatesByWords(["co"]).indexOf(1));
assert(0 <= sa.getCandidatesByWords(["co"]).indexOf(2));
assert(sa.getCandidatesByWords(["co"]).indexOf(0) == -1);

// should return moco

assert(sa.getCandidatesByWords(["mo", "co"]).length == 2);
assert(0 <= sa.getCandidatesByWords(["mo", "co"]).indexOf(1));
assert(0 <= sa.getCandidatesByWords(["mo", "co"]).indexOf(2));
assert(sa.getCandidatesByWords(["mo", "co"]).indexOf(0) == -1);

// should return moco

assert(sa.getCandidatesByWords(["moco", "co"]).length == 1);
assert(0 <= sa.getCandidatesByWords(["moco", "co"]).indexOf(1));
assert(sa.getCandidatesByWords(["moco", "co"]).indexOf(0) == -1);
assert(sa.getCandidatesByWords(["moco", "co"]).indexOf(2) == -1);
