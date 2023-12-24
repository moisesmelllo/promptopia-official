'use client'
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import PromptCard from "./PromptCard"


const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])
  const {data: session} = useSession()

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
  }

  
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('api/prompt/get', {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache',
        }
      });
      const data = await response.json();
  
      setPosts(data)  
      console.log(posts);
      
    }
    if(session?.user.id) fetchPosts()
  }, [])

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
          type="text" 
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      {posts.map((post: any) => (
            <PromptCard
              key={post._id}
              post={post}
            />
          ))}
    </section>
  )
}

export default Feed