/**
 * Created by mzimmerman on 1/10/15.
 */
Template.events.events({
    'click .fa-remove': function() {
        Events.remove(this._id);
    }
});

Template.events.helpers({
    isCreator: function() {
        return (Meteor.userId() === this.creatingUserId)
    },
    splashUrl: function() {
        var topSnapshot;
        if (Snapshots.getTopVotedIds(this._id)[0]) {
            topSnapshot = Snapshots.getTopVotedIds(this._id)[0];
        }
        else {
            topSnapshot = Snapshots.findOne({eventId: this._id});
        }
        if (topSnapshot.url) {
            return topSnapshot.url
        }
        else {
            var image = Images.findOne({
                _id: topSnapshot.imageId
            });
            if (image && image.url()) {
                return image.url();
            }
        }
        return "/image_not_found.jpeg"
    }
})