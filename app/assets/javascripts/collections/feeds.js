NewsReader.Collections.Feeds = Backbone.Collection.extend({

  model: NewsReader.Models.Feed,
  url: "api/feeds",
  
  getOrFetch: function(id) {
    var feeds = this;
    var model = this.get(id);
    if(!model) {
      model = new NewsReader.Models.Feed({ id: id });
      model.fetch({ 
        success: function() { feeds.add(model); }
      });
    }
    return model;
  }
});
