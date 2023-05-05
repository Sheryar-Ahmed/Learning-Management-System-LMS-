const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    volumeInfo: {
        publisher: {
            type: String,
            required: [true, "publisher must be valid"]
        },
        authors: [
            {
                name: {
                    type: String,
                    required: [true, "author name cannot b invalid"]
                }
            },
        ],
    },
    title: {
        type: String,
        required: [true, "Book title cannot be empty"],
        minLength: [3, "Must be greater than 2 characters"]
    },
    publishedDate: {
        type: Date,
        required: [true, 'Publish date is required']
    },
    description: {
        type: String,
        required: [true, "Description cannot be empty"]
    },
    rating: {
        type: Number,
        default: 0
    },
    selfLinks: [
        {
            type: String,
            required: [true, 'Download link is required'],
            minLength: [12, 'must be greater than 11 char']
        },
    ]
});


const books = mongoose.models?.books || mongoose.model('books', bookSchema);

module.exports = books;

