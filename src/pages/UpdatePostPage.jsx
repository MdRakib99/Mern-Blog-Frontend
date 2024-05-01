import { useEffect, useState } from "react";
import { Button, FileInput, Select, Spinner, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { getPostRequest, updatePostRequest } from "../apiRequest/apiRequest";
import { errorToast, successToast } from "../helper/formHelper";
import { useNavigate, useParams } from "react-router-dom";

const UpdatePostPage = () => {
  const navigate = useNavigate();
  const { postId } = useParams();

  useEffect(() => {
    (async () => {
      const res = await getPostRequest(postId);
      setFormData(res);
      setFile(res.image);
    })();
  }, [postId]);

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

      const resData = await updatePostRequest(postData, postId);
      console.log(resData);

      if (resData && resData.slug) {
        setLoader(false);
        successToast("Blog Updated Successfully!");
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
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-sans font-semibold'>
        Update Blog{" "}
      </h1>{" "}
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            type='text'
            placeholder='Title'
            required
            id='title'
            className='flex-1'
            value={formData.title}
            onChange={(e) =>
              setFormData({
                ...formData,
                title: e.target.value,
              })
            }
          />{" "}
          <Select
            value={formData.category}
            onChange={(e) =>
              setFormData({
                ...formData,
                category: e.target.value,
              })
            }
          >
            <option value='uncategorized'> Select a category </option>
            <option value='javascript'> Javascript </option>
            <option value='reactjs'> React.js </option>
            <option value='nextjs'> Next.js </option>
          </Select>
        </div>
        <div className='flex gap-4 items-center justify-between   p-3'>
          <FileInput
            className='w-full'
            type='file'
            accept='image/*'
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        {file && (
          <img
            src={file instanceof Blob ? URL.createObjectURL(file) : file}
            alt='Uploaded'
            className='max-w-full mb-4'
          />
        )}{" "}
        <ReactQuill
          theme='snow'
          placeholder='Write Something'
          required
          className='h-24 mb-12'
          value={formData.description}
          onChange={(description) =>
            setFormData({
              ...formData,
              description,
            })
          }
        />
        <Button type='submit' gradientDuoTone='cyanToBlue' disabled={loader}>
          {loader ? (
            <>
              <Spinner size='sm' />
              <span className='pl-3'> Loading... </span>
            </>
          ) : (
            " Update"
          )}
        </Button>
      </form>
    </div>
  );
};

export default UpdatePostPage;
