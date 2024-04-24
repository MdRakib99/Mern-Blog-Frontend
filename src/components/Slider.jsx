import { Button } from "flowbite-react";

const Slider = () => {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
      <div className='flex-1 justify-center flex flex-col'>
        <h2 className='text-2xl'>Learn Javascript Basic To Advance</h2>
        <p className='text-gray-500 my-2'>
          Checkout these resources with 100 JavaScript Projects
        </p>
        <Button
          gradientDuoTone='greenToBlue'
          className='rounded-tl-xl rounded-bl-none'
        >
          <a
            href='https://www.100jsprojects.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            Show more Course
          </a>
        </Button>
      </div>
      <div className='p-7 flex-1'>
        <img src='https://res.cloudinary.com/dtqdijla9/image/upload/v1713555119/v0x2qtwbvxvyqlghdktu.jpg' />
      </div>
    </div>
  );
};

export default Slider;
