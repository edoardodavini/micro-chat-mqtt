db.users.drop();
db.messages.drop();
db.rooms.drop();
db.users.insert({
  mqttId: 'nfuqbsd-asdqwur-mqtt',
  displayName: 'A Nice User',
  username: 'niceuser',
  password: 'alongstrongpasswordforsafety',
  email: 'acoolemail@email.com',
  imageUrl: 'https://avatars3.githubusercontent.com/u/41384301?s=120&v=4'
});
db.users.insert({
  mqttId: 'string',
  displayName: 'String',
  username: 'String',
  password: 'string',
  email: 'string@string.com',
  imageUrl: 'https://avatars3.githubusercontent.com/u/65487465?s=120&v=4'
});
db.rooms.insert({
  name: 'First Room',
  mqttPath: 'first-room',
});
db.rooms.insert({
  name: 'Second Room',
  mqttPath: 'second-room',
});
db.rooms.insert({
  name: 'Third Room',
  mqttPath: 'third-room',
});


quit(0)