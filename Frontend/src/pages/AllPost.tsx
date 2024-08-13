//@ts-nocheck
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRightAlt } from '@mui/icons-material'
import { usePosts } from "../Context/PostContext";
import { Helmet } from "react-helmet";

function AllPost() {
  const navigate = useNavigate();
  const [allposts, setAllposts] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12);

  const isLoggedIn = !!localStorage.getItem('jwtToken')

  const handleLogout = () => {
    localStorage.removeItem('jwtToken')
    navigate('/login')
  }

  const { allpostsContext } = usePosts()

  useEffect(() => {
    if (!isLoggedIn) {
      const publishPost = allpostsContext.filter(post => post.status === 'Publish')
      setAllposts(publishPost)
    }
    else {
      setAllposts(allpostsContext)
    }
  }, [isLoggedIn, allpostsContext])

  const handleCardDetail = (slug) => {
    navigate(`/${slug}`);
  };

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allposts?.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Next and previous page functions
  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  return (
    <>
      {isLoggedIn && (
        <div className="h-[7vh] bg-black bg-opacity-50 w-full mt-20">
          <div className="w-full h-full flex justify-between  items-center p-3 text-xl text-white">
            <div></div>
            <div className="flex gap-4 ">
              <a href={"/add-post"}>
                <h1 className="px-5 py-2 bg-orange-600 rounded-xl">
                  Add Post
                </h1>
              </a>
              <h1
                className="px-5 py-2 bg-orange-600 rounded-xl cursor-pointer"
                onClick={handleLogout}
              >
                LogOut{" "}
              </h1>
            </div>
          </div>
        </div>
      )}

      <div className="mt-40 p-3">
        <Helmet>
          <title>Blogs</title>
        </Helmet>
        <h1 className="text-3xl lg:text-4xl text-gray-600 text-center">Latest News</h1>
        <p className="text-center text-lg">We post regularly most powerful articles for help and support.</p>
      </div>
      <div className="flex justify-center items-center mt-10 flex-wrap">
        <div className="w-[80%] xl:w-[80%] lg:w-[100%] h-full">
          <div className="flex flex-wrap flex-shrink h-fit justify-center gap-4">
            {currentPosts?.map((post) => (
              <div
                className="lg:w-[40%] xl:w-[30%] xl:h-fit 2xl:w-[25%] flex flex-col items-start justify-center gap-5 p-5 shadow-xl border-2 border-gray-200 rounded-xl hover:scale-105 duration-300 cursor-pointer"
                key={post._id}
                onClick={() => handleCardDetail(post.slug)}
              >
                <div>
                  <img src={post?.featuredImageUrl} alt={post?.altText} className="aspect-video" />
                </div>

                <div>
                  <h1 className="text-xl md:text-2xl lg:text-2xl hover:text-teal-500 hover:scale-95 duration-500 ease-in-out cursor-pointer">{post.title}</h1>
                  <h2>Author:{post.author}</h2>
                </div>
                <button className="px-5 py-2 rounded-xl text-teal-500 text-xl justify-self-end italic" >Continue <ArrowRightAlt /></button>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <ul className="flex items-center">
              <li>
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 mx-1 rounded-lg ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-teal-500 text-white'}`}
                >
                  Prev
                </button>
              </li>
              {allposts && [...Array(Math.ceil(allposts.length / postsPerPage))].map((_, i) => (
                <li key={i}>
                  <button
                    onClick={() => paginate(i + 1)}
                    className={`px-4 py-2 mx-1 rounded-lg ${currentPage === i + 1 ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={nextPage}
                  disabled={currentPage === Math.ceil(allposts?.length / postsPerPage)}
                  className={`px-4 py-2 mx-1 rounded-lg ${currentPage === Math.ceil(allposts?.length / postsPerPage) ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-teal-500 text-white'}`}
                >
                  Next
                </button>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </>
  );
}

export default AllPost;