import mongoose  from 'mongoose';

const BookSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
    // createdBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User',
    //   required: true,
      
    // },
    date:{
      type:String,
      default:Date
    }
  },
  { timestamps: true }
);

const Book = mongoose.model('Book', BookSchema);

export default Book;
