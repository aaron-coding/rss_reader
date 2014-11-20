NewsReader.Views.FeedsShow = Backbone.View.extend({
  
  template: JST['feeds/show'],
  events: {
    'click button#refresh-feed': 'refreshFeed'
  },
  
  initialize: function(){
    this.listenTo(this.model, 'sync', this.render)
  },
  
  render: function() {
    var content = this.template({ feed: this.model });
    this.$el.html(content);
    return this;
  },
  
  refreshFeed: function() {
    this.model.fetch();
  }
});
