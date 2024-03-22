import express from 'express'
import { Book } from '../model/bookModel.js'
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); 

// Route for saving a new Book
router.post('/', upload.single('image'), async (request, response) => {
    try {
      if (!request.body.title || !request.body.author || !request.body.publishYear || !request.body.description) {
        return response.status(400).send({
          message: 'Send all required fields: title, author, publishYear, description',
        });
      }
  
      const newBook = {
        title: request.body.title,
        author: request.body.author,
        publishYear: request.body.publishYear,
        description: request.body.description,
        image: request.file.path,
      };
  
      const book = await Book.create(newBook);
  
      return response.status(201).send(book);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

// Route for GEt all books from database
router.get('/', async (request,response)=>{
    try{
        const books = await Book.find({})
        return response.status(200).json({
            count: books.length,
            data: books
        });
    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
})

// Route for Get ONE books from database by id
router.get('/:id', async (request,response)=>{
    try{
        const {id} = request.params;
        const book = await Book.findById(id)
        return response.status(200).json(book);
    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
})

// Route for Update a book
router.put('/:id', upload.single('image'), async (request, response) => {
    try {
      const { id } = request.params;
      const existingBook = await Book.findById(id);
  
      if (!existingBook) {
        return response.status(404).json({ message: 'Book not found' });
      }
  
      const updatedBook = {
        title: request.body.title || existingBook.title,
        author: request.body.author || existingBook.author,
        publishYear: request.body.publishYear || existingBook.publishYear,
        description: request.body.description || existingBook.description,
      };
  
      // Check if there's a new image file in the update request
      if (request.file) {
        updatedBook.image = request.file.path; 
      } else {
        updatedBook.image = existingBook.image; // Keep the existing image path if no new image is provided
      }
  
      const result = await Book.findByIdAndUpdate(id, updatedBook, { new: true });
  
      return response.status(200).json({ message: 'Book updated successfully', data: result });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

// Route for Delete a Book 
router.delete('/:id', async (request,response)=>{
    try{
        const { id } = request.params;
        const result  = await Book.findByIdAndDelete(id);
        
        if(!result){
            return response.status(404).json({message:'Book not found'})
           }
    
           return response.status(200).send({ message: 'Book Deleted sucessfully'});

    } catch(error){
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

export default router