
const supertest = require('supertest');
const User = require('../../models/user.model');
const { beforeEach, afterAll, test, expect } = require('@jest/globals');
const {app, server} = require('../../../app');
const mongoose = require('mongoose');
const api = supertest(app);

const initialUsers = [
  {
    name: 'test1',
    password: '123456',
    email: 'test1@mail.com',
    description: 'test1'
  },
  {
    name: 'test2',
    password: '123456',
    email: 'test2@mail.com',
    description: 'test2'
  }
];
const invalidUsers = [
  {
    name: '',
    password: '123456',
    email: 'test1@mai.com',
    description: 'test1'
  },
  {
    name: 'test2',
    password: '',
    email: 'test2@mail.com',
    description: 'test2',
  },
  {
    name: 'test3',
    password: '123456',
    email: '',
    description: 'test3',
  },
  {
    name: 'test4',
    password: '123456',
    email: 'test4@mail.com',
    description: '',
  }
];

  beforeEach(async () => {
    await User.deleteMany({});
  });

  test('Register a user', async () => {
    const response = await api.post('/api/users/register').send(initialUsers[0]);
    expect(response.body).toEqual({success: true, message: 'User registered successfully!'});
    const response2 = await api.post('/api/users/register').send(initialUsers[0]);
    expect(response2.body).toEqual({success: false, error: 'Email already registered'});
  });

  test('Register a user with invalid data', async () => {
    const response = await api.post('/api/users/register').send(invalidUsers[0]);
    expect(response.body).toEqual({success: false, error: "Name is required and must be at least 3 characters long"});

    const response2 = await api.post('/api/users/register').send(invalidUsers[1]);
    expect(response2.body).toEqual({success: false, error: "Password is required and must be at least 6 characters long"});

    const response3 = await api.post('/api/users/register').send(invalidUsers[2]);
    expect(response3.body).toEqual({success: false, error: "Email is required"});

    const response4 = await api.post('/api/users/register').send(invalidUsers[3]);
    expect(response4.body).toEqual({success: false, error: "Description is required"});
    
    
  });

  test('Login a user', async () => {
    const post = await api.post('/api/users/register').send(initialUsers[0]);
    expect(post.body.success).toEqual(true);
    expect(post.body.message).toEqual('User registered successfully!');
    const response = await api.post('/api/users/login').send(initialUsers[0]);
    expect(response.body.success).toEqual(true);
  });

  test('Login a user with invalid data', async () => {
    await api.post('/api/users/register').send(initialUsers[0]);
    const response = await api.post('/api/users/login').send(initialUsers[1]);
    expect(response.body).toEqual({success: false, error: 'Email not found'});

    const response2 = await api.post('/api/users/login').send({email: initialUsers[0].email, password: '1234567'});
    expect(response2.body).toEqual({success: false, error: 'Password incorrect'});

    const response3 = await api.post('/api/users/login').send({email: "", password: '1234567'});
    expect(response3.body).toEqual({success: false, error: 'Email is required'});

    const response4 = await api.post('/api/users/login').send({email: initialUsers[0].email, password: ''});
    expect(response4.body).toEqual({success: false, error: 'Password is required and must be at least 6 characters long'});
  });

  afterAll(async () => {
    await User.deleteMany({});
    await server.close();
    await mongoose.connection.close();
  });