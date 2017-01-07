$.notice = function(options){
	var self = this;
	var sysBar = $('<div class="notice-bar style-'+options.type+'" style="z-index:'+options.zIndex+'">\
							<div class="notice-bar-w">\
								<span class="notice-bar-c">'+options.text+'</span>\
							</div>\
						</div>');
	$('body').prepend(sysBar);
	setTimeout(function(){
      sysBar.addClass('moveing')
      options.delay && setTimeout(function(){
          sysBar.remove();
        },options.delay)
    },10)
}
window.Store = function(name) {
  this.name = name;
  var store = localStorage.getItem(this.name);
  this.data = (store && JSON.parse(store)) || {};
};
_.extend(Store.prototype, {

  // Save the current state of the **Store** to *localStorage*.
  save: function() {
    localStorage.setItem(this.name, JSON.stringify(this.data));
  },

  // Add a model, giving it a (hopefully)-unique GUID, if it doesn't already
  // have an id of it's own.
  create: function(model) {
    if (!model.id) model.id = model.attributes.id = guid();
    this.data[model.id] = model;
    this.save();
    return model;
  },

  // Update a model by replacing its copy in `this.data`.
  update: function(model) {
  	var self = this;
    this.data[model.id] = model;
    this.save();
    return model;
  },

  // Retrieve a model from `this.data` by id.
  find: function(model) {
    return this.data[model.id];
  },

  // Return the array of all models currently in storage.
  findAll: function() {
    return _.values(this.data);
  },

  // Delete a model from `this.data`, returning it.
  destroy: function(model) {
    delete this.data[model.id];
    this.save();
    return model;
  }

});