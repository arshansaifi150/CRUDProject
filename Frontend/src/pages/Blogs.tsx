import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import moment from 'moment';
import { ArrowRightAlt, CalendarToday } from '@mui/icons-material'
import axios from "axios";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination"




function Blogs() {

  const pagination = [1, 2, 3, 4, 5, 6, 7]
  // console.log(pagination.length )

  const [posts, setPosts] = useState([]);
  const [pagenumber, setPageNumber] = useState(1)

  const windowScrolling = () => (
    window.scroll,
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  )

  const setPrevPage = ()=>{
    if (pagenumber>1) {
      setPageNumber(prev=>prev-1)
    }else{
      return 0
    }
  }

  const setNextPage = ()=>{
    if (pagination.length>pagenumber) {
      setPageNumber(prev=>prev+1)
    }else{
      return 0
    }
  }



  //   const [postDetail,setPostDetail] = useState(false)  
  useEffect(() => {
    const allPosts = async () => {
      // await fetch("https://symbiosisinfra.com/wp-json/wp/v2/posts")
      const response = await axios.get(`https://symbiosisinfra.com/?rest_route=/wp/v2/posts&_embed&per_page=12&page=${pagenumber}`)
      // console.log(response.data)
      setPosts(response.data);
    }
    allPosts();
    return () => {
      console.log("fetch complete");
      // console.log(posts)
    };
  }, [pagenumber]);

  const handleCardClick = (slug) => {
    navigate(`/${slug}`);
  };


  // console.log(pagenumber)
  const navigate = useNavigate()

  return (
    <>
      <div className="mt-40 p-3">
        <h1 className="text-3xl lg:text-4xl text-gray-600 text-center">Latest News</h1>
        <p className="text-center text-lg">We post regulary most powerful articles for help and support.</p>
      </div>
      <div className="flex  justify-center items-center mt-10 flex-wrap ">

        <div className="flex flex-wrap flex-shrink justify-center w-[80%] xl:w-[80%] lg:w-[100%] gap-4">
          {posts?.map((post) => (

            <div
              className="lg:w-[40%] xl:w-[30%] xl:h-[40%] 2xl:w-[25%] flex flex-col items-start justify-center gap-5 p-5 shadow-xl border-2 border-gray-200  rounded-xl hover:scale-105 duration-300 cursor-pointer"
              key={post.id}
              onClick={() => handleCardClick(post.slug)}
            >
              <div className="self-center">
                <img
                  src={post["_embedded"]["wp:featuredmedia"][0]["source_url"]}
                  alt=""
                  className=" "
                />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="hover:text-teal-500 duration-300"><CalendarToday />{moment(post.date).format('DD/MM/YYYY')}</p>
                </div>
                <div>
                  <p></p>
                </div>
              </div>
              <div className="text-xl md:text-2xl lg:text-2xl hover:text-teal-500 hover:scale-95 duration-500 ease-in-out cursor-pointer">{post.title.rendered}</div>
              <div className="lg:text-lg">{parse(post.excerpt.rendered)}</div>
              <button className="px-5 py-2 rounded-xl text-teal-500 text-xl justify-self-end italic" >Continue <ArrowRightAlt /></button>
            </div>

          ))}
        </div>
      </div>
      <div className="mt-10">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => (setPrevPage(), windowScrolling())} className="cursor-pointer font-semibold"/>
            </PaginationItem  >
            {pagination?.map((page) => (
              <PaginationItem className="cursor-pointer">
                
                <PaginationLink onClick={() => (setPageNumber(page), windowScrolling())
                }
                className=""
                >{page}</PaginationLink>
                
              </PaginationItem>
            ))}




            <PaginationItem>
              {/* <PaginationEllipsis /> */}
            </PaginationItem>
            <PaginationItem>
              <PaginationNext onClick={() => (setNextPage(), windowScrolling())} className="cursor-pointer font-semibold"/>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

    </>
  );
}

export default Blogs;
