
var assert = require("assert");
var sachi = require("../sachi");

var sa = new sachi.Sachi();

sa.addCandidate("moo", 0);
sa.addCandidate("moco", 1);
sa.addCandidate("monaco", 2);

// should return empty

assert(sa.getCandidates("").length == 0);

// should return moo, moco and monaco

assert(sa.getCandidates("mo").length == 3);
assert(0 <= sa.getCandidates("mo").indexOf(0));
assert(0 <= sa.getCandidates("mo").indexOf(1));
assert(0 <= sa.getCandidates("mo").indexOf(2));

// should return moco and monaco

assert(sa.getCandidates("co").length == 2);
assert(0 <= sa.getCandidates("co").indexOf(1));
assert(0 <= sa.getCandidates("co").indexOf(2));
assert(sa.getCandidates("co").indexOf(0) == -1);

// should return moo

assert(sa.getCandidates("oo").length == 1);
assert(0 <= sa.getCandidates("oo").indexOf(0));
assert(sa.getCandidates("oo").indexOf(1) == -1);
assert(sa.getCandidates("oo").indexOf(2) == -1);
