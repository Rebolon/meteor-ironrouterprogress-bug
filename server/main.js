Meteor.startup(function() {
  // init DB
  if (Items.find().count() === 0) {
    for( var i = 0 ; i< 100 ; i++) {
      Items.insert({"title": new Date()});
    }
  }
});

Meteor.publish("items", function(loadMore) {
	if (typeof loadMore == "undefined"
		|| loadMore < 1) {
		loadMore = 1;
	}

  var items = Items.find({}, {"limit": loadMore*12}); 
	console.log('items', items.count(), loadMore);
  return items;
});
