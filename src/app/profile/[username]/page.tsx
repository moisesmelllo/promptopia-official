'use client'
import Profile from "@components/Profile"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { usePathname } from "next/navigation";

const UserPage = () => {
  const {data: session} = useSession()
  const [posts, setPosts] = useState([])
  const pathname = usePathname()
  const username = pathname.match(/\/profile\/(.*)/)![1];
  const sessionUser = session?.user.name.toLocaleLowerCase().replace(' ', '')
  const isMyProfile = username === sessionUser


  useEffect(() => {
  const fetchPosts = async () => {
    ''
    const response = await fetch(`/api/${username}/posts`)
    const data = await response.json()

    setPosts(data)
  }

  fetchPosts()
}, [])
  

  return (
    <Profile 
      name={isMyProfile ? 'My' : username}
      desc='Welcome to your personalized profile page'
      posts={posts}

    />
  )
}

export default UserPage