import mongoose from 'mongoose';
import { DisputeDocument } from '../../graphql/Dispute/DisputeSchema';

export const dispute1: DisputeDocument = {
  _id: mongoose.Types.ObjectId('bbaeec62fed1fe8eff4bc127'),
  createdAt: new Date('2020-06-15T10:00:00.000Z'),
  messages: [
    {
      _id: mongoose.Types.ObjectId('7b6429574939a24fde1b7cb0'),
      authorId: '1',
      createdAt: new Date('2020-06-15T10:00:00.000Z'),
      downVoters: [],
      upVoters: [],
      text: 'In my opinion',
    },
    {
      _id: mongoose.Types.ObjectId('33c6dd9d4571877fdb4baa0c'),
      authorId: '2',
      createdAt: new Date('2020-06-15T10:00:00.000Z'),
      downVoters: [],
      upVoters: [],
      text: 'reply message',
    },
  ],
  lastMessageAt: new Date('2020-06-15T10:00:00.000Z'),
  partnerIdA: '1',
  partnerIdB: '2',
};

const dispute2: DisputeDocument = {
  _id: mongoose.Types.ObjectId('a17456a1410c7fb7ed325372'),
  createdAt: new Date('2020-06-15T11:00:00.000Z'),
  messages: [],
  lastMessageAt: new Date('2020-06-15T11:00:00.000Z'),
  partnerIdA: '1',
  partnerIdB: '2',
};

export const subject1 = {
  _id: '123456789012345678901234',
  subject: 'testSubject',
  userId: '1',
  firstMessage: 'In my opinion',
  disputes: [dispute1, dispute2],
  createdAt: new Date('2020-06-15T10:00:00.000Z'),
};

export const subject2 = {
  _id: '81c408836fc2e528e7ed82f3',
  subject: 'Subject 2',
  userId: '1',
  firstMessage: 'In my opinion',
  disputes: [],
  createdAt: new Date('2020-06-15T11:00:00.000Z'),
};

export const subject3 = {
  _id: '5021abebf3312244c2aeb762',
  subject: 'Subject 3',
  userId: '1',
  firstMessage: 'First Message',
  disputes: [
    {
      _id: mongoose.Types.ObjectId('dc938ae30aab50b2e75c70e6'),
      createdAt: new Date('2020-06-17T11:00:00.000Z'),
      lastMessageAt: new Date('2020-06-17T11:00:00.000Z'),
      partnerIdA: '1',
      partnerIdB: '2',
      messages: [],
    } as DisputeDocument,
  ],
  createdAt: new Date('2020-06-17T11:00:00.000Z'),
};

export const subject4 = {
  _id: '4ee55ac0d26d7b37c0b08284',
  subject: 'Subject 3',
  userId: '2',
  firstMessage: 'First Message',
  disputes: [
    {
      _id: mongoose.Types.ObjectId('5590801ae7b5bc7f82f3754d'),
      createdAt: new Date('2020-06-18T11:00:00.000Z'),
      lastMessageAt: new Date('2020-06-18T11:00:00.000Z'),
      partnerIdA: '2',
      partnerIdB: '3',
      messages: [],
    } as DisputeDocument,
  ],
  createdAt: new Date('2020-06-18T11:00:00.000Z'),
};
