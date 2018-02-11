import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';

export const Links = new Mongo.Collection('links');

if(Meteor.isServer) {
    // 13.01.2018 15:58 funktionieren beide Varianten...
    Meteor.publish('publinks', () => {
        // console.log(Meteor.userId());
        return Links.find({userId: Meteor.userId()}); // hol allem, erstellt von einem User
        // return Links.find({}); // hol alles
    });
    // Meteor.publish('publinks', function() {
    //     console.log(this.userId);
    //     return Links.find({ userId: this.userId });
    // });
}

Meteor.methods({
    'methLinks.insert'(url) {
        if(!Meteor.userId()) {
            throw new Meteor.Error('Nicht authentifiziert!');
        }

        new SimpleSchema({
            url:{
                type: String,
                label: 'Deine Verknüpfung!',
                regEx: SimpleSchema.RegEx.Url
            }
        }).validate({ url });

        Links.insert({
            _id: shortid.generate(),
            url,
            userId: Meteor.userId(),
            visible: true,
            visitedCount: 0,
            lastVisitedAt: null
        });
        // if(!this.userId) {
        //     throw new Meteor.Error('Nicht authentifiziert!');
        // }
        // Links.insert({
        //     url,
        //     userId: this.userId
        // });
    },
    'links.setVisibility'(_id,visible) {
        if(!Meteor.userId()) {
            throw new Meteor.Errot('Nicht authorisiert!');
        }
        new SimpleSchema({
            _id: {
                type: String,
                min: 1
            },
            visible: {
                type: Boolean
            }
        }).validate({_id,visible});
        Links.update({
            _id,
            userId: this.userId
        },
        {
            $set: { visible }
        });
    },
    'links.trackVisit'(_id) {
        new SimpleSchema({
            _id: {
                type: String,
                min: 1
            }
        }).validate({_id});
        Links.update({ _id }, {
            $set:{
                lastVisitedAt: new Date().getTime()
            },
            $inc: {
                visitedCount: 1
            }
        });
    }
});
