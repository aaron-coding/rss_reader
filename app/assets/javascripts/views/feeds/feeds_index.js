NewsReader.Views.FeedsIndex = Backbone.View.extend({
  
  template: JST['feeds/index'],
  
  initialize: function(){
    this.listenTo(this.collection, 'sync remove error change:title', this.render);
  },
  
  events: {
    'click button.delete-feed': 'deleteFeed',
    'submit form#new-feed': 'newFeed'
  },
  
  render: function() {
    var content = this.template({ feeds: this.collection, errors: this.errors });
    this.$el.html(content);
    return this;
  },
  
  deleteFeed: function(event) {
    var feedId = $(event.currentTarget).data('id');
    var model = this.collection.get(feedId);
    model.destroy();
    // this.collection.destroy(model);
  },
  
  newFeed: function(event){
    event.preventDefault();
    var attributes = $(event.currentTarget).serializeJSON();
    var model = new NewsReader.Models.Feed(attributes);
    model.save({}, {
      success: function(){
      this.collection.add(model);
    }.bind(this), 
      error: function(model, response) {
        this.errors = JSON.parse(response.responseText);
        this.render();
      }.bind(this)
    });
  }

});
