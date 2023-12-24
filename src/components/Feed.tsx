'use client'
import { useState, useEffect } from "react"
import PromptCard from "./PromptCard"

interface Post {
  _id: string;
  // Adicione os outros campos do post conforme necessário
}

interface PromptCardListProps {
  handleTagClick: () => void;
}

const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState<Post[]>([])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
  }

  const PromptCardList = ({
    handleTagClick}: 
    PromptCardListProps) => {
      return (
        <div className="mt-16 prompt_layout">
          {posts.map((post: any) => (
            <PromptCard
              key={post._id}
              post={post}
              handleTagClick={handleTagClick}
            />
          ))}
        </div>
      )
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('api/prompt/get');
      const data = await response.json();

      setPosts(data)
    }

    fetchPosts();
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
      <PromptCardList
        handleTagClick={() => {}}
      />
    </section>
  )
}

export default Feed