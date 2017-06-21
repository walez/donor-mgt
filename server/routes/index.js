'use strict'

const router    = require('express').Router();
const mongoose  = require('mongoose');
const config    = require('config');
const uniqid    = require('uniqid');
const response  = require('../services/response');

const db = config.get("databaseUrl");
mongoose.Promise = Promise;
mongoose.connect(db, (err) => {
    if(err){
      console.log('Connection Error:' + err);
	  }
    else
        console.log("Connected");
});

const Donor = require('../models/donor');

module.exports = (io) => {
  //setup socket connection
  io.on('connection', (socket) => {
    console.log("User connected");
  });

  /**
   * Get all donors
   */
  router.get('/donors', (req, res) => {
    Donor.find({}).exec()
      .then( donors => {
        return response.sendSuccess(res, donors);
      })
      .catch( err => {
        return response.sendError(res, err);
      })
  });

  /**
   * Retreive donor info using unique url slug
   */
  router.get('/donors/:slug', (req, res) => {
    const slug = req.params.slug;
    Donor.findOne({'unique_slug': slug}).exec()
      .then( donor => {
        return response.sendSuccess(res, donor);
      })
      .catch( err => {
        return response.sendError(res, err);
      })
  });

  /**
   * Create new donor
   */
  router.post('/donors/', (req, res) => {
    const body        = req.body;
    body.ip_address   = req.ip;
    body.unique_slug  = uniqid();
    const donor = new Donor(body);
    donor.save()
      .then( donor => {
        io.emit('donor_added', donor);
        return response.sendSuccess(res, donor);
      })
      .catch( err => {
        return response.sendError(res, err);
      })
  });

  /**
   * Edit donor info
   */
  router.post('/donors/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;
    Donor.findByIdAndUpdate(id, body, {new: true}).exec()
      .then( donor => {
        io.emit('donor_updated', donor);
        return response.sendSuccess(res, donor);
      })
      .catch( err => {
        return response.sendError(res, err);
      })
  });

  /**
   * Delete donor
   */
  router.delete('/donors/:id', (req, res) => {
    const id = req.params.id;
    Donor.findByIdAndRemove(id).exec()
      .then( donor => {
        io.emit('donor_removed', donor);
        return response.sendSuccess(res, donor);
      })
      .catch( err => {
        return response.sendError(res, err);
      })
  });

  return router;
}
