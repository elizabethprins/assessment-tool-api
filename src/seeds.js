const feathers = require('feathers/client');
const rest = require('feathers-rest/client');
const superagent = require('superagent');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication-client');

const user = {
  email: 'teacher@here.com',
  password: 'qwer1234'
}

const batches = [
  {
    batchNumber: 1,
    startDate: '02-01-2017',
    endDate: '2017-02-24',
    students: [
      { firstName: 'Aaklo', lastName: 'Stuur', imageURL: 'https://i.imgur.com/NUyttbnh.jpg', assessments: [
        { date: '02-01-2017', colourCode: 1, remarks: 'Wow, I am SO impressed. My work here is done.'},
        { date: '03-01-2017', colourCode: 2, remarks: 'Knows all the words to Rappers Delight and not afraid to prove it.'}
      ]},
      { firstName: 'Garner', lastName: 'Kinkle', imageURL: 'https://goo.gl/DPyPYh', assessments: [
        { date: '02-01-2017', colourCode: 3, remarks: 'I wish that salt bae guy would come by and just sprinkle some on this person.'},
        { date: '03-01-2017', colourCode: 3, remarks: 'THE STRUGGLE IS REAL'}
      ]},
      { firstName: 'Wiers', lastName: 'Brankele', imageURL: 'https://goo.gl/Dc6x4B', assessments: [
        { date: '06-03-2017', colourCode: 2, remarks: 'Keeps calling me Dad.'},
        { date: '07-03-2017', colourCode: 1, remarks: 'There is a reason for everything.'}
      ]},
      { firstName: 'Vog', lastName: 'Vogon', imageURL: 'https://goo.gl/RTt611', assessments: [
        { date: '06-03-2017', colourCode: 1, remarks: 'Do not let this guy read you his poetry.'},
        { date: '07-03-2017', colourCode: 3, remarks: 'Honestly this mark is only because of his awful poetry.'}
      ]},
      { firstName: 'Barko', lastName: 'Wilk', imageURL: 'https://i.imgur.com/NUyttbnh.jpg', assessments: [
        { date: '02-01-2017', colourCode: 3, remarks: 'Keep an eye on this one!'},
        { date: '03-01-2017', colourCode: 1, remarks: 'Wow, I am SO impressed. My work here is done.'}
      ]},
      { firstName: 'Smeini', lastName: 'Luft', imageURL: 'https://i.imgur.com/NUyttbnh.jpg', assessments: [
        { date: '02-01-2017', colourCode: 1, remarks: 'Wow, I am SO impressed. My work here is done.'},
        { date: '03-01-2017', colourCode: 1, remarks: '..Or not, whatevs.'}
      ]}
    ]
  },
  {
    batchNumber: 2,
    startDate: '06-03-2017',
    endDate: '2017-04-28',
    students: [
      { firstName: 'Brankele', lastName: 'Wierd', imageURL: 'https://i.imgur.com/NUyttbnh.jpg', assessments: [
        { date: '06-03-2017', colourCode: 2, remarks: 'Keeps calling me Dad.'},
        { date: '07-03-2017', colourCode: 1, remarks: 'There is a reason for everything.'}
      ]},
      { firstName: 'Vog', lastName: 'Vogon', imageURL: 'https://goo.gl/DPyPYh', assessments: [
        { date: '06-03-2017', colourCode: 1, remarks: 'Do not let this guy read you his poetry.'},
        { date: '07-03-2017', colourCode: 3, remarks: 'Honestly this mark is only because of his awful poetry.'}
      ]},
      { firstName: 'Aaklo', lastName: 'Stuur', imageURL: 'https://i.imgur.com/NUyttbnh.jpg', assessments: [
        { date: '02-01-2017', colourCode: 1, remarks: 'Wow, I am SO impressed. My work here is done.'},
        { date: '03-01-2017', colourCode: 2, remarks: '...Or not, whatevs.'}
      ]},
      { firstName: 'Garner', lastName: 'Kinkle', imageURL: 'https://goo.gl/DPyPYh', assessments: [
        { date: '02-01-2017', colourCode: 3, remarks: 'I wish that salt bae guy would come by and just sprinkle some on this person.'},
        { date: '03-01-2017', colourCode: 3, remarks: 'THE STRUGGLE IS REAL'}
      ]},
      { firstName: 'Barko', lastName: 'Wilk', imageURL: 'https://i.imgur.com/NUyttbnh.jpg', assessments: [
        { date: '02-01-2017', colourCode: 3, remarks: 'Keep an eye on this one!'},
        { date: '03-01-2017', colourCode: 1, remarks: 'Wow, I am SO impressed. My work here is done.'}
      ]},
      { firstName: 'Smeini', lastName: 'Luft', imageURL: 'https://i.imgur.com/NUyttbnh.jpg', assessments: [
        { date: '02-01-2017', colourCode: 1, remarks: 'Wow, I am SO impressed. My work here is done.'},
        { date: '03-01-2017', colourCode: 1, remarks: 'Knows all the words to Rappers Delight and not afraid to prove it.'}
      ]}
    ]
  }
]

  const feathersClient = feathers();

  feathersClient
    .configure(hooks())
    .configure(rest('http://localhost:3030').superagent(superagent))
    .configure(auth());

  feathersClient.service('users').create(user)
  .then(() => {
    feathersClient.authenticate({
      strategy: 'local',
      email: user.email,
      password: user.password
    })
    .then(() => {
      batches.map((batch) => {
        feathersClient.service('batches').create(batch)
          .then((result) => {
            console.log('Batch seeded...', result.batchNumber);
          }).catch((error) => {
            console.error('Error seeding batch!', error.message);
          });
      })
    })
    .catch(function(error){
      console.error('Error authenticating!', error.message);
    });
  })
  .catch(function(error) {
    console.error('Error creating user!', error.message);
  });
