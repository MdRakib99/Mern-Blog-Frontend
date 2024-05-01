import { useState } from "react";
import { Button, FileInput, Select, Spinner, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { createPostRequest } from "../apiRequest/apiRequest";
import { errorToast, successToast } from "../helper/formHelper";
import { useNavigate } from "react-router-dom";

const CreatePostPage = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "uncategorized",
    description: "",
  });

  const [loader, setLoader] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      if (!file) {
        errorToast("Please Upload an Image");
        setLoader(false);
        return;
      }

      const postData = new FormData();
      postData.append("title", formData.title);
      postData.append("description", formData.description);
      postData.append("category", formData.category);
      postData.append("image", file);

      const resData = await createPostRequest(postData);

      if (resData && resData.slug) {
        setLoader(false);
        successToast("Blog Created Successfully!");
        navigate(`/post/${resData.slug}`);
        setFormData({
          title: "",
          category: "uncategorized",
          description: "",
        });
        setFile(null);
      }

      // Reset form state after successful submission
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-center text-3xl font-semibold text-gray-800 mb-6'>
        Create a Blog
      </h1>
      <form onSubmit={handleSubmit} className='max-w-lg mx-auto'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <TextInput
            type='text'
            placeholder='Title'
            required
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className='p-2 border border-gray-300 rounded'
          />
          <Select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className='p-2 border border-gray-300 rounded'
          >
            <option value='uncategorized'>Select a category</option>
            <option value='javascript'>Javascript</option>
            <option value='reactjs'>React.js</option>
            <option value='nextjs'>Next.js</option>
          </Select>
        </div>
        <div className='mt-4'>
          <FileInput
            type='file'
            accept='image/*'
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        {file && (
          <img
            src={URL.createObjectURL(file)}
            alt='Uploaded'
            className='max-w-full mt-4 rounded-lg shadow'
          />
        )}
        <ReactQuill
          theme='snow'
          placeholder='Write Something'
          required
          value={formData.description}
          onChange={(description) => setFormData({ ...formData, description })}
          className='mt-4 border border-gray-300 rounded p-2'
        />
        <Button
          type='submit'
          gradientDuoTone='cyanToBlue'
          disabled={loader}
          className='mt-4 w-full'
        >
          {loader ? (
            <>
              <Spinner size='sm' />
              <span className='pl-3'>Loading...</span>
            </>
          ) : (
            " Publish"
          )}
        </Button>
      </form>
    </div>
  );
};

export default CreatePostPage;
