//@ts-nocheck
import React,{useState,useEffect} from 'react'
import { useParams,Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ArrowRightAlt, CalendarToday } from '@mui/icons-material'
import moment from 'moment';

function Category({category}) {

    const navigate = useNavigate()
    // const {category} = useParams()
    const [categoryPost,setCategoryPost] = useState([])

    useEffect(() => {
        const fetchCategoryPost = async()=>{
            try {
                const response = await axios.get(`http://localhost:4000/Category/${category}`)
                setCategoryPost(response.data)
                
            } catch (error) {
                console.log(error.message)
            }
        }
        
        fetchCategoryPost()
        
    
      return () => {
        console.log("fetch category done")
      }
    }, [`${category}`])
    console.log(categoryPost)

    const categoryListClick = (category)=>{
      navigate(`/Category/${category}`)
    }

    const handleCardDetail = (slug) => {
      navigate(`/Category/${slug}`);
    };
  
    
  return (
    <>


    <div className="w-full bg-gray-100 mt-[10rem]">
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-[50%] h-full flex gap-10">
        <div className="flex flex-col gap-5 items-center border-5 shadown-xl rounded-xl  p-5 w-[70%]">
        {categoryPost?.map((post) => (
            <div
              className=" w-[80%] flex flex-col items-start justify-center gap-5 p-5 shadow-xl border-2 border-gray-200  rounded-xl hover:scale-105 duration-300 cursor-pointer"
              key={post._id}
              onClick={() => handleCardDetail(post.slug)}
            > 
            <div className=''>
              <img src={post.featuredImageUrl} alt="" className="aspect-auto"/>
              </div>
              <div>
              <p className="hover:text-teal-500 duration-300"><CalendarToday />{moment(post.date).format('DD/MM/YYYY')}</p>
              </div>
              <div>
              <h1 className="text-xl md:text-2xl lg:text-2xl hover:text-teal-500 hover:scale-95 duration-500 ease-in-out cursor-pointer">{post.title}</h1>
              <h2>Author:{post.author}</h2>
              </div>
              <button className="px-5 py-2 rounded-xl text-teal-500 text-xl justify-self-end italic" >Continue <ArrowRightAlt /></button>
            </div>
          ))}
          </div>
          <div className="flex flex-col gap-5 w-[30%]">
            <div className="flex border-5 shadown-xl rounded-xl bg-white p-5 w-full">
              <label htmlFor="search">Search:
              <input type="search" name="search" id="search"  className="bg-gray-200 w-full"/>
              </label>
              <button className="px-6 py-2 bg-teal-400">Search</button>
            </div>
            <div className="flex border-5 shadown-xl rounded-xl bg-white p-5 w-full">
              <h1 className="text-xl">Recent Post</h1>
              <ul>
                {categoryPost?.map((post)=>(
                  <Link to={`/Category/${post?.slug}` }>
                  <li key={post._id}>
                    {post?.title}
                  </li>
                  </Link>
                  
                ))}
              </ul>
            </div>
            <div className="flex border-5 shadown-xl rounded-xl bg-white p-5 w-full">
              
              <ul>
                {categoryPost?.map((post)=>(
                  
                  <li key={post._id} onClick={()=>categoryListClick(post?.category)}>
                    {post?.category}
                  </li>
                  
                  
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default Category