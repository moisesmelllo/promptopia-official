'use client'
import { useState, useEffect, ReactNode } from "react"
import PromptCard from "./PromptCard"

interface Post {
  _id: string;
  // Adicione os outros campos do post conforme necessário
}

interface PromptCardListProps {
  data: Post[]; // Substitua YourDataType pelo tipo de dados esperado
  handleTagClick: () => void;
}

const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState<Post[]>([])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
  }

  const PromptCardList = ({
    data, 
    handleTagClick}: 
    PromptCardListProps) => {
      return (
        <div className="mt-16 prompt_layout">
          {data && data.map((post: any) => (
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
      console.log(response);
      
      const data = await response.json();

      setPosts(data)
      console.log(data)
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
        data={posts}
        handleTagClick={() => {}}
      />
    </section>
  )
}

export default Feed