NewsReader.Views.FeedsShow = Backbone.View.extend({
  
  template: JST['feeds/show'],
  events: {
    'click button#refresh-feed': 'refreshFeed',
    'dblclick #feed-title': 'openEditTitle',
    'blur .editing': 'closeEditTitle' 
  },
  
  initialize: function(){
    this.listenTo(this.model, 'sync', this.render);
  },
  
  addSubView: function(entry) {
    var subView = new NewsReader.Views.FeedsItem({ model: entry });
    this.$('ul').append(subView.render().$el);
  },
  
  render: function() {
    var content = this.template({ feed: this.model });
    this.$el.html(content);
    this.attachSubViews();
    return this;
  },
  
  refreshFeed: function() {
    this.model.fetch();
  },
  
  attachSubViews: function () {
    this.model.entries().each(function(entry) {
      this.addSubView(entry);
    }.bind(this));
  },
  
  openEditTitle: function(event){
    this.$titleField = $(event.currentTarget);
    var text = this.$titleField.text();
    $(event.currentTarget).replaceWith("<input type='text' class='editing' value='" + text + "'>");
  },
  
  closeEditTitle: function(event) {
    var title = $(event.currentTarget).val();
    this.model.set({ title: title });
    this.model.save({}, { success: function() {
      this.collection.set(this.model, {remove: false})
    }.bind(this)}
    );
    $(event.currentTarget).replaceWith(this.$titleField);
  }
});
