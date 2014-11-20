NewsReader.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$sidebar = options.$sidebar;
    this.$content = options.$content;
    this.collection = options.collection;
    this.feedsIndex();
  },
  
  routes: {
    "": 'feedsIndex',
    "api/feeds/:id": 'feedShow'
  },
  
  feedsIndex: function () {
    this.collection.fetch();
    var view = new NewsReader.Views.FeedsIndex({collection: this.collection});
    this.$sidebar.html(view.render().$el);
  },
  
  feedShow: function(id){
    var feed = this.collection.getOrFetch(id);
    feed.fetch();
    var showView = new NewsReader.Views.FeedsShow({model: feed}); 
    this.$content.html(showView.render().$el);
  }
  
});
