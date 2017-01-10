var applications = [
	{
		id: '3a82dcd9-23c3-4ae6-9f5a-8987d4c9bcc1',
		title: 'Google',
		iconUrl: 'https://www.google.com.ua/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
		webUrl: 'https://www.google.com.ua/'
	},
	{
		id: '79d8e46f-f702-41d5-9990-36cb640aef46',
		title: 'Bing',
		iconUrl: 'https://pbs.twimg.com/profile_images/688769847900033024/Zdfx4cj5_400x400.png',
		webUrl: 'https://www.bing.com/'
	}
];

module.exports = {
	getApplications: function(req, res) {
		res.json(applications);
	},

	getApplicationById: function(req, res) {
		var id = req.swagger.params.id.value;
		var entity = applications.filter(function(item) { return item.id == id });
		if (entity.length == 0) {
			res.status(404).end();
		} else {
			res.json(entity[0]);
		}
	},

	insertApplication: function(req, res) {
		res.json(applications[0]);
	},

	updateApplication: function(req, res) {
		var id = req.swagger.params.id.value;
		var entity = applications.filter(function(item) { return item.id == id });
		if (entity.length == 0) {
			res.status(404).end();
		} else {
			res.json(entity[0]);
		}
	},

	deleteApplicationById: function(req, res) {
		var id = req.swagger.params.id.value;
		var entity = applications.filter(function(item) { return item.id == id });
		if (entity.length == 0) {
			res.status(404).end();
		} else {
			res.status(200).end();
		}
	}
};