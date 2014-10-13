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

    waitOn: function funcClientRouteWaitOnSearch() {
      return [
        Meteor.subscribe("items", Session.get('loadMore')),
      ];
    },

    action: function funcClientRouteActionSearch() {
      this.render();
    }

  });

  Router.map(function funcClientRouterMap(){
    this.route('home', {
      path: '/',
      controller: ItemsController
    });
  });
});