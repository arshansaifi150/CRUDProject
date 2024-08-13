//@ts-nocheck
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";
import EditPost from "./EditPost";
import { Helmet } from "react-helmet";
import { usePosts } from "../Context/PostContext";
import { ArrowRightAlt } from '@mui/icons-material'
import Breadcrumb from "../components/Breadcrumb";

function PostDetails() {
  const isLoggedIn = !!localStorage.getItem('jwtToken')
  const navigate = useNavigate();
  const location = useLocation();
  const { slug } = useParams();
  const [post, setPost] = useState();
  const [canonicalUrl, setCanonicalUrl] = useState();
  const [allposts, setAllposts] = useState([]);
  const [popularPost,setPopularPost] = useState([])

  const { allpostsContext } = usePosts()

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/posts/${slug}`)
        // console.log(response)
        setPost(response.data)
      } catch (error) {
        console.log("error: ",error)
      }
    }
    fetchPost()
    const fullUrl = window.location.href;
    setCanonicalUrl(fullUrl);

    if (!isLoggedIn) {
      const publishPost = allpostsContext.filter(post => post.status === "Publish")

      setAllposts(publishPost)

    } else {
      setAllposts(allpostsContext)
    }
    
    const fetchPopularPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/posts/tag/Popular`);
        setPopularPost(response.data);
      } catch (error) {
        console.log("Error fetching popular posts: ", error);
      }
    };
    fetchPopularPosts();
    return () => {
      console.log("cleanup");
    };
  }, [slug, isLoggedIn, allpostsContext]);


  const deletePost = async (id) => {
    await axios.delete(`http://localhost:4000/posts/${id}`);
    navigate("/blogs");
  };

  const handleCardDetail = (slug) => {
    navigate(`/${slug}`)
  }
// console.log(popularPost)


  const breadcrumbItems = [
    { label: 'Home', link: '/' },
    { label: 'Blog', link: '/blogs' },
    { label: post?.title || 'Post Details', link: '' },
  ]

  const handleTags = (tag) => (
    navigate(`/tag/${tag}`)
  )
  return (
    <>
      <div className="mt-20">
        <div className=" ">

          <Helmet>
            <title>{post?.title}</title>
            <meta name="title" content={post?.metaTitle} />
            <meta name="description" content={post?.metaDescription} />
            <meta name="keywords" content={post?.keyWords} />
            <meta property="og:type" content="article" />
            <meta property="og:title" content={post?.title} />
            <meta property="og:description" content={post?.metaDescription} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:image" content={post?.featuredImageUrl} />
            <meta property="og:image:secure_url" content={post?.featuredImageUrl} />
            <meta property="og:image:width" content="640" />
            <meta property="og:image:height" content="325" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:description" content={post?.metaDescription} />
            <meta name="twitter:title" content={post?.title} />
            <meta name="twitter:site" content={canonicalUrl} />
            <link rel="canonical" href={canonicalUrl} />
          </Helmet>

          {isLoggedIn && (
            <>
              <div className="flex justify-end">
                <Link to={`/Edit/${post?.slug}`} element={<EditPost />}>
                  <button
                    className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-6 m-2 rounded-xl"
                  >Update</button>
                </Link>
                <button onClick={() => deletePost(post?._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 m-2 rounded-xl"
                >Delete</button>
              </div>
            </>
          )}

        </div>


      </div>

      <div className="w-full bg-gray-100 mt-10">
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-[90%] lg:w-[90%] xl:w-[70%] 2xl:w-[60%] h-full flex gap-5 lg:gap-5 xl:gap-10">
            <div className="flex flex-col gap-5 border-5 shadown-xl rounded-xl bg-white p-5 w-full lg:w-[70%] 2xl:w-[75%]">
              <Breadcrumb items={breadcrumbItems} className={`text-base flex flex-wrap`} />
              <h1 className="text-3xl font-bold mt-3">{post?.title}</h1>
              <div className="self-center ">
                <img src={post?.featuredImageUrl} alt={post?.altText} srcSet="" className="" />
              </div>
              <div>
                <h2 className="text-base md:text-xl ">Author:{post?.author}</h2>
              </div>
              <div
                dangerouslySetInnerHTML={{ __html: post?.editorContent }}
                className="specific-page  "
              />
              <div className="w-[50%] flex gap-2 flex-wrap">
                {post?.tags?.map((tag, index) => (
                  <h2 className="text-lg cursor-pointer text-teal-500 hover:text-teal-600 duration-300 bg-gray-200 p-1 rounded-md hover:bg-white" key={index}
                    onClick={() => handleTags(tag)}
                  >#{tag}</h2>
                ))}
              </div>
            </div>
            <div className="hidden lg:flex lg:flex-col lg:gap-5 lg:w-[30%] 2xl:w-[25%]">

              <div className="flex  flex-col gap-5 border-5 shadown-xl rounded-xl bg-white p-5 w-full">
                <h1 className="text-lg md:text-3xl text-center">Recent Post</h1>
                <div className="overflow-y-scroll h-[50vh] border-2 border-gray-100 p-2 rounded-xl">
                  {allposts?.filter((post, index) => index < 6).map((post) => (
                    <>

                      <div key={post._id} className="flex lg:flex-col gap-2 w-full h-fit p-3 border-2 border-gray-200 rounded-xl my-5
                      cursor-pointer shadow-lg "
                        onClick={() => handleCardDetail(post.slug)}
                      >
                        <div className="w-full">
                          <img src={post?.featuredImageUrl} alt=""
                            className="h-full lg:aspect-video rounded-xl"
                          />
                        </div>
                        <div>
                          <div>
                            <h2 className="text-lg">{post?.title}</h2>
                          </div>
                          <div>
                            <p className="text-sm">Author: {post?.author}</p>
                            <button className="  text-teal-500 text-base  italic" >Continue <ArrowRightAlt /></button>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                  <div className='text-center'>
                  <button className='rounded-full px-5 py-2 border-2 border-gray-300 hover:bg-teal-400 hover:text-white hover:border-teal-200 duration-300'onClick={()=>navigate('/blogs')}>Show All</button>
                </div>
                </div>
                
              </div>
              <div className="flex  flex-col gap-5 border-5 shadown-xl rounded-xl bg-white p-5 w-full">
                <h1 className="text-lg md:text-3xl text-center">Popular Post</h1>
                <div className="overflow-y-scroll h-[50vh] border-2 border-gray-100 p-2 rounded-xl">
                  {popularPost?.filter((post, index) => index < 6).map((post) => (
                    <>

                      <div key={post._id} className="flex lg:flex-col gap-2 w-full h-fit p-3 border-2 border-gray-200 rounded-xl my-5
                      cursor-pointer shadow-lg "
                        onClick={() => handleCardDetail(post.slug)}
                      >
                        <div className="w-full">
                          <img src={post?.featuredImageUrl} alt=""
                            className="h-full lg:aspect-video rounded-xl"
                          />
                        </div>
                        <div>
                          <div>
                            <h2 className="text-lg">{post?.title}</h2>
                          </div>
                          <div>
                            <p className="text-sm">Author: {post?.author}</p>
                            <button className="  text-teal-500 text-base  italic" >Continue <ArrowRightAlt /></button>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                  <div className='text-center'>
                  <button className='rounded-full px-5 py-2 border-2 border-gray-300 hover:bg-teal-400 hover:text-white hover:border-teal-200 duration-300'onClick={()=>navigate('/blogs')}>Show All</button>
                </div>
                </div>
                
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostDetails;
