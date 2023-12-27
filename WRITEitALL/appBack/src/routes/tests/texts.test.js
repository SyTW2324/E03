const supertest = require('supertest');
const User = require('../../models/user.model');
const Text = require('../../models/text.model');
const { beforeAll, afterAll, test, expect } = require('@jest/globals');
const {app, server} = require('../../app');
const mongoose = require('mongoose');
const api = supertest(app);


const userTest = {
  name: 'test1',
  password: '123456',
  email: 'test1@mail.com',
  description: 'test1'
};
 
    let token;
    let id;
    //Inserta un usuario en la base de datos
    
    beforeAll(async () => {
      await User.deleteMany({});
      await Text.deleteMany({});
      await api.post('/api/users/register').send(userTest);
      //Login
      const response = await api.post('/api/users/login').send(userTest);
      token = response.body.token;
      //Obtener el id del usuario
      id = response.body._id;
      
    });

    const initialTexts = [
      {
        title: 'test1',
        creator: "",
        description: 'test1',
        content: 'test1',
        explicit: false,
      }
    ];

//Tener en cuenta que hay que añadir el token en el header de cada petición
    test('Create a text', async () => {
      initialTexts[0].creator = id;
      const response = (await api.post('/api/texts').set('Authorization', `${token}`).send(initialTexts[0]));
      expect(response.body).toEqual({success: true, message: 'Text created successfully!'});
    });

        


  afterAll( async () => {
    await User.deleteMany({});
    await Text.deleteMany({});
    await server.close();
    await mongoose.connection.close();
  });