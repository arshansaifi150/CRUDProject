// @ts-nocheck
import React, { useState, useCallback } from "react";
import TinyMce from "../components/postForm/TinyMce";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddPost() {

  

  const navigate = useNavigate();

  const handleEditorChange = useCallback((content) => {
    setFormData((prevData) => ({
      ...prevData,
      editorContent: content,
    }));
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    status: "",
    author: "",
    tags: [],
    featuredImageUrl: null as File || null,
    editorContent: "",
    metaDescription: "",
    keyWords: "",
    metaTitle: "",
    category: "Gurugram News",
    altText:""
  });



  const handleSubmit = async (e) => {
   
      e.preventDefault();
      
     
      try {
        const formDataToSubmit = new FormData();
  
  // Append other form fields
  formDataToSubmit.append('title', formData.title);
  formDataToSubmit.append('slug', formData.slug);
  formDataToSubmit.append('status', formData.status);
  formDataToSubmit.append('author', formData.author);
  formDataToSubmit.append('tags', formData.tags);
  formDataToSubmit.append('editorContent', formData.editorContent);
  formDataToSubmit.append('metaDescription', formData.metaDescription);
  formDataToSubmit.append('keyWords', formData.keyWords);
  formDataToSubmit.append('metaTitle', formData.metaTitle);
  formDataToSubmit.append('category', formData.category);
  formDataToSubmit.append('altText', formData.altText);

  // Append the file
  if (formData.featuredImageUrl) {
    formDataToSubmit.append('featuredImage', formData.featuredImageUrl);
  }
        const response = await axios.post("http://localhost:4000/posts", formDataToSubmit, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        // console.log("success", response.data);
        navigate("/blogs");
      } catch (error) {
        console.error("Error submitting post:", error.response ? error.response.data : error.message);
      }
    
  
    setFormData({
      title: "",
      slug: "",
      status: "",
      author: "",
      tags: [],
      featuredImageUrl: null as File | null,
      editorContent: "",
      metaDescription: "",
      keyWords: "",
      metaTitle: "",
      category: "Gurugram News",
      altText:""
    });

    navigate("/blogs");
  };

  const [categoryList, setCategoryList] = useState(["Gurgaon News", "Gurgaon property", "Gurugram"])
  const [addCategory, setAddCategory] = useState('')

  const updateCategoryList = () => {
    setCategoryList([...categoryList, addCategory])

    setAddCategory("")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // console.log(file)
    if (file){
      if (file.size > MAX_FILE_SIZE) {
        alert(`File size exceeds 500KB. Please choose a smaller file.`);
        e.target.value = ''; // Reset the input
      }else{
        
        setFormData((prevData) => ({
          ...prevData,
          featuredImageUrl: file || null,
        }));
      }
    }

  };
  // console.log(formData)
  return (
    <>
      <div className="h-screen w-full bg-slate-50 flex justify-center mt-20">
        <form
          action=""
          method="post"
          className="flex w-full"
          onSubmit={handleSubmit}
        >
          <div className="w-[80%] h-full flex flex-col  justify-evenly items-center">
            <div className="flex flex-col gap-4">
              <input
                type="text"
                name="title"
                id="title"
                className="bg-slate-50 text-5xl placeholder:text-gray-700 caret-slate-700 outline-none"
                placeholder="Add title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="metatitle"
                id="metatitle"
                className="bg-slate-50 text-2xl placeholder:text-gray-700 caret-slate-700 outline-none"
                placeholder="Metatitle"
                value={formData.metaTitle}
                onChange={(e)=>setFormData({...formData,metaTitle:e.target.value})}
                required
              />
              <input
                type="text"
                name="metadescription"
                id="metadescrition"
                className="bg-slate-50 text-2xl placeholder:text-gray-700 caret-slate-700 outline-none"
                placeholder="Metadescription"
                value={formData.metaDescription}
                onChange={(e)=>setFormData({...formData,metaDescription:e.target.value})}
                required
              />
              <input
                type="text"
                name="keywords"
                id="keywords"
                className="bg-slate-50 text-2xl placeholder:text-gray-700 caret-slate-700 outline-none"
                placeholder="Keywords"
                value={formData.keyWords}
                onChange={(e)=>setFormData({...formData,keyWords:e.target.value})}
                required
              />

            </div>
            <div className="">
              <TinyMce
                data={handleEditorChange}
                value={formData.editorContent}
              />
            </div>
          </div>
          <div className="w-[20%] h-full bg-gray-200 p-5">
            <div className="w-full h-full flex flex-col gap-5 items-center text-lg">
              <div className="w-full ">
                <label htmlFor="featuredImage" className="">
                  featuredImage:
                  <input
                    type="file"
                    name="featuredImage"
                    id="featuredImage"
                    placeholder="featuredImage"
                    className="p-0.5 rounded-lg ml-2 w-full"
                    accept=".jpeg,.jpg,.png,.webp"
                    // onChange={(e) =>
                    //   setFormData({
                    //     ...formData,
                    //     featuredImage: e.target.files[0]
                    //   })
                    // }
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
              <div className="w-full">
                <label htmlFor="altText">
                  AltText
                  <input
                    type="text"
                    name="altText"
                    id="altText"
                    placeholder="altText"
                    className="p-0.5 rounded-lg ml-2 w-full"
                    value={formData.altText}
                    onChange={handleInputChange}
                    
                  />
                </label>
              </div>
              <div className="w-full">
                <label htmlFor="slug">
                  Slug:
                  <input
                    type="text"
                    name="slug"
                    id="slug"
                    placeholder="Slug"
                    className="p-0.5 rounded-lg ml-2 w-full"
                    value={formData.slug}
                    onChange={handleInputChange}
                    required
                  />
                </label>
              </div>
              <div className="w-full">
                <label htmlFor="author">
                  Author:
                  <input
                    type="text"
                    name="author"
                    id="author"
                    placeholder="Author"
                    className="p-0.5 rounded-lg ml-2 w-full"
                    value={formData.author}
                    onChange={handleInputChange}
                    required
                  />
                </label>
              </div>

              {/* <div className="w-full">
                <label htmlFor="status">
                  Status:
                  <select
                    name="status"
                    id="status"
                    className="p-1 rounded-lg ml-2 w-full bg-white"
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    required
                  >
                    <option value="draft">Draft</option>
                    <option value="publish">Publish</option>
                  </select>
                </label>
              </div> */}
              <div className="w-full">
                <label htmlFor="category">
                  Catrgory:
                  <div className="">
                    <select name="category" id="category" className="p-1 rounded-lg ml-2 w-full bg-white"
                      value={formData.category ? formData.category.replace(/-/g, " ") : null}
                      defaultValue={"Gurugram News"}

                      onChange={handleInputChange}
                    >
                      {categoryList.map((category, index) => (
                        <option value={category} key={index}

                        >
                          {category}
                        </option>
                      ))}

                    </select>
                    <div>
                      <label htmlFor="addcatogory">
                        Add Category:
                        <input
                          type="text"
                          name="addcatogory"
                          id="addcatogory"
                          className="p-0.5 rounded-lg ml-2 w-full"
                          value={addCategory}
                          onChange={(e) => setAddCategory(e.target.value)}



                        />
                      </label>
                      <button className="text-base p-1 bg-orange-300 mt-2 rounded-xl"
                        onClick={updateCategoryList}
                      >Add Category</button>
                    </div>
                  </div>
                </label>
              </div>
              <div className="w-full">
              <label htmlFor="tags">
                Tags:
                <textarea
                  name="tags"
                  id="tags"
                  className="p-0.5 rounded-lg ml-2 w-full"
                  placeholder="Enter Comma separated tags without spaces"
                  value={formData.tags.join(',')}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tags: e.target.value
                        .split(',')
                        .map(tag => tag.replace(/\s+/g, ''))
                        .filter(tag => tag !== '')
                    })
                  }
            
                  required
                />
              </label>
            </div>

              <div className="w-full flex gap-1">

                {/* <input
                  type="button"
                  className="px-5 py-1 bg-teal-500 rounded-xl"
                  value="Publish"
                  onClick={(e)=>setFormData({...formData,status:e.target.value})}
                >
                  
                </input> */}
                <button type="submit"
                  className="px-5 py-1 bg-teal-500 rounded-xl"
                  value="Publish"
                  onClick={(e)=>setFormData({...formData,status:e.target.value})}
                >Publish</button>
                {/* <input
                  type="button"
                  className="px-5 py-1 bg-blue-400 rounded-xl"
                  value="Draft"
                  onClick={(e)=>setFormData({...formData,status:e.target.value})}
                >
                  
                </input> */}
                <button type="submit"
                  className="px-5 py-1 bg-blue-400 rounded-xl"
                  value="Draft"
                  onClick={(e)=>setFormData({...formData,status:e.target.value})}
                >Draft</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddPost;
