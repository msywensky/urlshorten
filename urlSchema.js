var mongoose = require('mongoose');

var schema = new mongoose.Schema({
		idNum:Number,
		url: String,
	});
var model = mongoose.model('urls', schema);

module.exports = {
	saveUrl: function(url, callback) {
//		console.log("saveUrl is called " + url);
		model.findOne()
		.sort('-idNum')
		.exec(function(err, member) {
			var maxId = 1;
			console.log("In exec");
			if (err) {
				console.log("Error trying to find record: " + err);
			}
			if (member != null) {
				//console.log("member is not null: " + member);
				maxId = member.idNum + 1;
			}

			var newUrl = new model({idNum:maxId, url:url});
			return newUrl.save().then(function(result) {
				//console.log("in then for save");
				callback(result);
				});
		});
	},
	getUrl: function(id, callback) {
		model.findOne({ 'idNum':id }, function(err, result) {
			if (err) {
				callback({err:"Unable to retrieve data: " + err});
			}
			if (result == null) {
				callback({err:"Id " + id + " not found"});
			} else {
				callback({url: result.url});
			}
		});
	}

}
