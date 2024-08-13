//@ts-nocheck
import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TinyMce from "../components/postForm/TinyMce";

function EditPost() {
  const { slug } = useParams();
  const {id} = useParams()
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    author: "",
    editorContent: "",
    status: "Draft", // Set a default value
    tags: [],
    featuredImageUrl: null,
    metaDescription: "",
    metaTitle: "",
    keyWords: "",
    category: "Gurugram News",
    altText:""
  });

  const [categoryList, setCategoryList] = useState(["Gurgaon News", "Gurgaon Property"]);
  const [addCategory, setAddCategory] = useState('');

  useEffect(() => {
    const getPreviousData = async () => {
      if (!slug) {
        console.error("No slug provided for editing");
        return;
      }
      try {
        const response = await axios.get(`http://localhost:4000/posts/${slug}`);
        // console.log("Fetched data:", response.data);
        
        // Ensure featuredImageUrl is a string or null
        const fetchedData = {
          ...response.data,
          featuredImageUrl: response.data.featuredImageUrl || null
        };
        
        setFormData(fetchedData);
      } catch (error) {
        console.error("Error fetching post data:", error.response?.data || error.message);
      }
    };
    getPreviousData();
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!slug) {
      console.error("No slug provided for updating");
      return;
    }
    // console.log("FormData before submission:", formData);
  
    try {
      const updateData = {
        title: formData.title,
        slug: formData.slug,
        author: formData.author,
        editorContent: formData.editorContent,
        status: formData.status,
        tags: formData.tags,
        metaDescription: formData.metaDescription,
        metaTitle: formData.metaTitle,
        keyWords: formData.keyWords,
        category: formData.category,
        altText:formData.altText
      };
  
      // Handle featuredImageUrl separately
      if (formData.featuredImageUrl instanceof File) {
        const formDataWithFile = new FormData();
        Object.keys(updateData).forEach(key => {
          formDataWithFile.append(key, updateData[key]);
        });
        formDataWithFile.append('featuredImage', formData.featuredImageUrl);
  
        // console.log("Sending form data with file:", Array.from(formDataWithFile.entries()));
  
        const response = await axios.put(`http://localhost:4000/posts/${slug}`, formDataWithFile, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        // console.log("Update response:", response.data);
      } else {
        // If featuredImageUrl is a string (existing image URL), include it
        if (typeof formData.featuredImageUrl === 'string') {
          updateData.featuredImageUrl = formData.featuredImageUrl;
        }
  
        // console.log("Sending update data:", updateData);
  
        const response = await axios.put(`http://localhost:4000/posts/${slug}`, updateData);
        // console.log("Update response:", response.data);
      }
  
      navigate("/blogs");
    } catch (error) {
      console.error("Error updating post:", error.response ? error.response.data : error.message);
      console.error("Full error object:", error);
    }
  };

  const handleEditorChange = useCallback((content) => {
    setFormData(prevData => ({
      ...prevData,
      editorContent: content,
    }));
  }, []);

  

  const updateCategoryList = () => {
    setCategoryList(prev => [...prev, addCategory]);
    setAddCategory("");
  };

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

  const handleImageUpload = (e) => {

    const file = e.target.files?.[0];
    if (file) {
      if (file.size>MAX_FILE_SIZE) {
        alert(`File "${file.name}" exceeds 500KB and will not be uploaded.`);
      }else{

        setFormData(prevData => ({
          ...prevData,
          featuredImageUrl: file,
        }));
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // console.log("Current formData:", formData);

  return (
    <div className="h-screen w-full bg-slate-50 flex justify-center mt-20">
      <form className="flex w-full" onSubmit={handleSubmit}>
        <div className="w-[80%] h-full flex flex-col justify-evenly items-center">
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
              name="metaTitle"
              id="metaTitle"
              className="bg-slate-50 text-2xl placeholder:text-gray-700 caret-slate-700 outline-none"
              placeholder="Metatitle"
              value={formData.metaTitle}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="metaDescription"
              id="metaDescription"
              className="bg-slate-50 text-2xl placeholder:text-gray-700 caret-slate-700 outline-none"
              placeholder="Metadescription"
              value={formData.metaDescription}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="keyWords"
              id="keyWords"
              className="bg-slate-50 text-2xl placeholder:text-gray-700 caret-slate-700 outline-none"
              placeholder="Keywords"
              value={formData.keyWords}
              onChange={handleInputChange}
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
                  accept="image/*"
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
            <div className="w-full">
              <label htmlFor="category">
                Category:
                <div className="">
                  <select 
                    name="category" 
                    id="category" 
                    className="p-1 rounded-lg ml-2 w-full bg-white"
                    value={formData.category}
                    onChange={handleInputChange}
                  >
                    {categoryList.map((category, index) => (
                      <option value={category} key={index}>
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
                    <button 
                      type="button"
                      className="text-base p-1 bg-orange-300 mt-2 rounded-xl"
                      onClick={updateCategoryList}
                    >
                      Add Category
                    </button>
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
              <button 
                type="submit"
                className="px-5 py-1 bg-teal-500 rounded-xl"
                onClick={() => setFormData(prev => ({...prev, status: "Publish"}))}
              >
                Publish
              </button>
              <button 
                type="submit"
                className="px-5 py-1 bg-blue-400 rounded-xl"
                onClick={() => setFormData(prev => ({...prev, status: "Draft"}))}
              >
                Draft
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditPost;