import mongoose from 'mongoose';
import { ContactSchema } from '../models/crmModel';

const Contact = mongoose.model('Contact', ContactSchema);

export const addNewContact = (req, res) => {
    const newContact = new Contact(req.body);
    newContact.save()
      .then(contact => {
        res.json(contact);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  };
  

export const getContacts = (req, res) => {
    Contact.find({})
      .then(contact => {
        res.json(contact);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  };
  

export const getContactWithID = (req, res) => {
    Contact.findById(req.params.contactId)
      .then(contact => {
        if (!contact) {
          return res.status(404).json({ message: 'Contact not found' });
        }
        res.json(contact);
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      });
  };
  

export const updateContact = (req, res) => {
    Contact.findOneAndUpdate({ _id: req.params.contactId }, req.body, { new: true })
      .then(contact => {
        res.json(contact);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  };
  

export const deleteContact = (req, res) => {
    Contact.deleteOne({ _id: req.params.contactId })
      .then(() => {
        res.json({ message: 'Successfully deleted contact' });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  };
  