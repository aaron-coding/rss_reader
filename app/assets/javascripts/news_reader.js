window.NewsReader = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $sidebar = $('#sidebar');
    var $content = $('#main');
    // var collection = new NewsReader.Collections.Feeds(JSON.parse(_feedsJSON));
    var collection = new NewsReader.Collections.Feeds();
    new NewsReader.Routers.Router({ collection: collection, 
                                    $sidebar: $sidebar, $content: $content});
                            
    Backbone.history.start();
  }
};

$(document).ready(function(){
  NewsReader.initialize();
});
