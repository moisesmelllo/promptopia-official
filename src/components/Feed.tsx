'use client'
import { useState, useEffect } from "react"
import PromptCard from "./PromptCard"

type PostType = {
    prompt: string;
    tag: string;
    creator: {
      username: string;
    }
}


const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [searchedPosts, setSearchedPosts] = useState<PostType[]>()
  const [posts, setPosts] = useState<PostType[]>([])


const handleSearchChange = (e: any) => {
  setSearchText(e.target.value)

  const resultadoFiltrado = posts.filter(obj => obj.prompt.toLowerCase().includes(searchText.toLowerCase()) || obj.tag.toLowerCase().includes(searchText.toLowerCase()) || obj.creator.username.toLowerCase().includes(searchText.toLowerCase()))
  setSearchedPosts(resultadoFiltrado)
  console.log(posts[0])
};
  
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('api/prompt');
      const data = await response.json();
      setPosts(data.reverse())  
      
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
          className="search_input peer text-black"
        />
      </form>
      <div className="prompt_layout mt-10">
        {searchText.length > 0 && searchedPosts!.map((post: any) => (
              <PromptCard
                key={post._id}
                post={post}
              />
            ))}
        {searchText.length === 0 && posts.map((post: any) => (
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