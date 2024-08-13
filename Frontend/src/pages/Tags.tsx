//@ts-nocheck
import React,{useState,useEffect} from 'react'
import { useParams,Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ArrowRightAlt, CalendarToday } from '@mui/icons-material'
import moment from 'moment';
import { useCookies } from "react-cookie";
import { usePosts } from '../Context/PostContext';

function Tags() {

    const navigate = useNavigate()
    const {tag} = useParams()
    const [tags,setTags] = useState([])
    const [cookies, removeCookie] = useCookies(["token"]);
    const isLoggedIn = !!cookies.token;
    const [allposts,setAllposts] = useState([])
    const [popularPost,setPopularPost] = useState([])

    const {allpostsContext} = usePosts()

    useEffect(() => {
        const fetchTagstags = async()=>{
            try {
                const response = await axios.get(`http://localhost:4000/posts/tag/${tag}`)
                if (isLoggedIn) {
                  setAllposts(allpostsContext)
                  setTags(response.data)
                  
                }else{
                  const publishPost = response.data.filter(post=>post.status==="Publish")
                  const allPublishPost = allpostsContext.filter(post=>post.status==="Publish")
                  setAllposts(allPublishPost)
                  setTags(publishPost)
                }
                
            } catch (error) {
                console.log(error.message)
            }
        }
        
        fetchTagstags()
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
        console.log("fetch tags done")
      }
    }, [tag])
    

  

    const handleCardDetail = (slug) => {
      navigate(`/${slug}`);
    };
  
    
  return (
    <>
     <div className="w-full bg-gray-100 mt-32">
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-[90%] lg:w-[90%] xl:w-[70%] 2xl:w-[50%] h-full flex gap-5 justify-center lg:gap-5 xl:gap-10">
            <div className="flex flex-col h-fit p-3 items-center gap-5 border-5 shadown-xl rounded-xl bg-white  lg:w-[70%] 2xl:w-[65%]">
            {tags?.map((tag) => (
            <div
             className="md:w-[90%] 2xl:w-[94%] flex flex-col items-start justify-center gap-5 p-5 shadow-xl border-2 border-gray-200  rounded-xl hover:scale-105 duration-300 cursor-pointer mt-5"
              key={tag._id}
              onClick={() => handleCardDetail(tag.slug)}
            > 
            <div className='w-full aspect-video'>
              <img src={`http://localhost:4000/uploads/${tag.featuredImageUrl}`} alt="" className="w-full h-full object-cover rounded-xl"/>
              </div>
              <div>
              <p className="hover:text-teal-500 duration-300"><CalendarToday />{moment(tag.date).format('DD/MM/YYYY')}</p>
              </div>
              <div>
              <h1 className="text-xl md:text-2xl lg:text-2xl hover:text-teal-500 hover:scale-95 duration-500 ease-in-out cursor-pointer">{tag.title}</h1>
              <h2>Author:{tag.author}</h2>
              </div>
              <button className="px-5 py-2 rounded-xl text-teal-500 text-xl justify-self-end italic" >Continue <ArrowRightAlt /></button>
            </div>
          ))}
            
            </div>
            <div className="hidden lg:flex lg:flex-col lg:gap-5 lg:w-[30%] 2xl:w-[35%]">
              
              <div className="flex  flex-col gap-5 border-5 shadown-xl rounded-xl bg-white p-5 w-full">
                <h1 className="text-lg md:text-3xl text-center">Recent Post</h1>
                <div className="overflow-y-scroll h-[50vh] border-2 border-gray-100 p-2 rounded-xl">
                  {allposts?.filter((post,index)=>index<6).map((post,ind)=>(
                    <>
                    
                    <div key={ind} className="flex lg:flex-col gap-2 w-full h-fit p-3 border-2 border-gray-200 rounded-xl my-5
                      cursor-pointer shadow-lg "
                    onClick={() => handleCardDetail(post.slug)}
                    >
                      <div className="w-full">
                        <img src={`http://localhost:4000/uploads/${post?.featuredImageUrl}`}  alt=""  
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
                          <img src={`http://localhost:4000/uploads/${post?.featuredImageUrl}`} alt=""
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


   
  )
}

export default Tags