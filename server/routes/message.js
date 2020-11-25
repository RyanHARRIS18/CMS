var express = require('express');
var router = express.Router();
var sequenceGenerator = require('./sequenceGenerator');

const Message = require('../models/message.model');

function returnError(res, error) {
  res.status(500).json({
    message: 'An error occurred',
    error: error
  });
}

router.get('/', (req, res, next) => {
  Message.find()
    .then(messages => {
      res.status(200).json({
        message: 'Messages fetched successfully!',
        messages: messages
      });
    })
    .catch(error => {
      returnError(res, error);
    });
});

router.get('/:id', (req, res, next) => {
  Message.findOne({
      "id": req.params.id
    })
    .then(messages => {
      res.status(200).json({
        message: 'Message fetched successfully!',
        messages: messages
      });
    })
    .catch(error => {
      returnError(res, error);
    });
});

router.post('/', (req, res, next) => {
  const maxMessageId = sequenceGenerator.nextId("messages");
  const message = new Message({
    id: maxMessageId,
    name: req.body.name,
    description: req.body.description,
    url: req.body.url,
    children: req.body.children
  });
  message.save()
    .then(createdMessage => {
      res.status(201).json({
        message: 'Message added successfully',
        messages: createdMessage
      });
    })
    .catch(error => {
      returnError(res, error);
    });
});

router.put('/:id', (req, res, next) => {
  Message.findOne({
      id: req.params.id
    })
    .then(message => {
      message.name = req.body.name;
      message.email = req.body.email;
      message.phone = req.body.phone;
      message.imageUrl = req.body.imageUrl;
      message.group = req.body.group;

      Message.updateOne({
          id: req.params.id
        }, message)
        .then(result => {
          res.status(204).json({
            message: 'Message updated successfully'
          })
        })
        .catch(error => {
          returnError(res, error);
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Message not found.',
        error: {
          message: 'Message not found'
        }
      });
    });
});

router.delete('/:id', (req, res, next) => {
  Message.findOne({
      id: req.params.id
    })
    .then(message => {
      Message.deleteOne({
          id: req.params.id
        })
        .then(result => {
          res.status(204).json({
            message: "Message deleted successfully"
          });
        })
        .catch(error => {
          returnError(res, error);
        })
    })
    .catch(error => {
      returnError(res, error);
    });
});

module.exports = router;