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

  const studentSchema = new Schema({
    assessments: [assessmentSchema],
    firstName: { type: String },
    lastName: { type: String },
    imageURL: { type: String },
  });

  const batches = new Schema({
    students: [studentSchema],
    batchNumber:{ type: Number, unique: true, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  });

  return mongooseClient.model('batches', batches);
};
