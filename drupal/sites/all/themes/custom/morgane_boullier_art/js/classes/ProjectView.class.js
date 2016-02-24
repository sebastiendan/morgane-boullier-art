function ProjectView() {

}
ProjectView._extends(AbstractView);

ProjectView.prototype.init = function (tag, parent) {
  ProjectView._super.init.call(this, tag, parent);

  this.$imagesContainer = this.$tag.find('.field--name-field-project-images');

  this.$imagesContainer.masonry({
    itemSelector: '.field__item'
  });
};