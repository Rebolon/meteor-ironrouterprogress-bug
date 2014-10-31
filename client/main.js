Session.setDefault('loadMore', 1);

Template.mainApp.events({
  "click button": function (e) {
    Session.set('loadMore', Session.get('loadMore')+1);
  }
});

Template.mainApp.helpers({
  "getItems": function() {
    return Items.find();
  }
});

Router.configure({
  layoutTemplate: 'layout'
});

Meteor.startup(function(){
  ItemsController = RouteController.extend({  
    template: "mainApp",

    subscriptions: function funcClientRouteWaitOnSearch() {
      return [
        Meteor.subscribe("items", Session.get('loadMore')),
      ];
    },

    action: function funcClientRouteActionSearch() {
      if (this.ready())
        this.render();
      else
        this.next();
    }

  });

  Router.map(function funcClientRouterMap(){
    this.route('home', {
      path: '/',
      controller: ItemsController
    });
  });
});