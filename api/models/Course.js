/**
* Course.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

  	// the course code. ex DD143X
    courseId: {
      type: 'string',
      required: true,
      unique: true,
    },

    // The name of the course ex. Operating Systems
    name: {
      type: 'string',
    },

    // description of the course
    description: {
      type: 'string'
    },

    notes: {
      collection:'Note',
      via: 'course'
    }
  }
};

