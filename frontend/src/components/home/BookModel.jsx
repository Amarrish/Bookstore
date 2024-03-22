import { AiOutlineClose } from 'react-icons/ai';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';
import PropTypes from 'prop-types';

const BookModal = ({ book, onClose }) => {
  console.log('Image Path:', book.image);
  return (
    <div
      className='fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center'
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className='w-[600px] max-w-full bg-white rounded-xl p-4 flex flex-col relative'
      >
        <AiOutlineClose
          className='absolute right-6 top-6 text-3xl text-red-600 cursor-pointer'
          onClick={onClose}
        />
        <h2 className='w-fit px-4 py-1 bg-red-300 rounded-lg'>
          {book.publishYear}
        </h2>
        <h4 className='my-2 text-gray-500'>{book._id}</h4>
        <div className='flex justify-start items-center gap-x-2'>
          <PiBookOpenTextLight className='text-red-300 text-2xl' />
          <h2 className='my-1'>{book.title}</h2>
        </div>
        <div className='flex justify-start items-center gap-x-2'>
          <BiUserCircle className='text-red-300 text-2xl' />
          <h2 className='my-1'>{book.author}</h2>
        </div>
        <div className='my-4'>
          
          {book.image && (
            <img
              src={`http://localhost:5555/${book.image}`} style={{ width: '150px', height: '100px' }}
              alt='Book Cover'
              className='w-full h-auto rounded-lg'
            />
          )}
        </div>
        <p className='mt-4'>About the Book</p>
        <p className='my-2'>{book.description}</p>
      </div>
    </div>
  );
};

BookModal.propTypes = {
  book: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    publishYear: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string, // Assuming the image path is a string
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default BookModal;
