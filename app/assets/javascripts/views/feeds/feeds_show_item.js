NewsReader.Views.FeedsItem = Backbone.View.extend({
  
  template: JST['feeds/show_item'],
  
  tagName: 'li',
  
  render: function() {
    var li = this.template({ entry: this.model });
    this.$el.html(li);
    return this;
  }
  
});
