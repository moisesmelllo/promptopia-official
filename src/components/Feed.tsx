'use client'
import { useState, useEffect } from "react"
import PromptCard from "./PromptCard"


const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
  }

  
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('api/prompt');
      const data = await response.json();
  
      setPosts(data)  
      console.log(posts);
      
    }
      fetchPosts()
  }, [])

  return (
    <section className="feed">
      <form className="relative w-full flex-center max-w-xl">
        <input 
          type="text" 
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <div className="prompt_layout mt-10">
        {posts && posts.map((post: any) => (
              <PromptCard
                key={post._id}
                post={post}
              />
            ))}
      </div>
    </section>
  )
}

export default Feed