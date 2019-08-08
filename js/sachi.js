
/**
 * @license (c) 2019 tikubonn.
 * sachi.js has released under the MIT License.
 */

(function (global){
	
	/**
	 * @constructor
	 */
	
	function Sachi (){
		this.data = new Array();
		this.table = new Object();
	}
	
	/**
	 * @param {!string} word
	 * @return {!Array}
	 */
	
	function toTwoChars (word){
		var twochars = new Array();
		for (var index = 0; index +1 < word.length; index++){
			twochars.push(word.slice(index, index +2));
		}
		return twochars;
	}

	/**
	 * @param {!Array} array1
	 * @param {!Array} array2
	 * @return {!Array}
	 */

	function and (array1, array2){
		var result = new Array();
		for (var element1 of array1){
			if (0 <= array2.indexOf(element1)){
				result.push(element1);
			}
		}
		return result;
	}
	
	/**
	 * @param {!Array} array
	 * @return {!Array}
	 */
	
	function unify (array){
		var result = new Array();
		for (var element of array){
			if (result.indexOf(element) == -1){
				result.push(element);
			}
		}
		return result;
	}
	
	/**
	 * @return {!number}
	 */
	
	Sachi.prototype.addData = function (data){
		this.data.push(data);
		return this.data.length -1;
	};
		
	/**
	 * @return {!number}
	 */

	Sachi.prototype.registerData = function (data){
		var index = this.data.indexOf(data);
		if (index == -1){
			return this.addData(data);
		}
		else {
			return index;
		}
	};

	/**
	 * @param {!string} twochar
	 * @param {!number} dataid
	 */

	Sachi.prototype.addTable = function (twochar, dataid){
		if (this.table.hasOwnProperty(twochar) == false){
			this.table[twochar] = new Array();
		}
		if (this.table[twochar].indexOf(dataid) == -1){
			this.table[twochar].push(dataid);
		}
	};
	
	/**
	 * @param {!string} twochar
	 * @return {!Array}
	 */
	
	Sachi.prototype.getTable = function (twochar){
		return this.table.hasOwnProperty(twochar) == true ? 
			this.table[twochar] :
			new Array();
	};
	
	/**
	 * @param {!string} word
	 * @param {*} data
	 */

	Sachi.prototype["addCandidate"] = function (word, data){
		var dataid = this.registerData(data);
		var twochars = toTwoChars(word);
		for (var twochar of twochars){
			this.addTable(twochar, dataid);
		}
	};
	
	/**
	 * @param {!Array} twochars
	 * @return {!Array}
	 */
	
	Sachi.prototype.getCandidatesByTwoChars = function (twochars){
		if (twochars.length == 0){
			return new Array();
		}
		else {
			var candidates = this.getTable(twochars[0]);
			for (var index = 1; index < twochars.length; index++){
				var twochar = twochars[index];
				candidates = and(
					candidates,
					this.getTable(twochar)
				);
			}
			return candidates.map(
				function (dataid){
					return this.data[dataid];
				},
				this);
		}
	};
	
	/**
	 * @param {!string} word
	 * @return {!Array}
	 */
	
	Sachi.prototype["getCandidates"] = function (word){
		var twochars = unify(toTwoChars(word));
		return this.getCandidatesByTwoChars(twochars);
	};
	
	/**
	 * @param {!Array} words
	 * @return {!Array}
	 */
	
	Sachi.prototype["getCandidatesByWords"] = function (words){
		var twochars = words.map(
			function (word){
				return toTwoChars(word);
			});
		var twochars2 = twochars.length == 0 ? new Array() :
			unify(
				twochars.reduce(
					function (a, b){
						return a.concat(b);
					}));
		return this.getCandidatesByTwoChars(twochars2);
	};
	
	Sachi.prototype["clear"] = function (){
		this.data = new Array();
		this.table = new Object();
	};
	
	/**
	 * @return {!string}
	 */
	
	Sachi.prototype["dumpAsJSON"] = function (){
		return JSON.stringify({
			"data": this.data,
			"table": this.table
		});
	};
	
	/**
	 * @param {!string} json
	 */
	
	Sachi.prototype["loadFromJSON"] = function (json){
		var offset = this.data.length;
		var object = JSON.parse(json);
		if (object.hasOwnProperty("data") == true){
			for (var data of object.data){
				this.addData(data);
			}
		}
		else {
			throw new Error('JSON data must have a member of "data".');
		}
		if (object.hasOwnProperty("table") == true){
			for (var twochar of Object.keys(object.table)){
				for (var dataid of object.table[twochar]){
					this.addTable(twochar, dataid + offset);
				}
			}
		}
		else {
			throw new Error('JSON data must have a member of "table".');
		}
	};
	
	global["Sachi"] = Sachi;

})(
	window
);
