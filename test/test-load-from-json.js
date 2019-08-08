
var assert = require("assert");
var sachi = require("../sachi");

var sa1 = new sachi.Sachi();
var sa2 = new sachi.Sachi();

sa1.addCandidate("moo", 0);
sa1.addCandidate("moco", 1);
sa1.addCandidate("monaco", 2);

sa2.addCandidate("monaoo", 3);
sa2.addCandidate("momoco", 4);
sa2.addCandidate("momonga", 5);

var json1 = sa1.dumpAsJSON();
var json2 = sa2.dumpAsJSON();

var sa = new sachi.Sachi();
sa.loadFromJSON(json1);
sa.loadFromJSON(json2);

// should return moo, moco, monaco, monaoo, momoco and momonga

assert(sa.getCandidates("mo").length == 6);
assert(0 <= sa.getCandidates("mo").indexOf(0));
assert(0 <= sa.getCandidates("mo").indexOf(1));
assert(0 <= sa.getCandidates("mo").indexOf(2));
assert(0 <= sa.getCandidates("mo").indexOf(3));
assert(0 <= sa.getCandidates("mo").indexOf(4));
assert(0 <= sa.getCandidates("mo").indexOf(5));

// should return moo and monacoo

assert(sa.getCandidates("oo").length == 2);
assert(0 <= sa.getCandidates("oo").indexOf(0));
assert(0 <= sa.getCandidates("oo").indexOf(3));
