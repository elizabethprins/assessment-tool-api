// batches-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const assessmentSchema = new Schema ({
  date: { type: Date },
  colourCode: { type: Number },
  remarks: { type: String },
  authorId: { type: Schema.Types.ObjectId, ref: 'users' },
  });

  const studentSchema = new schema({
    assessments: [assessmentSchema],
    firstName: { type: String },
    lastName: { type: String },
    imageURL: { type: String },
  });

  const batches = new schema({
    students: [studentSchema],
    batchNumber:{ type: Number },
    startDate: { type: Date },
    endDate: { type: Date },
  });

  return mongooseClient.model('batches', batches);
};
