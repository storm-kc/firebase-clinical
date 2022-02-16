const fs = require('firebase-admin');

const db = fs.firestore(); 
const booksCollection = 'books';

// @desc    Get all bootcamps
// @route   Get /books
// @access  Public
exports.getBooks = async (req, res, next) => {
    let query;

    // Copy req.query and exclude adv query fields
    const { where, select, limit, ...reqQuery } = req.query;

    // Create query string
    let queryStr = JSON.stringify(reqQuery);
    
    query = db.collection(booksCollection);
    
    // Select fields
    if (select) {
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
    }

    if (limit) {
        const queryLimit = parseInt(limit, 10) || 25;
        query = query.limit(queryLimit)
    }

    // Executing query
    const snapshot = await query.get(JSON.parse(queryStr));

    const books = snapshot.docs.map(book => (
        {
           id: book.id,
           ...book.data()
        }
    ));

    res.status(200).json({ 
        success: true, 
        count: books.length,
        data: books,
    });  
};


// @desc    Get single book
// @route   Get /books/:id
// @access  Public
exports.getBook = async (req, res, next) => {
    const id = req.params.id;
    const bookRef = db.collection(booksCollection).doc(id);
    const book = await bookRef.get();

    if (!book) {
        return res.status(404).json({
            success: false
        })
    }

    res.status(200).json({ 
        success: true, 
        data: {
            id: book.id,
            ...book.data(),
        }
    }); 
}

// @desc    Create single book
// @route   Post /books/:id
// @access  Public
exports.createBook = async (req, res, next) => {
    try {
        const book = await db.collection(booksCollection).add(req.body);
  
        res.status(201).json({
          success: true,
          data: book,
        });
    }
    catch(err){
        res.status(404).json({ 
            success: false, 
            data: {},
            message: `Failed to Create new Book record`
        }); 
    }
  };


// @desc    Delete single book
// @route   Delete /books/:id
// @access  Public
exports.deleteBook = async (req, res, next) => {
    const id = req.params.id;
    const bookRef = db.collection(booksCollection).doc(id);

    try {
        await bookRef.delete();

        res.status(200).json({ 
            success: true, 
            data: {},
    
        }); 
    }
    catch(err){
        res.status(404).json({ 
            success: false, 
            data: {},
            message: `Failed to Delete Book with id ${id}`
    
        }); 
    }
}